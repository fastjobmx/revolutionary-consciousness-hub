#!/usr/bin/env python3
"""Extrae conferencias estructuradas desde los PDFs de Fase A y Fase B."""
import fitz, json, re, os, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PDFS = ROOT / "_scripts" / "_pdfs"
if not PDFS.exists():
    PDFS = Path("/tmp/cr/pdfs")
OUT = ROOT / "public" / "data" / "conferencias.json"
OUT.parent.mkdir(parents=True, exist_ok=True)

FASE_A_TITLES = {
     1: "El Conocimiento de Sí Mismo y Objetivos",
     2: "Cuerpo Físico, Vital, Astral, Mental, Causal, Búdico y Átmico",
     3: "Las Tres Mentes",
     4: "Mente Sensual, Mente Intermedia y Mente Interior",
     5: "Las Dimensiones y Dónde están en Nosotros",
     6: "Las Dimensiones y Dónde están en Nosotros (cont.)",
     7: "El Ego y los Yoes",
     8: "La Conciencia y el Despertar",
     9: "Los Tres Cerebros",
    10: "Los Cinco Centros y la Energía",
    11: "El Centro Magnético",
    12: "La Personalidad",
    13: "El Esencia y el Ser",
    14: "Las Leyes de Octavas",
    15: "Las Leyes 3 y 7",
    16: "Los Tres Factores de la Revolución de la Conciencia",
    17: "El Nacer Segunda Vez",
    18: "El Morir en Sí Mismo",
    19: "El Sacrificio por la Humanidad",
    20: "Los Cuatro Pilares de la Sabiduría",
    21: "Ciencia, Arte, Filosofía y Mística",
    22: "El Ego del Orgullo",
    23: "El Ego de la Ira",
    24: "El Ego de la Lujuria",
    25: "El Ego de la Codicia",
    26: "El Ego de la Envidia",
    27: "El Ego de la Pereza",
    28: "El Ego de la Gula",
    29: "Los Yoes Secundarios",
    30: "La Auto-Observación",
    31: "El Auto-Recuerdo",
    32: "La Eliminación de Defectos",
    33: "La Muerte Psicológica",
    34: "La Comprensión de los Defectos",
    35: "Mantram y Oración",
    36: "Meditación y Koanes",
    37: "La Meditación Reflexiva",
    38: "Los Sueños y el Mundo Astral",
    39: "El Desdoblamiento Astral",
    40: "El Karma y la Ley de Causa y Efecto",
    41: "El Dharma y el Buen Obrar",
    42: "Las Vidas Sucesivas",
    43: "El Retorno y la Recurrencia",
    44: "La Ley del Eterno Retorno",
    45: "Los Cuerpos Solares",
    46: "El Trabajo Esotérico",
    47: "La Disciplina Interior",
    48: "El Servicio a la Humanidad",
    49: "El Camino de la Iniciación",
    50: "El Llamado del Padre Interior",
}

# ---------------- helpers ----------------
def clean_lines(text):
    lines = []
    for ln in text.split('\n'):
        s = ln.strip()
        if not s: continue
        if 'www.conocimientodesimismo' in s.lower(): continue
        if re.match(r'^\d+\s+de\s+\d+\.?$', s, re.I): continue
        if re.match(r'^Conferencia de Fase [AB]\.?$', s, re.I): continue
        if re.match(r'^Conocimiento de Si Mismo$', s, re.I): continue
        if re.match(r'^Fase [AB]$', s, re.I): continue
        if re.match(r'^Página\s*\d+$', s, re.I): continue
        if re.match(r'^Libro de Conferencias.*$', s, re.I): continue
        lines.append(s)
    return lines

def get_page_text(doc, i):
    return doc[i].get_text()

# ---------------- Fase A ----------------
def extract_fase_a():
    doc = fitz.open(str(PDFS / "Conferencias_Fase_A.pdf"))
    # find conf markers
    markers = []  # (conf_num, page_index)
    pat = re.compile(r'Conf(?:erencia)?\.?\s*0?(\d{1,2})\s*(?:y\s*0?(\d{1,2}))?\s+([A-ZÁÉÍÓÚÑ][^\n]+)', re.I)
    page_text_cache = {}
    for i in range(doc.page_count):
        t = get_page_text(doc, i)
        page_text_cache[i] = t
        # detect first conference start on a content page (skip TOC pages 1-4)
        if i < 3: continue
        for m in pat.finditer(t):
            n1 = int(m.group(1)); n2 = m.group(2)
            # Only accept if line starts with "Conf" near top and not in TOC dot leaders
            if '...' in m.group(0): continue
            if n1 < 1 or n1 > 50: continue
            if not markers or markers[-1][0] != n1:
                markers.append((n1, i, n2))
                if n2 and (not markers or markers[-1][0] != int(n2)):
                    markers.append((int(n2), i, None))
    # dedupe consecutive same nums
    seen = set(); clean = []
    for n,i,paired in markers:
        if n in seen: continue
        seen.add(n); clean.append((n,i,paired))
    clean.sort(key=lambda x: x[0])
    print(f"[Fase A] markers: {[c[0] for c in clean]}")

    # build conferences
    confs = []
    for idx, (n, start_page, paired) in enumerate(clean):
        # end page = next marker's start - 1, or last page
        if idx + 1 < len(clean):
            end_page = clean[idx+1][1]
        else:
            end_page = doc.page_count - 1
        # gather lines between start_page and end_page
        pages = list(range(start_page, end_page + 1)) if end_page > start_page else [start_page]
        all_lines = []
        for p in pages:
            all_lines.extend(clean_lines(page_text_cache[p]))
        # find slice: from "Conf. NN" line to next "Conf. (n+1)"
        text_joined = '\n'.join(all_lines)
        # Try to slice precisely
        m = re.search(rf'Conf(?:erencia)?\.?\s*0?{n}\b', text_joined, re.I)
        if m:
            text_joined = text_joined[m.start():]
        # cut at next conference (n+1 or above)
        next_n = n + 1
        if paired:
            # this is a joined conf 5+6: same content
            pass
        m2 = re.search(rf'\nConf(?:erencia)?\.?\s*0?{next_n}\b', text_joined, re.I)
        if m2:
            text_joined = text_joined[:m2.start()]

        title = FASE_A_TITLES.get(n, f"Conferencia {n:02d}")
        # detect title line
        first_line = text_joined.split('\n', 1)[0]
        body = text_joined.split('\n', 1)[1] if '\n' in text_joined else ''

        confs.append({
            "id": f"fase-a-{n:02d}",
            "collection": "conferencias",
            "phase": "A",
            "number": f"{n:02d}",
            "title": title,
            "page": start_page + 1,
            "pageStart": start_page + 1,
            "pageEnd": end_page + 1,
            "summary": "",
            "tags": [],
            "related": [],
            "sourcePdf": "Conferencias Fase A.pdf",
            "sourcePages": list(range(start_page + 1, end_page + 2)),
            "images": [],
            "_raw": body.strip(),
        })
    return confs

# ---------------- Fase B ----------------
def extract_fase_b():
    doc = fitz.open(str(PDFS / "FASE_B_2010.pdf"))
    pat = re.compile(r'Conferencia\s+Nro\.\s*(\d{1,2})\s*-\s*Fase\s*[\"“”\']?B[\"“”\']?', re.I)
    title_pat = re.compile(r'Conferencia\s+Nro\.\s*(\d{1,2})[^\n]*\n+([A-ZÁÉÍÓÚÑ][^\n]{3,90})')
    page_text = {i: get_page_text(doc, i) for i in range(doc.page_count)}
    markers = []
    for i, t in page_text.items():
        for m in pat.finditer(t):
            n = int(m.group(1))
            if n < 1 or n > 25: continue
            if not markers or markers[-1][0] != n:
                markers.append((n, i))
    seen=set(); clean=[]
    for n,i in markers:
        if n in seen: continue
        seen.add(n); clean.append((n,i))
    clean.sort(key=lambda x:x[0])
    print(f"[Fase B] markers: {[c[0] for c in clean]}")
    confs=[]
    for idx,(n,start_page) in enumerate(clean):
        end_page = clean[idx+1][1] if idx+1<len(clean) else doc.page_count-1
        pages = list(range(start_page, end_page+1)) if end_page>start_page else [start_page]
        lines=[]
        for p in pages: lines.extend(clean_lines(page_text[p]))
        text_joined='\n'.join(lines)
        m = re.search(rf'Conferencia\s+Nro\.\s*{n}\b[^\n]*', text_joined, re.I)
        if m: text_joined = text_joined[m.end():].lstrip('\n')
        if idx+1<len(clean):
            m2 = re.search(rf'Conferencia\s+Nro\.\s*{n+1}\b', text_joined, re.I)
            if m2: text_joined = text_joined[:m2.start()]
        first = text_joined.split('\n',1)[0].strip()
        title = first.title() if first.isupper() else first
        body = text_joined.split('\n',1)[1] if '\n' in text_joined else ''
        confs.append({
            "id": f"fase-b-{n:02d}",
            "collection": "conferencias",
            "phase": "B",
            "number": f"{n:02d}",
            "title": title or f"Conferencia {n:02d} Fase B",
            "page": start_page+1,
            "pageStart": start_page+1,
            "pageEnd": end_page+1,
            "summary": "",
            "tags": [],
            "related": [],
            "sourcePdf": "FASE B 2010.pdf",
            "sourcePages": list(range(start_page+1, end_page+2)),
            "images": [],
            "_raw": body.strip(),
        })
    return confs

# ---------------- Block parser ----------------
def to_blocks(raw):
    """Convert raw text into structured blocks."""
    if not raw: return []
    blocks=[]
    buf=[]; lst=[]
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
    lines=[l.strip() for l in raw.split('\n') if l.strip()]
    for ls in lines:
        is_upper_h = len(ls)<80 and ls.isupper() and len(ls)>3
        is_num_h = re.match(r'^\d+\.\-?\s+[A-ZÁÉÍÓÚÑ][^.]{3,70}:?$', ls)
        # short line, no terminal punctuation, looks like a heading
        ends_terminal = bool(re.search(r'[\.,;:]$', ls))
        is_short_h = (5 <= len(ls) <= 70 and not ends_terminal and re.match(r'^[¿¡A-ZÁÉÍÓÚÑ]', ls) and not re.search(r'\b(que|los|las|y|de|en|el|la)\b', ls.split()[-1].lower() if ls.split() else ''))
        bm = re.match(r'^(?:[-•·▪–—]|\d+[\.\-\)])\s+(.+)$', ls)
        is_mantra = re.match(r'^MANTRA[M]?\b[: ]', ls, re.I)
        is_practice = re.match(r'^(PR[ÁA]CTICA|EJERCICIO)\b', ls, re.I)
        if bm:
            fp(); lst.append(bm.group(1))
            continue
        if is_upper_h or is_num_h or (is_short_h and not bm):
            fp(); fl()
            level = 2 if is_upper_h else 3
            blocks.append({"type":"heading","level":level,"text":ls.rstrip(':')})
            continue
        if is_mantra:
            fp(); fl()
            blocks.append({"type":"mantra","text":re.sub(r'^MANTRA[M]?\s*[:\-]?\s*','',ls,flags=re.I)})
            continue
        fl()
        buf.append(ls)
        # close paragraph after sentence-ending line
        if ls.endswith('.') or ls.endswith('?') or ls.endswith('!'):
            # only if accumulated 2+ sentences worth
            joined=' '.join(buf)
            if len(joined) > 180:
                fp()
    fp(); fl()
    return blocks

def make_summary(blocks):
    for b in blocks:
        if b["type"]=="paragraph" and len(b["text"])>80:
            t=b["text"]
            return (t[:240]+"…") if len(t)>240 else t
    return ""

TAG_KEYWORDS = {
    "psicologia": ["yo","ego","defecto","psicolog"],
    "practica": ["práctica","practica","ejercicio"],
    "meditacion": ["meditac","koan","reflexiv"],
    "astral": ["astral","desdoblamiento","sueño"],
    "karma": ["karma","dharma","causa"],
    "ego": ["orgullo","ira","lujuria","codicia","envidia","pereza","gula"],
    "tres-factores": ["nacer","morir","sacrificio"],
    "auto-conocimiento": ["sí mismo","si mismo","conocimiento","conciencia"],
    "mantra": ["mantram","mantra","oración"],
    "centros": ["cerebro","centro","energía"],
    "cuerpos": ["cuerpo","vital","mental","causal"],
    "ser": ["ser","esencia","personalidad"],
}
def make_tags(text):
    t=text.lower(); out=[]
    for tag,kws in TAG_KEYWORDS.items():
        if any(k in t for k in kws): out.append(tag)
    return out[:6]

def main():
    a = extract_fase_a()
    b = extract_fase_b()
    all_confs = a + b
    for c in all_confs:
        c["content"] = to_blocks(c.pop("_raw"))
        joined = ' '.join(blk.get("text","") + ' '.join(blk.get("items",[])) for blk in c["content"] if isinstance(blk,dict))
        c["summary"] = make_summary(c["content"]) or f"Conferencia {c['number']} de Fase {c['phase']}."
        c["tags"] = make_tags(c["title"]+' '+joined)
    # Related: by shared tags within same phase
    by_id = {c["id"]: c for c in all_confs}
    for c in all_confs:
        scored=[]
        for o in all_confs:
            if o["id"]==c["id"]: continue
            shared=len(set(c["tags"])&set(o["tags"]))
            if shared: scored.append((shared,o["id"]))
        scored.sort(reverse=True)
        c["related"]=[s[1] for s in scored[:3]]
    OUT.write_text(json.dumps(all_confs, ensure_ascii=False, indent=2))
    print(f"Wrote {len(all_confs)} conferencias to {OUT}")
    # quick stats
    fa=[c for c in all_confs if c["phase"]=="A"]
    fb=[c for c in all_confs if c["phase"]=="B"]
    print(f"  Fase A: {len(fa)}/50")
    print(f"  Fase B: {len(fb)}/25")
    short=[c["id"] for c in all_confs if sum(len(b.get("text",""))+sum(len(i) for i in b.get("items",[])) for b in c["content"])<400]
    print(f"  Sospechosamente cortas: {short}")

if __name__=="__main__":
    main()
