#!/usr/bin/env python3
"""Auditoría rápida del contenido extraído."""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "public" / "data"
REPORTS = ROOT / "_reports"; REPORTS.mkdir(exist_ok=True)

confs = json.loads((DATA/"conferencias.json").read_text())
yoes = json.loads((DATA/"yoes.json").read_text())
imgs = json.loads((DATA/"images-manifest.json").read_text())

a = [c for c in confs if c["phase"]=="A"]
b = [c for c in confs if c["phase"]=="B"]
short = [c["id"] for c in confs if sum(len(blk.get("text","")) for blk in c["content"])<400]
with_imgs = [c["id"] for c in confs if c["images"]]
ids = [c["id"] for c in confs]
dupes = [i for i in set(ids) if ids.count(i)>1]

md = f"""# Auditoría de contenido

- Conferencias esperadas: 75
- Conferencias encontradas: **{len(confs)}**
- Fase A: **{len(a)}/50**
- Fase B: **{len(b)}/25**
- IDs duplicados: {dupes or 'ninguno'}
- Conferencias con imágenes: **{len(with_imgs)}** / {len(confs)}
- Conferencias sospechosamente cortas (<400 chars): {short or 'ninguna'}
- fase-a-06 presente: {'sí' if any(c['id']=='fase-a-06' for c in confs) else 'NO'}

## Yoes
"""
for y in yoes:
    md += f"- `{y['id']}` — {y['status']} — {len(y['content'])} bloques\n"
md += f"\n## Imágenes\n- Extraídas: {len(imgs)}\n- Integradas en: {len(with_imgs)} conferencias\n- Pendientes manual: {sum(1 for i in imgs if i.get('needsManualPlacement'))}\n"

(REPORTS/"final-v1-report.md").write_text(md)
print(md)
