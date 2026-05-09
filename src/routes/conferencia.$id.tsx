import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { conferenciasQuery, estimateReadingTime } from "@/lib/cr/queries";
import { ContentBlocks } from "@/components/cr/ContentBlocks";
import { isRead, markRead, setProgress } from "@/lib/cr/storage";
import type { Conferencia } from "@/lib/cr/types";

export const Route = createFileRoute("/conferencia/$id")({
  loader: async ({ context, params }) => {
    const all = await context.queryClient.ensureQueryData(conferenciasQuery());
    const c = all.find(x => x.id === params.id);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) => loaderData ? ({
    meta: [
      { title: `${loaderData.title} — Fase ${loaderData.phase}, Conf. ${loaderData.number}` },
      { name: "description", content: loaderData.summary },
      { property: "og:title", content: loaderData.title },
      { property: "og:description", content: loaderData.summary },
    ],
  }) : ({ meta: [] }),
  component: LectorPage,
  notFoundComponent: () => (
    <div className="min-h-[70svh] flex items-center justify-center px-6 text-center pt-32">
      <div>
        <div className="cr-eyebrow">Conferencia no encontrada</div>
        <h1 className="cr-display text-4xl mt-3">Esta lección no existe en la biblioteca</h1>
        <Link to="/conferencias" className="cr-btn cr-btn-gold mt-6 inline-flex">Volver a la biblioteca</Link>
      </div>
    </div>
  ),
});

function LectorPage() {
  const c = Route.useLoaderData();
  const { data: all } = useSuspenseQuery(conferenciasQuery());
  const [progress, setLocalProgress] = useState(0);
  const [fontIdx, setFontIdx] = useState(2);
  const [focus, setFocus] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const articleRef = useRef<HTMLDivElement | null>(null);
  const reading = estimateReadingTime(c);
  const fontSizes = [0.92, 1, 1.075, 1.18, 1.32];

  const headings = useMemo(() => c.content.map((b: import("@/lib/cr/types").Block, i: number) => b.type === "heading" ? { i, text: b.text, level: b.level } : null).filter(Boolean) as { i: number; text: string; level: number }[], [c]);

  const related = useMemo(() => {
    const ids = new Set(c.related);
    return all.filter(x => ids.has(x.id)).slice(0, 3);
  }, [c, all]);

  const navIds = useMemo(() => {
    const phase = all.filter(x => x.phase === c.phase).sort((a, b) => a.number.localeCompare(b.number));
    const idx = phase.findIndex(x => x.id === c.id);
    return { prev: phase[idx - 1], next: phase[idx + 1] };
  }, [c, all]);

  useEffect(() => {
    document.body.classList.toggle("cr-focus-mode", focus);
    return () => document.body.classList.remove("cr-focus-mode");
  }, [focus]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = articleRef.current; if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
        const ratio = total > 0 ? scrolled / total : 0;
        setLocalProgress(ratio);
        setProgress(c.id, ratio);
        if (ratio >= 0.85 && !isRead(c.id)) markRead(c.id);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [c.id]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [c.id]);

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); } catch { /* ignore */ }
  };

  return (
    <div className="pt-28 pb-20">
      <div className="cr-progress-bar" style={{ transform: `scaleX(${progress})` }} aria-hidden />

      <div className="mx-auto max-w-7xl px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[260px_1fr_220px] gap-12">
        {/* TOC */}
        <aside className="cr-hide-on-focus hidden lg:block sticky top-28 self-start">
          <div className="cr-eyebrow mb-4">Índice</div>
          <nav className="space-y-2 text-sm border-l border-[color-mix(in_oklab,var(--gold)_20%,transparent)] pl-4 max-h-[70vh] overflow-y-auto">
            {headings.length === 0 && <div className="text-[color:var(--ash)] text-xs">Lectura continua</div>}
            {headings.map(h => (
              <a key={h.i} href={`#h-${h.i}`} className={`block hover:text-[color:var(--gold2)] transition ${h.level === 2 ? "text-[color:var(--bone)]" : "text-[color:var(--ash)] pl-3 text-[0.82rem]"}`}>
                {h.text}
              </a>
            ))}
          </nav>
        </aside>

        {/* MAIN */}
        <article ref={articleRef}>
          <header className="mb-10 cr-hide-on-focus">
            <Link to="/conferencias" className="cr-eyebrow text-[color:var(--gold)] hover:text-[color:var(--gold2)]">← Biblioteca</Link>
            <div className="cr-eyebrow mt-6 text-[color:var(--ash)]">Fase {c.phase} · Conferencia {c.number}</div>
            <h1 className="cr-display text-4xl md:text-6xl mt-3 leading-[1.05]">{c.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs tracking-[0.18em] uppercase text-[color:var(--ash)]">
              <span>p. {c.pageStart}{c.pageEnd && c.pageEnd !== c.pageStart ? `–${c.pageEnd}` : ""}</span>
              <span>· {reading} min</span>
              {c.images.length > 0 && <span>· ◇ {c.images.length} diagramas</span>}
            </div>
            {c.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {c.tags.map((t: string) => <span key={t} className="text-[0.6rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] text-[color:var(--ash)]">{t}</span>)}
              </div>
            )}
            <div className="cr-divider mt-8" />
          </header>

          {/* Mobile TOC toggle */}
          {headings.length > 0 && (
            <div className="lg:hidden mb-8 cr-hide-on-focus">
              <button onClick={() => setTocOpen(o => !o)} className="cr-btn cr-btn-ghost !text-[0.65rem] w-full justify-between">
                <span>Índice ({headings.length})</span><span>{tocOpen ? "−" : "+"}</span>
              </button>
              {tocOpen && (
                <nav className="mt-3 cr-glass rounded-xl p-4 space-y-1.5 text-sm max-h-[50vh] overflow-y-auto">
                  {headings.map(h => (
                    <a key={h.i} href={`#h-${h.i}`} onClick={() => setTocOpen(false)} className={`block ${h.level === 2 ? "" : "pl-3 text-[color:var(--ash)] text-[0.85rem]"}`}>{h.text}</a>
                  ))}
                </nav>
              )}
            </div>
          )}

          <div style={{ fontSize: `${fontSizes[fontIdx]}rem` }}>
            <ContentBlocks blocks={c.content} />
          </div>

          {/* Nav */}
          <div className="cr-divider my-12" />
          <div className="flex flex-wrap justify-between gap-4 cr-hide-on-focus">
            {navIds.prev ? (
              <Link to="/conferencia/$id" params={{ id: navIds.prev.id }} className="cr-card flex-1 max-w-sm">
                <div className="cr-eyebrow text-[color:var(--gold)]">← Anterior · F.{navIds.prev.phase} {navIds.prev.number}</div>
                <div className="font-display text-lg mt-2 leading-tight">{navIds.prev.title}</div>
              </Link>
            ) : <div className="flex-1" />}
            {navIds.next ? (
              <Link to="/conferencia/$id" params={{ id: navIds.next.id }} className="cr-card flex-1 max-w-sm text-right">
                <div className="cr-eyebrow text-[color:var(--gold)]">Siguiente · F.{navIds.next.phase} {navIds.next.number} →</div>
                <div className="font-display text-lg mt-2 leading-tight">{navIds.next.title}</div>
              </Link>
            ) : <div className="flex-1" />}
          </div>

          {related.length > 0 && (
            <div className="mt-16 cr-hide-on-focus">
              <div className="cr-eyebrow">Conferencias relacionadas</div>
              <div className="grid gap-4 md:grid-cols-3 mt-5">
                {related.map(r => (
                  <Link key={r.id} to="/conferencia/$id" params={{ id: r.id }} className="cr-card block">
                    <div className="cr-eyebrow text-[color:var(--gold)]">F. {r.phase} · {r.number}</div>
                    <div className="font-display text-lg mt-2 leading-tight">{r.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* TOOLBAR */}
        <aside className="hidden lg:flex flex-col gap-2 sticky top-28 self-start text-xs">
          <button onClick={() => setFontIdx(i => Math.min(i + 1, fontSizes.length - 1))} className="cr-btn cr-btn-ghost !text-[0.65rem] !py-2 !px-3" aria-label="Aumentar texto">A+</button>
          <button onClick={() => setFontIdx(i => Math.max(i - 1, 0))} className="cr-btn cr-btn-ghost !text-[0.65rem] !py-2 !px-3" aria-label="Disminuir texto">A−</button>
          <button onClick={() => setFocus(f => !f)} className="cr-btn cr-btn-ghost !text-[0.65rem] !py-2 !px-3" aria-label="Modo enfoque">{focus ? "Salir foco" : "Foco"}</button>
          <button onClick={copyLink} className="cr-btn cr-btn-ghost !text-[0.65rem] !py-2 !px-3" aria-label="Copiar enlace">Copiar</button>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="cr-btn cr-btn-ghost !text-[0.65rem] !py-2 !px-3" aria-label="Volver arriba">↑</button>
        </aside>
      </div>

      {/* Floating focus exit */}
      {focus && (
        <button onClick={() => setFocus(false)} className="fixed top-4 right-4 z-[70] cr-btn cr-btn-gold !text-[0.65rem]">Salir del modo enfoque</button>
      )}
    </div>
  );
}
