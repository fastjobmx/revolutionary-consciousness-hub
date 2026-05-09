#!/usr/bin/env python3
"""Extrae Estudios de Yoes desde los PDFs proporcionados."""
import fitz, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PDFS = Path("/tmp/cr/pdfs")
OUT = ROOT / "public" / "data" / "yoes.json"

YOES_SOURCES = [
    {
        "id": "yo-abatimiento-duelo",
        "title": "El Yo del Abatimiento por Pérdida Afectiva o Duelo",
        "summary": "Estudio del yo de la depresión, el abatimiento y el duelo: cómo se manifiesta, qué lo origina y cómo trabajarlo.",
        "tags": ["duelo","depresión","psicología","ego"],
        "pdf": "YO_DEPRESION.pdf",
        "status": "completo",
    },
    {
        "id": "yo-conquistador",
        "title": "El Yo Conquistador",
        "summary": "Estudio del yo conquistador: la búsqueda compulsiva de validación a través de la conquista del otro.",
        "tags": ["conquista","ego","psicología"],
        "pdf": "Yo_Conquistador.pdf",
        "status": "completo",
    },
    {
        "id": "yo-relacion-toxica",
        "title": "El Yo de la Relación Tóxica",
        "summary": "Estudio del yo que sostiene los vínculos tóxicos: dependencia emocional, idealización y autodestrucción.",
        "tags": ["relación","ego","psicología","dependencia"],
        "pdf": "estudio_relacion_toxica.pdf",
        "status": "completo",
    },
    {
        "id": "yo-machista",
        "title": "El Yo Machista",
        "summary": "Estudio en preparación.",
        "tags": ["machismo","ego","psicología"],
        "pdf": None,
        "status": "incompleto",
    },
    {
        "id": "yo-miedo",
        "title": "El Yo del Miedo",
        "summary": "Estudio en preparación.",
        "tags": ["miedo","ego","psicología"],
        "pdf": None,
        "status": "incompleto",
    },
    {
        "id": "preguntas-meditacion-reflexiva",
        "title": "500 Preguntas para Meditación Reflexiva",
        "summary": "Compendio de preguntas para meditación reflexiva sobre los yoes, defectos y aspectos del trabajo interior.",
        "tags": ["meditación","preguntas","práctica"],
        "pdf": None,
        "status": "incompleto",
    },
]

def clean(text):
    out=[]
    for ln in text.split('\n'):
        s=ln.strip()
        if not s: continue
        if 'www.' in s.lower() and len(s)<60: continue
        if re.match(r'^\d+\s+de\s+\d+\.?$', s): continue
        if re.match(r'^Página\s*\d+$', s, re.I): continue
        out.append(s)
    return out

def to_blocks(raw):
    if not raw: return []
    blocks=[]; buf=[]; lst=[]
    def fp():
        nonlocal buf
        if buf:
            t=' '.join(buf).strip()
            if t: blocks.append({"type":"paragraph","text":t})
            buf=[]
    def fl():
        nonlocal lst
        if lst:
            blocks.append({"type":"list","items":lst[:]}); lst=[]
    for ln in raw.split('\n'):
        s=ln.strip()
        if not s: continue
        is_h = (len(s)<80 and s.isupper() and len(s)>3) or re.match(r'^\d+\.\-?\s+[A-ZÁÉÍÓÚÑ][^.]{2,70}:?$', s)
        bm = re.match(r'^(?:[-•·▪]|\d+[\.\-\)])\s+(.+)$', s)
        if is_h and not bm:
            fp(); fl()
            blocks.append({"type":"heading","level":3,"text":s.rstrip(':')})
        elif bm:
            fp(); lst.append(bm.group(1))
        else:
            fl(); buf.append(s)
    fp(); fl()
    return blocks

def main():
    yoes=[]
    for spec in YOES_SOURCES:
        entry = {
            "id": spec["id"],
            "collection": "yoes",
            "title": spec["title"],
            "summary": spec["summary"],
            "tags": spec["tags"],
            "related": [],
            "status": spec["status"],
            "source": spec["pdf"] or "fuente pendiente",
            "missingSource": spec["pdf"] is None,
            "content": [],
        }
        if spec["pdf"]:
            doc = fitz.open(str(PDFS / spec["pdf"]))
            lines=[]
            for i in range(doc.page_count):
                lines.extend(clean(doc[i].get_text()))
            entry["content"] = to_blocks('\n'.join(lines))
        else:
            entry["content"] = [
                {"type":"paragraph","text":"Contenido en preparación. Esta sección requiere la fuente original (PDF o texto) para ser publicada."},
            ]
        yoes.append(entry)
    # related by shared tags
    for y in yoes:
        scored=[(len(set(y["tags"])&set(o["tags"])), o["id"]) for o in yoes if o["id"]!=y["id"]]
        scored=[s for s in scored if s[0]>0]
        scored.sort(reverse=True)
        y["related"]=[s[1] for s in scored[:3]]
    OUT.write_text(json.dumps(yoes, ensure_ascii=False, indent=2))
    print(f"Wrote {len(yoes)} yoes to {OUT}")
    for y in yoes:
        bcount = len(y["content"])
        print(f"  {y['id']}: {y['status']} ({bcount} bloques)")

if __name__=="__main__":
    main()
