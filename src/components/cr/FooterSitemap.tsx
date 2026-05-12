import { Link } from "@tanstack/react-router";
import { SOCIAL } from "@/lib/cr/queries";

type Leaf = {
  label: string;
  to?: string;
  href?: string;
  params?: Record<string, string>;
};

type Group = {
  title: string;
  rootTo?: string;
  rootLabel?: string;
  children: Leaf[];
};

const GROUPS: Group[] = [
  {
    title: "Conferencias",
    rootTo: "/conferencias",
    rootLabel: "Biblioteca completa",
    children: [
      { label: "Cómo empezar", to: "/como-empezar" },
      { label: "Conf. 01 — Introducción", to: "/conferencia/$id", params: { id: "fase-a-01" } },
      { label: "Fase A · Fundamentos", to: "/conferencias-fase-a" },
      { label: "Fase B · Profundización", to: "/conferencias-fase-b" },
      { label: "Libros recomendados", to: "/libros" },
    ],
  },
  {
    title: "Yoes",
    rootTo: "/yoes",
    rootLabel: "Todos los estudios",
    children: [
      { label: "Yo Conquistador", to: "/yo/$id", params: { id: "yo-conquistador" } },
      { label: "Yo del Miedo", to: "/yo/$id", params: { id: "yo-miedo" } },
      { label: "Yo Machista", to: "/yo/$id", params: { id: "yo-machista" } },
      { label: "Yo de la Relación Tóxica", to: "/yo/$id", params: { id: "yo-relacion-toxica" } },
      { label: "Yo del Despecho", to: "/yo/$id", params: { id: "yo-despecho" } },
      { label: "Yo de la Idealización", to: "/yo/$id", params: { id: "yo-idealizacion-cuerpos" } },
    ],
  },
  {
    title: "Comunidad",
    rootTo: "/salas",
    rootLabel: "Salas de estudio",
    children: [
      { label: "Sobre el proyecto", to: "/sobre" },
      { label: "Contacto", to: "/contacto" },
      { label: "Grupo de WhatsApp", href: SOCIAL.whatsappGroup },
      { label: "YouTube", href: SOCIAL.youtube },
      { label: "Instagram", href: SOCIAL.instagram },
    ].filter((c: any) => !c.href || c.href !== "#") as Leaf[],
  },
];

function Item({ leaf }: { leaf: Leaf }) {
  const cls =
    "group inline-flex items-center gap-2 py-1 text-[0.825rem] leading-snug text-[color:color-mix(in_oklab,var(--bone)_72%,var(--ash))] transition-colors duration-200 hover:text-[color:var(--gold2)] focus-visible:text-[color:var(--gold2)]";
  const dot = (
    <span
      aria-hidden
      className="h-px w-3 shrink-0 bg-[color:color-mix(in_oklab,var(--gold)_35%,transparent)] transition-all duration-200 group-hover:w-5 group-hover:bg-[color:color-mix(in_oklab,var(--gold)_70%,transparent)]"
    />
  );
  if (leaf.href) {
    return (
      <a href={leaf.href} target="_blank" rel="noreferrer" className={cls}>
        {dot}
        <span>{leaf.label}</span>
      </a>
    );
  }
  return (
    <Link to={leaf.to as any} params={leaf.params as any} className={cls}>
      {dot}
      <span>{leaf.label}</span>
    </Link>
  );
}

export function FooterSitemap() {
  return (
    <section
      aria-labelledby="footer-sitemap-title"
      className="relative mt-12 rounded-2xl border border-[color:color-mix(in_oklab,var(--gold)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--void)_92%,var(--gold)_2%)] px-5 py-7 sm:px-8 sm:py-8 md:px-10 md:py-9"
    >
      <div className="mb-7 flex flex-col gap-1">
        <p className="cr-eyebrow !text-[0.6rem] tracking-[0.32em] text-[color:color-mix(in_oklab,var(--gold)_70%,var(--ash))] opacity-85">
          Mapa del sitio
        </p>
        <h3
          id="footer-sitemap-title"
          className="font-display text-[1.15rem] tracking-tight text-[color:var(--bone)] md:text-[1.25rem]"
        >
          Recorre el camino completo
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map((g) => (
          <nav key={g.title} aria-label={g.title} className="space-y-3">
            <div className="flex items-baseline justify-between gap-3 border-b border-[color:color-mix(in_oklab,var(--gold)_10%,transparent)] pb-2.5">
              <h4 className="font-display text-[0.95rem] tracking-tight text-[color:var(--bone)]">
                {g.title}
              </h4>
              {g.rootTo && (
                <Link
                  to={g.rootTo as any}
                  className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[color:color-mix(in_oklab,var(--gold)_75%,var(--ash))] opacity-80 transition-colors hover:text-[color:var(--gold2)] hover:opacity-100"
                >
                  {g.rootLabel ?? "Ver todo"} →
                </Link>
              )}
            </div>
            <ul className="flex flex-col gap-0.5">
              {g.children.map((c) => (
                <li key={c.label} className="pl-1">
                  <Item leaf={c} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </section>
  );
}
