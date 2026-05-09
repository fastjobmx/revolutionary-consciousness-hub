# Conciencia Revolucionaria

Sitio editorial cinematográfico para el estudio del **Conocimiento de Sí Mismo**: 75 conferencias (Fase A + Fase B), Estudios de los Yoes y la práctica diaria.

Construido con **TanStack Start (React) + Vite + Tailwind v4**. Los datos viven en `/public/data/*.json` y se generan a partir de los PDFs originales mediante scripts Python.

## Estructura

```
public/
  data/
    conferencias.json       # 75 conferencias estructuradas
    yoes.json               # 6 estudios (3 completos, 3 en preparación)
    images-manifest.json    # imágenes extraídas de los PDFs
  assets/
    logo/                   # logo Trinity
    conferencias/fase-a/    # 86 imágenes extraídas
    conferencias/fase-b/
src/
  routes/
    __root.tsx              # shell + Navbar + Footer
    index.tsx               # Landing cinematográfica
    conferencias.tsx        # Biblioteca con buscador + filtros + grid/lista
    conferencia.$id.tsx     # Lector con TOC, foco, progreso, relacionados
    yoes.tsx                # Biblioteca de Yoes
    yo.$id.tsx              # Lector de Yoes
  components/cr/            # Navbar, Footer, ContentBlocks, Reveal
  lib/cr/                   # types, queries, storage (localStorage)
_scripts/
  extract_pdf_text.py       # Fase A + Fase B → JSON estructurado
  extract_pdf_images.py     # imágenes + manifest + integración
  extract_yoes.py           # Estudios de Yoes
  audit_content.py          # auditoría
_reports/                   # informes de auditoría
```

## Regenerar datos desde PDFs

Coloca los PDFs en `_scripts/_pdfs/` (o ajusta la ruta) y ejecuta:

```bash
python3 _scripts/extract_pdf_text.py
python3 _scripts/extract_pdf_images.py
python3 _scripts/extract_yoes.py
python3 _scripts/audit_content.py
```

## Contenido cubierto

- **Conferencias Fase A**: 50/50 ✅
- **Conferencias Fase B**: 25/25 ✅
- **Estudios de Yoes completos**: Yo del Abatimiento, Yo Conquistador, Yo de la Relación Tóxica
- **Estudios en preparación**: Yo Machista, Yo del Miedo, 500 Preguntas para Meditación Reflexiva
- **Imágenes extraídas**: 86 (integradas en 36 conferencias)

## Comunidad

- WhatsApp: <https://chat.whatsapp.com/KWamxv5ZAsK2JobCfTkkzF> · +57 302 232 3472
- YouTube: <https://www.youtube.com/@concienciarevolucionaria>
- Instagram: <https://www.instagram.com/concienciarevolucionaria18/>
- TikTok: <https://www.tiktok.com/@concienciarevolucionaria>
- Facebook: <https://www.facebook.com/profile.php?id=61550522941805>

## Publicación

Está pensado para Cloudflare/Vercel/Netlify. El framework hace SSR + assets estáticos automáticamente.
