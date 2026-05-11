#!/usr/bin/env python3
"""Convierte 3 documentos markdown en entradas Yo y los inserta en yoes.json."""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
YOES_PATH = ROOT / "public" / "data" / "yoes.json"

DOCS = [
    {
        "id": "yo-idealizacion-cuerpos",
        "title": "El Yo de la Idealización de los Cuerpos",
        "summary": "Estudio del agregado psicológico que convierte el cuerpo —propio o ajeno— en ídolo, promesa de salvación y medida de valor. Su anatomía, raíces, manifestaciones y el camino de su comprensión.",
        "tags": ["deseo", "imagen", "cuerpo", "idealización", "comprensión"],
        "source": "/tmp/yo-idealizacion.md",
        "cover": {
            "src": "/assets/yoes/yo-idealizacion-cuerpos.jpg",
            "alt": "Torso de mármol iluminado por luz dorada en una galería oscura",
            "caption": "Cuando el cuerpo se vuelve ídolo, deja de ser carne y pasa a ser promesa.",
        },
    },
    {
        "id": "yo-prototipo-pareja",
        "title": "El Yo del Prototipo de Pareja",
        "summary": "Estudio del defecto que fabrica una imagen mental de pareja ideal y la impone sobre toda persona real, sustituyendo el amor por la comparación con un molde interno.",
        "tags": ["pareja", "idealización", "afecto", "proyección", "comprensión"],
        "source": "/tmp/yo-prototipo-pareja.md",
        "cover": {
            "src": "/assets/yoes/yo-prototipo-pareja.jpg",
            "alt": "Silueta humana ensamblada con fragmentos de fotografías unidos por hilos dorados",
            "caption": "Amamos un molde interno y lo cubrimos con el rostro de una persona real.",
        },
    },
    {
        "id": "yo-despecho",
        "title": "El Yo del Despecho por Fracaso Amoroso",
        "summary": "Estudio del agregado que aparece cuando el dolor de una pérdida amorosa se mezcla con orgullo, resentimiento, deseo de venganza y necesidad de ser reconocido.",
        "tags": ["despecho", "orgullo", "resentimiento", "amor", "comprensión"],
        "source": "/tmp/yo-despecho.md",
        "cover": {
            "src": "/assets/yoes/yo-despecho.jpg",
            "alt": "Medallón dorado en forma de corazón partido sobre piedra oscura mojada",
            "caption": "El despecho cubre la herida con orgullo y llama a eso fortaleza.",
        },
    },
]

LIST_RE = re.compile(r"^\s*[-*]\s+(.*)")
H_RE = re.compile(r"^(#{1,6})\s+(.*)")
PRACTICE_TITLE_RE = re.compile(r"^(práctica|practica|ejercicio|trabajo)\b", re.IGNORECASE)
MANTRA_TITLE_RE = re.compile(r"^mantra\b", re.IGNORECASE)


def clean(text: str) -> str:
    # quitar enfasis markdown simples
    text = re.sub(r"\*\*(.+?)\*\*", r"\1", text)
    text = re.sub(r"\*(.+?)\*", r"\1", text)
    text = re.sub(r"_(.+?)_", r"\1", text)
    text = re.sub(r"`(.+?)`", r"\1", text)
    return text.strip()


def parse_markdown(md: str):
    """Convierte un markdown sencillo a una lista de bloques."""
    # eliminar primera línea de comentario "# Content from ..."
    lines = md.splitlines()
    if lines and lines[0].startswith("# Content from"):
        lines = lines[1:]

    blocks = []
    i = 0
    n = len(lines)
    title_consumed = False  # ignoramos el primer h1 si es el título del doc

    para_buf: list[str] = []
    list_buf: list[str] = []

    def flush_para():
        if para_buf:
            text = clean(" ".join(para_buf).strip())
            if text:
                blocks.append({"type": "paragraph", "text": text})
            para_buf.clear()

    def flush_list():
        if list_buf:
            items = [clean(x) for x in list_buf if clean(x)]
            if items:
                blocks.append({"type": "list", "items": items})
            list_buf.clear()

    while i < n:
        line = lines[i]
        stripped = line.strip()

        if not stripped:
            flush_para()
            flush_list()
            i += 1
            continue

        if stripped == "* * *" or stripped == "---":
            flush_para(); flush_list()
            i += 1
            continue

        m = H_RE.match(stripped)
        if m:
            flush_para(); flush_list()
            level = len(m.group(1))
            text = clean(m.group(2))
            if level == 1 and not title_consumed:
                title_consumed = True
                i += 1
                continue
            # promote h1 (no siendo título) a h2
            if level == 1: level = 2
            if level > 4: level = 4
            blocks.append({"type": "heading", "level": level, "text": text})
            i += 1
            continue

        m = LIST_RE.match(line)
        if m:
            flush_para()
            list_buf.append(m.group(1))
            i += 1
            continue

        # párrafo normal
        flush_list()
        para_buf.append(stripped)
        i += 1

    flush_para(); flush_list()

    # Post-procesado: convertir secciones "Mantra: ..." y "Práctica: ..."
    # Heurística simple: si un párrafo es muy corto y empieza con comillas, lo dejamos como párrafo;
    # si justo tras un heading "Mantra ..." viene un párrafo, convertirlo a mantra.
    out = []
    j = 0
    while j < len(blocks):
        b = blocks[j]
        if b["type"] == "heading" and MANTRA_TITLE_RE.match(b["text"]):
            # tomar siguientes párrafos hasta otro heading
            j += 1
            mantras = []
            while j < len(blocks) and blocks[j]["type"] == "paragraph":
                mantras.append(blocks[j]["text"])
                j += 1
            for txt in mantras:
                out.append({"type": "mantra", "text": txt})
            continue
        if b["type"] == "heading" and PRACTICE_TITLE_RE.match(b["text"]):
            title = b["text"]
            j += 1
            steps = []
            intro = []
            while j < len(blocks) and blocks[j]["type"] != "heading":
                nb = blocks[j]
                if nb["type"] == "list":
                    steps.extend(nb["items"])
                elif nb["type"] == "paragraph":
                    if not steps:
                        intro.append(nb["text"])
                    else:
                        # tras una lista, párrafo extra: lo guardamos como párrafo posterior
                        break
                j += 1
            # emit heading + intro como párrafo + practice si hay steps
            out.append({"type": "heading", "level": 2, "text": title})
            for p in intro:
                out.append({"type": "paragraph", "text": p})
            if steps:
                out.append({"type": "practice", "title": title, "steps": steps})
            continue
        out.append(b); j += 1

    return out


def insert_cover(content, cover):
    cb = {"type": "image", **cover}
    if content and content[0]["type"] == "heading":
        return [content[0], cb] + content[1:]
    return [cb] + content


def build_entry(doc, blocks):
    return {
        "id": doc["id"],
        "collection": "yoes",
        "title": doc["title"],
        "summary": doc["summary"],
        "tags": doc["tags"],
        "related": [],
        "status": "completo",
        "source": "Documento original del autor (Conciencia Revolucionaria)",
        "missingSource": False,
        "cover": doc["cover"],
        "content": insert_cover(blocks, doc["cover"]),
    }


def main():
    data = json.loads(YOES_PATH.read_text())
    existing_ids = {y["id"] for y in data}

    for doc in DOCS:
        md = Path(doc["source"]).read_text()
        blocks = parse_markdown(md)
        entry = build_entry(doc, blocks)
        if entry["id"] in existing_ids:
            data = [y for y in data if y["id"] != entry["id"]]
        data.append(entry)
        print(f"+ {entry['id']}  ({len(entry['content'])} bloques)")

    YOES_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2))
    print(f"\nTotal Yoes en JSON: {len(data)}")


if __name__ == "__main__":
    main()
