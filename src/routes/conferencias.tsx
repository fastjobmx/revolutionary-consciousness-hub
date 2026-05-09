import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { conferenciasQuery, FILTER_TAGS, normalize } from "@/lib/cr/queries";
import { getFilters, setFilters, getReadSet } from "@/lib/cr/storage";
import { useReveal } from "@/components/cr/Reveal";
import type { Conferencia } from "@/lib/cr/types";

export const Route = createFileRoute("/conferencias")({
  head: () => ({
    meta: [
      { title: "Biblioteca de Conferencias — Conciencia Revolucionaria" },
      { name: "description", content: "75 conferencias del Conocimiento de Sí Mismo: Fase A y Fase B. Buscador, filtros temáticos y lector cinematográfico." },
      { property: "og:title", content: "Biblioteca de Conferencias" },
      { property: "og:description", content: "75 lecciones prácticas para la Revolución de la Conciencia." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(conferenciasQuery()),
  component: ConferenciasPage,
});

function score(c: Conferencia, q: string) {
  if (!q) return 1;
  const nq = normalize(q);
  let s = 0;
  if (normalize(c.title).includes(nq)) s += 100;
  if (c.tags.some(t => normalize(t).includes(nq))) s += 40;
  if (normalize(c.summary).includes(nq)) s += 20;
  if (normalize(c.number) === nq.replace(/^0+/, "") || c.number === nq) s += 60;
  for (const b of c.content) {
    const txt = "text" in b ? b.text : "items" in b ? (b as { items: string[] }).items.join(" ") : "";
    if (txt && normalize(txt).includes(nq)) { s += 5; break; }
  }
  return s;
}

function ConferenciasPage() {
  const ref = useReveal();
  const { data: confs } = useSuspenseQuery(conferenciasQuery());
  const initial = typeof window !== "undefined" ? getFilters() : { tag: "todas", q: "", view: "grid" as const };
  const [q, setQ] = useState(initial.q);
  const [tag, setTag] = useState(initial.tag);
  const [view, setView] = useState<"grid" | "list">(initial.view);
  const [readMap, setReadMap] = useState<Record<string, true>>({});
  useEffect(() => { setReadMap(getReadSet()); const h = () => setReadMap(getReadSet()); window.addEventListener("cr:read-changed", h); return () => window.removeEventListener("cr:read-changed", h); }, []);
  useEffect(() => { setFilters({ tag, q, view }); }, [tag, q, view]);

  const filtered = useMemo(() => {
    let list = confs.slice();
    if (tag.startsWith("phase:")) list = list.filter(c => c.phase === tag.split(":")[1]);
    else if (tag === "with-images") list = list.filter(c => c.images.length > 0);
    else if (tag === "leidas") list = list.filter(c => readMap[c.id]);
    else if (tag === "no-leidas") list = list.filter(c => !readMap[c.id]);
    else if (tag !== "todas") list = list.filter(c => c.tags.includes(tag));
    if (q) {
      list = list.map(c => ({ c, s: score(c, q) })).filter(x => x.s > 0).sort((a, b) => b.s - a.s).map(x => x.c);
    } else {
      list.sort((a, b) => a.phase === b.phase ? a.number.localeCompare(b.number) : a.phase.localeCompare(b.phase));
    }
    return list;
  }, [confs, q, tag, readMap]);

  return (
    <div ref={ref} className="pt-32 pb-20">
      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-6 md:px-10 mb-16 text-center">
        <div className="cr-halo" style={{ inset: "-20% 20%", height: "120%", opacity: 0.4 }} />
        <div className="relative">
          <div className="cr-eyebrow cr-reveal">Setenta y cinco lecciones</div>
          <h1 className="cr-display text-5xl md:text-7xl mt-4 cr-reveal">
            Biblioteca de <span className="cr-shimmer">Conferencias</span>
          </h1>
          <p className="mt-5 text-[color:var(--ash)] max-w-2xl mx-auto cr-reveal">
            Fase A · Fase B. Cada conferencia es una práctica viva: léela, vívela, regresa a ella.
          </p>
        </div>
      </section>

      {/* CONTROLES */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 mb-10">
        <div className="cr-luxury-border rounded-2xl p-5 md:p-6 cr-glass">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Buscar por título, número, etiqueta o contenido…"
                className="w-full bg-transparent border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] focus:border-[color:var(--gold)] rounded-full px-5 py-3 outline-none text-sm placeholder:text-[color:var(--ash)] transition"
                aria-label="Buscar conferencias"
              />
              {q && <button className="absolute right-2 top-1/2 -translate-y-1/2 cr-btn cr-btn-ghost !py-1.5 !px-3 !text-[0.6rem]" onClick={() => setQ("")}>Limpiar</button>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setView("grid")} className={`cr-btn !py-2.5 !px-4 !text-[0.65rem] ${view === "grid" ? "cr-btn-gold" : "cr-btn-ghost"}`}>Grid</button>
              <button onClick={() => setView("list")} className={`cr-btn !py-2.5 !px-4 !text-[0.65rem] ${view === "list" ? "cr-btn-gold" : "cr-btn-ghost"}`}>Lista</button>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {FILTER_TAGS.map(f => (
              <button key={f.id} onClick={() => setTag(f.id)} className={`text-[0.65rem] tracking-[0.16em] uppercase px-3 py-1.5 rounded-full border transition ${tag === f.id ? "bg-[color:var(--gold)] text-[color:var(--ink)] border-[color:var(--gold)]" : "border-[color-mix(in_oklab,var(--gold)_25%,transparent)] hover:border-[color:var(--gold)]"}`}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="mt-4 text-xs text-[color:var(--ash)] tracking-[0.16em] uppercase">{filtered.length} de {confs.length} conferencias</div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section className="mx-auto max-w-7xl px-6 md:px-10">
        {filtered.length === 0 ? (
          <div className="text-center py-32">
            <div className="cr-eyebrow">Silencio</div>
            <h3 className="cr-display text-3xl mt-3">Ninguna conferencia coincide</h3>
            <p className="mt-3 text-[color:var(--ash)]">Prueba con otro término o limpia los filtros.</p>
            <button onClick={() => { setQ(""); setTag("todas"); }} className="cr-btn cr-btn-gold mt-6">Limpiar filtros</button>
          </div>
        ) : view === "grid" ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => <ConferenceCard key={c.id} c={c} read={!!readMap[c.id]} delay={i} />)}
          </div>
        ) : (
          <ul className="divide-y divide-[color-mix(in_oklab,var(--gold)_18%,transparent)] cr-luxury-border rounded-2xl overflow-hidden">
            {filtered.map(c => (
              <li key={c.id}>
                <Link to="/conferencia/$id" params={{ id: c.id }} className="flex items-center gap-5 px-5 py-4 hover:bg-[color-mix(in_oklab,var(--gold)_6%,transparent)] transition group">
                  <span className="cr-eyebrow text-[color:var(--gold)] w-24 shrink-0">F. {c.phase} · {c.number}</span>
                  <span className="flex-1 font-display text-lg group-hover:text-[color:var(--gold2)] transition">{c.title}</span>
                  <span className="hidden md:flex gap-2 text-[0.6rem] tracking-[0.18em] uppercase text-[color:var(--ash)]">
                    {c.images.length > 0 && <span>◇ Diagramas</span>}
                    {readMap[c.id] && <span>● Leída</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function ConferenceCard({ c, read, delay }: { c: Conferencia; read: boolean; delay: number }) {
  return (
    <Link to="/conferencia/$id" params={{ id: c.id }} className="cr-card cr-reveal block group" style={{ transitionDelay: `${(delay % 9) * 50}ms` }}>
      <div className="flex items-center justify-between text-xs">
        <span className="cr-eyebrow text-[color:var(--gold)]">Fase {c.phase} · {c.number}</span>
        <span className="text-[0.6rem] tracking-[0.16em] uppercase text-[color:var(--ash)]">p. {c.pageStart}</span>
      </div>
      <h3 className="font-display text-xl mt-4 leading-snug group-hover:text-[color:var(--gold2)] transition">{c.title}</h3>
      <p className="mt-3 text-sm text-[color:var(--ash)] line-clamp-3 leading-relaxed">{c.summary}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {c.tags.slice(0, 3).map(t => (
          <span key={t} className="text-[0.55rem] tracking-[0.18em] uppercase px-2 py-1 rounded-full border border-[color-mix(in_oklab,var(--gold)_22%,transparent)] text-[color:var(--ash)]">{t}</span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between text-[0.65rem] tracking-[0.18em] uppercase">
        <span className="text-[color:var(--gold)]">Leer conferencia →</span>
        <span className="flex gap-2 text-[color:var(--ash)]">
          {c.images.length > 0 && <span title="Incluye diagramas">◇</span>}
          {read && <span title="Leída" className="text-[color:var(--gold2)]">●</span>}
        </span>
      </div>
    </Link>
  );
}
