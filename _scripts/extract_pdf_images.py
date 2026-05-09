#!/usr/bin/env python3
"""Extrae imágenes de los PDFs de conferencias y genera el manifest."""
import fitz, json, hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PDFS = Path("/tmp/cr/pdfs")
ASSETS = ROOT / "public" / "assets" / "conferencias"
DATA = ROOT / "public" / "data"
DATA.mkdir(parents=True, exist_ok=True)

SOURCES = [
    ("A", "Conferencias_Fase_A.pdf", ASSETS / "fase-a"),
    ("B", "FASE_B_2010.pdf",         ASSETS / "fase-b"),
]

# Skip tiny / repeated logos: hash dedup
seen_hashes = set()

def extract():
    confs = json.loads((DATA / "conferencias.json").read_text())
    by_pages = {}  # (phase, page) -> conf_id
    for c in confs:
        for p in c["sourcePages"]:
            by_pages.setdefault((c["phase"], p), c["id"])
    manifest = []
    for phase, fn, outdir in SOURCES:
        outdir.mkdir(parents=True, exist_ok=True)
        doc = fitz.open(str(PDFS / fn))
        for pno in range(doc.page_count):
            for ix, img in enumerate(doc.get_page_images(pno, full=True), 1):
                xref = img[0]
                try:
                    pix = fitz.Pixmap(doc, xref)
                    if pix.n - pix.alpha >= 4:
                        pix = fitz.Pixmap(fitz.csRGB, pix)
                    data = pix.tobytes("png")
                except Exception:
                    continue
                # filter tiny
                if pix.width < 80 or pix.height < 80: continue
                h = hashlib.md5(data).hexdigest()
                if h in seen_hashes: continue
                seen_hashes.add(h)
                page_human = pno + 1
                name = f"fase-{phase.lower()}-p{page_human:03d}-img{ix:02d}.png"
                fp = outdir / name
                fp.write_bytes(data)
                rel_id = by_pages.get((phase, page_human))
                manifest.append({
                    "id": fp.stem,
                    "phase": phase,
                    "page": page_human,
                    "src": f"/assets/conferencias/fase-{phase.lower()}/{name}",
                    "alt": f"Imagen extraída de Fase {phase}, página {page_human}",
                    "caption": "",
                    "relatedLectureIds": [rel_id] if rel_id else [],
                    "needsManualPlacement": rel_id is None,
                    "width": pix.width,
                    "height": pix.height,
                })
    (DATA / "images-manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2))
    print(f"Extraídas {len(manifest)} imágenes únicas")
    # Integrate into conferencias.json
    by_lec = {}
    for img in manifest:
        for lid in img["relatedLectureIds"]:
            by_lec.setdefault(lid, []).append(img)
    for c in confs:
        imgs = by_lec.get(c["id"], [])
        c["images"] = [{"id":i["id"],"src":i["src"],"alt":i["alt"],"caption":i["caption"],"sourcePage":i["page"]} for i in imgs]
        # insert into content near matching page if possible (simple: append after first heading)
        if imgs:
            inserted = False
            for idx, blk in enumerate(c["content"]):
                if blk.get("type") == "heading":
                    for i, im in enumerate(imgs):
                        c["content"].insert(idx + 1 + i, {"type":"image", **{k:im[k] for k in ("src","alt","caption")}, "sourcePage": im["page"]})
                    inserted = True
                    break
            if not inserted:
                for im in imgs:
                    c["content"].append({"type":"image", **{k:im[k] for k in ("src","alt","caption")}, "sourcePage": im["page"]})
    (DATA / "conferencias.json").write_text(json.dumps(confs, ensure_ascii=False, indent=2))
    with_imgs = sum(1 for c in confs if c["images"])
    print(f"Conferencias con imágenes integradas: {with_imgs}")

if __name__ == "__main__":
    extract()
