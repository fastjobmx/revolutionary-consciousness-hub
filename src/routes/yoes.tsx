import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { yoesQuery, normalize } from "@/lib/cr/queries";
import { useReveal } from "@/components/cr/Reveal";

const FILTERS = [
  { id: "todos", label: "Todos" },
  { id: "completo", label: "Completos" },
  { id: "incompleto", label: "En preparación" },
  { id: "duelo", label: "Duelo" },
  { id: "conquista", label: "Conquista" },
  { id: "machismo", label: "Machismo" },
  { id: "miedo", label: "Miedo" },
  { id: "relación", label: "Relación" },
  { id: "preguntas", label: "Preguntas" },
];

export const Route = createFileRoute("/yoes")({
  head: () => ({
    meta: [
      { title: "Estudios de los Yoes — Conciencia Revolucionaria" },
      { name: "description", content: "Una biblioteca psicológica para observar, comprender y transformar los agregados internos." },
      { property: "og:title", content: "Estudios de los Yoes" },
      { property: "og:description", content: "Trabajo psicológico directo sobre los agregados internos." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(yoesQuery()),
  component: YoesPage,
});

function YoesPage() {
  const ref = useReveal();
  const { data: yoes } = useSuspenseQuery(yoesQuery());
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("todos");

  const filtered = useMemo(() => {
    let list = yoes.slice();
    if (tag === "completo" || tag === "incompleto") list = list.filter(y => y.status === tag);
    else if (tag !== "todos") list = list.filter(y => y.tags.some(t => normalize(t).includes(normalize(tag))));
    if (q) {
      const nq = normalize(q);
      list = list.filter(y => normalize(y.title).includes(nq) || normalize(y.summary).includes(nq) || y.tags.some(t => normalize(t).includes(nq)));
    }
    return list;
  }, [yoes, q, tag]);

  return (
    <div ref={ref} className="pt-32 pb-20">
      <section className="relative mx-auto max-w-4xl px-6 text-center mb-16">
        <div className="cr-halo" style={{ inset: "-30% 10%", height: "140%", opacity: 0.4 }} />
        <div className="relative">
          <div className="cr-eyebrow cr-reveal">Trabajo psicológico</div>
          <h1 className="cr-display text-5xl md:text-7xl mt-4 cr-reveal">Estudios de los <span className="cr-shimmer">Yoes</span></h1>
          <p className="mt-6 text-[color:var(--ash)] cr-reveal max-w-2xl mx-auto leading-relaxed">
            Una biblioteca psicológica para observar, comprender y transformar los agregados internos.
            Cada estudio es un espejo y una herramienta.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-10 mb-10">
        <div className="cr-luxury-border rounded-2xl p-5 md:p-6 cr-glass">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar un estudio…" className="w-full bg-transparent border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] focus:border-[color:var(--gold)] rounded-full px-5 py-3 outline-none text-sm placeholder:text-[color:var(--ash)] transition" aria-label="Buscar estudios" />
          <div className="mt-5 flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button key={f.id} onClick={() => setTag(f.id)} className={`text-[0.65rem] tracking-[0.16em] uppercase px-3 py-1.5 rounded-full border transition ${tag === f.id ? "bg-[color:var(--gold)] text-[color:var(--ink)] border-[color:var(--gold)]" : "border-[color-mix(in_oklab,var(--gold)_25%,transparent)] hover:border-[color:var(--gold)]"}`}>{f.label}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((y, i) => {
          const disabled = y.status === "incompleto";
          const card = (
            <div className={`cr-card cr-reveal h-full ${disabled ? "opacity-70" : ""}`} style={{ transitionDelay: `${(i % 9) * 60}ms` }}>
              <div className="flex items-center justify-between">
                <span className="cr-eyebrow text-[color:var(--gold)]">Estudio</span>
                <span className={`text-[0.6rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border ${disabled ? "border-[color:var(--ash)] text-[color:var(--ash)]" : "border-[color:var(--gold)] text-[color:var(--gold2)]"}`}>
                  {disabled ? "En preparación" : "Disponible"}
                </span>
              </div>
              <h3 className="font-display text-2xl mt-4 leading-tight">{y.title}</h3>
              <p className="mt-3 text-sm text-[color:var(--ash)] leading-relaxed line-clamp-4">{y.summary}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {y.tags.slice(0, 4).map(t => (
                  <span key={t} className="text-[0.55rem] tracking-[0.18em] uppercase px-2 py-1 rounded-full border border-[color-mix(in_oklab,var(--gold)_22%,transparent)] text-[color:var(--ash)]">{t}</span>
                ))}
              </div>
              <div className="mt-5 text-[0.65rem] tracking-[0.18em] uppercase">
                {disabled ? <span className="text-[color:var(--ash)]">Fuente pendiente</span> : <span className="text-[color:var(--gold)]">Leer estudio →</span>}
              </div>
            </div>
          );
          return disabled
            ? <div key={y.id}>{card}</div>
            : <Link key={y.id} to="/yo/$id" params={{ id: y.id }} className="block">{card}</Link>;
        })}
      </section>
    </div>
  );
}
