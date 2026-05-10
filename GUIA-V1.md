# GUÍA V1 — Conciencia Revolucionaria

Guía administrativa para entender, mantener y extender el sitio.

---

## 1. Visión

Conciencia Revolucionaria es una **experiencia digital editorial** para el estudio del Conocimiento de Sí Mismo. Tres pilares:

1. **Biblioteca de 75 conferencias** (Fase A: 50, Fase B: 25).
2. **Estudios de los Yoes** (psicología práctica del trabajo interior).
3. **Comunidad** (WhatsApp, YouTube, Instagram, TikTok, Facebook).

Estética: oro · obsidiana · marfil. Tipografía editorial, animaciones cinematográficas, lectura prolongada cómoda.

---

## 2. Stack técnico

- **Framework**: TanStack Start (React 19 + Vite 7, SSR-ready).
- **Routing**: file-based en `src/routes/` (auto-generado a `routeTree.gen.ts`).
- **Estilos**: Tailwind v4 + tokens semánticos en `src/styles.css`.
- **Datos**: JSON estático en `public/data/` (sin backend en V1).
- **Estado de lectura**: `localStorage` (lecturas, progreso, filtros).

No se requiere base de datos ni Lovable Cloud para V1.

---

## 3. Estructura del proyecto

```
src/
  routes/
    __root.tsx              # layout raíz (HTML shell, navbar, footer)
    index.tsx               # / — landing
    sobre.tsx               # /sobre — manifiesto + pilares + método
    contacto.tsx            # /contacto — canales + WhatsApp directo
    conferencias.tsx        # /conferencias — biblioteca con buscador/filtros
    conferencia.$id.tsx     # /conferencia/:id — lector con TOC, focus mode
    yoes.tsx                # /yoes — estudios psicológicos
    yo.$id.tsx              # /yo/:id — lector de estudio
  components/cr/
    Navbar.tsx · Footer.tsx · Reveal.tsx · ContentBlocks.tsx
  lib/cr/
    queries.ts · storage.ts · types.ts
public/
  data/
    conferencias.json       # 75 conferencias estructuradas
    yoes.json               # 6 estudios (3 completos + 3 en preparación)
    images-manifest.json
  assets/
    conferencias/fase-a/    # PNG extraídos
    conferencias/fase-b/
    logo/logo.png
_scripts/
  extract_pdf_text.py       # parser de PDFs → conferencias.json
  extract_pdf_images.py     # extracción de imágenes
  extract_yoes.py           # parser de PDFs de yoes
  audit_content.py          # auditoría de cobertura
```

---

## 4. Datos: cómo se generan

Los JSON se generan a partir de los PDFs originales. Para regenerar:

```bash
mkdir -p /tmp/cr/pdfs
# colocar los PDFs en /tmp/cr/pdfs/:
#   Conferencias_Fase_A.pdf
#   FASE_B_2010.pdf
#   YO_DEPRESION.pdf
#   Yo_Conquistador.pdf
#   estudio_relacion_toxica.pdf

python3 _scripts/extract_pdf_text.py     # → public/data/conferencias.json
python3 _scripts/extract_pdf_images.py   # → public/assets/conferencias/...
python3 _scripts/extract_yoes.py         # → public/data/yoes.json
python3 _scripts/audit_content.py        # reporte de cobertura
```

### Esquema de una conferencia

```json
{
  "id": "fase-a-01",
  "phase": "A",
  "number": "01",
  "title": "El Conocimiento de Sí Mismo y Objetivos",
  "summary": "...",
  "tags": ["psicologia","practica"],
  "related": ["fase-a-41","fase-a-14"],
  "images": [{ "src": "/assets/conferencias/fase-a/...", "alt": "...", "sourcePage": 5 }],
  "content": [
    { "type": "heading", "level": 2, "text": "..." },
    { "type": "paragraph", "text": "..." },
    { "type": "list", "items": ["...","..."] },
    { "type": "mantra", "text": "..." },
    { "type": "practice", "title": "...", "steps": ["..."] },
    { "type": "image", "src": "...", "alt": "...", "caption": "..." }
  ]
}
```

Tipos de bloque soportados por `ContentBlocks.tsx`: `heading`, `paragraph`, `list`, `quote`, `mantra`, `practice`, `table`, `image`.

---

## 5. Edición manual de contenido

Para corregir un título, resumen o párrafo concreto sin regenerar:

1. Abre `public/data/conferencias.json`.
2. Busca por `"id"` (ej. `"fase-b-02"`).
3. Modifica el campo (`title`, `summary`, o un bloque dentro de `content`).
4. Guarda. El cambio aparece en caliente.

Para añadir una imagen a una conferencia:

1. Coloca el PNG en `public/assets/conferencias/fase-X/`.
2. Añade un bloque `image` dentro del `content` correspondiente, o agrégalo al array `images` para que aparezca en la cabecera.

---

## 6. Diseño y design system

Todos los tokens viven en `src/styles.css`:

- Colores: `--gold`, `--gold2`, `--obsidian`, `--ink`, `--void`, `--bone`, `--ivory`, `--ash`.
- Utilidades: `.cr-display`, `.cr-eyebrow`, `.cr-shimmer`, `.cr-halo`, `.cr-glass`, `.cr-luxury-border`, `.cr-card`, `.cr-btn`, `.cr-divider`, `.cr-prose`, `.cr-mantra`, `.cr-practice`, `.cr-figure`, `.cr-quote`.

**Regla**: nunca uses colores hardcodeados (`text-white`, `bg-black`). Siempre tokens.

---

## 7. SEO

Cada ruta declara su `head()` con `title`, `description`, `og:title`, `og:description`. Las páginas dinámicas (`conferencia.$id`, `yo.$id`) lo derivan del `loaderData`.

Para mejorar:
- Añadir `sitemap.xml` y `robots.txt` en `public/`.
- Generar `og:image` dinámicas por conferencia.

---

## 8. Enlaces sociales (centralizados)

Edita `src/lib/cr/queries.ts`, objeto `SOCIAL`:

```ts
export const SOCIAL = {
  whatsappGroup: "https://chat.whatsapp.com/KWamxv5ZAsK2JobCfTkkzF",
  whatsappPhone: "+57 302 232 3472",
  whatsappPhoneRaw: "+573022323472",
  youtube: "https://www.youtube.com/@concienciarevolucionaria",
  instagram: "https://www.instagram.com/concienciarevolucionaria18/",
  tiktok: "https://www.tiktok.com/@concienciarevolucionaria",
  facebook: "https://www.facebook.com/profile.php?id=61550522941805",
};
```

Cualquier cambio aquí se propaga a Navbar, Footer y página de Contacto.

---

## 9. Estado V1 vs pendientes

### ✓ Hecho
- 75/75 conferencias navegables.
- 3/6 Yoes con contenido completo (Abatimiento, Conquistador, Relación Tóxica).
- 86 imágenes integradas.
- Navegación: Inicio, Conferencias, Yoes, Sobre, Contacto.
- Lector con TOC, modo enfoque, control de tipografía, progreso por scroll.
- Filtros, buscador, vista grid/lista.
- Diseño responsive, animaciones de revelación, microinteracciones.

### ⏳ Pendiente (V2)
- Yoes: Machista, Miedo, 500 Preguntas (requieren PDF/texto fuente).
- Mejorar parser para detectar bloques `practice` multi-paso.
- Captions reales por imagen (hoy son genéricos).
- `sitemap.xml` y `robots.txt`.
- `og:image` dinámica por conferencia.
- Modo claro (opcional).

---

## 10. Despliegue

El proyecto está configurado para **Cloudflare Workers** vía `wrangler.jsonc`. El build se ejecuta automáticamente en Lovable. Para publicar: usa el botón Publish del editor.
