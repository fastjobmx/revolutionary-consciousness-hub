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
    <div className="pt-20 sm:pt-28 pb-20">
      <div className="cr-progress-bar" style={{ transform: `scaleX(${progress})` }} aria-hidden />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[260px_1fr_220px] gap-8 lg:gap-12">
        {/* TOC - Desktop */}
        <aside className="cr-hide-on-focus hidden lg:block sticky top-28 self-start">
          <div className="cr-eyebrow mb-6">Índice de estudio</div>
          <nav className="space-y-3 text-sm border-l border-[color-mix(in_oklab,var(--gold)_20%,transparent)] pl-4 max-h-[70vh] overflow-y-auto scrollbar-none">
            {headings.length === 0 && <div className="text-[color:var(--ash)] text-xs">Lectura continua</div>}
            {headings.map(h => (
              <a 
                key={h.i} 
                href={`#h-${h.i}`} 
                className={`block transition-colors duration-200 ${
                  h.level === 2 
                    ? "text-[color:var(--bone)] font-medium hover:text-[color:var(--gold)]" 
                    : "text-[color:var(--ash)] pl-3 text-[0.82rem] hover:text-[color:var(--gold2)]"
                }`}
              >
                {h.text}
              </a>
            ))}
          </nav>
        </aside>

        {/* MAIN */}
        <article ref={articleRef} className="w-full max-w-[75ch] mx-auto lg:mx-0">
          <header className="mb-12 cr-hide-on-focus">
            <Link 
              to="/conferencias" 
              className="inline-flex items-center text-[0.65rem] tracking-[0.2em] uppercase text-[color:var(--gold)] hover:text-[color:var(--gold2)] transition-colors mb-8"
            >
              ← Volver a biblioteca
            </Link>
            
            <div className="space-y-4">
              <div className="cr-eyebrow text-[color:var(--ash)]">
                Fase {c.phase} · Lección {c.number}
              </div>
              
              <h1 className="cr-display text-[clamp(1.85rem,1.5rem+5vw,3.5rem)] leading-[1.1] mb-6 balance-text">
                {c.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-[color:var(--ash)] opacity-80">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold)]" />
                  <span>{reading} min de lectura</span>
                </div>
                {c.images.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold2)]" />
                    <span>{c.images.length} diagramas</span>
                  </div>
                )}
              </div>
            </div>

            {c.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {c.tags.map((t: string) => (
                  <span key={t} className="text-[0.55rem] tracking-[0.15em] uppercase px-2.5 py-1 rounded-md border border-[color-mix(in_oklab,var(--gold)_15%,transparent)] text-[color:var(--ash)] bg-[color-mix(in_oklab,var(--gold)_5%,transparent)]">
                    {t}
                  </span>
                ))}
              </div>
            )}
            
            <div className="cr-divider mt-10 opacity-40" />
          </header>

          {/* Mobile TOC toggle */}
          {headings.length > 0 && (
            <div className="lg:hidden mb-12 cr-hide-on-focus">
              <button 
                onClick={() => setTocOpen(o => !o)} 
                className="flex items-center justify-between w-full px-5 py-4 rounded-xl bg-[color-mix(in_oklab,var(--gold)_8%,transparent)] border border-[color-mix(in_oklab,var(--gold)_20%,transparent)] text-[color:var(--bone)]"
              >
                <div className="flex items-center gap-3">
                  <div className="cr-eyebrow !text-[0.6rem] tracking-[0.2em] !mb-0 opacity-80">Contenido</div>
                  <span className="text-xs font-medium text-[color:var(--gold)]">{headings.length} secciones</span>
                </div>
                <span className="text-lg text-[color:var(--gold)]">{tocOpen ? "−" : "+"}</span>
              </button>
              
              {tocOpen && (
                <nav className="mt-3 cr-glass rounded-xl p-5 space-y-3 text-sm max-h-[60vh] overflow-y-auto scrollbar-none animate-in fade-in slide-in-from-top-2 duration-300">
                  {headings.map(h => (
                    <a 
                      key={h.i} 
                      href={`#h-${h.i}`} 
                      onClick={() => setTocOpen(false)} 
                      className={`block py-1 ${h.level === 2 ? "text-[color:var(--bone)] font-medium" : "pl-4 text-[color:var(--ash)] text-[0.85rem]"}`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          )}

          <div className="cr-prose" style={{ fontSize: `${fontSizes[fontIdx]}rem` }}>
            <ContentBlocks blocks={c.content} />
          </div>

          {/* Nav */}
          <div className="cr-divider my-16 opacity-30" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 cr-hide-on-focus mb-20">
            {navIds.prev ? (
              <Link to="/conferencia/$id" params={{ id: navIds.prev.id }} className="cr-card flex flex-col p-6 group">
                <div className="cr-eyebrow text-[color:var(--gold)] opacity-70 group-hover:opacity-100 transition-opacity">← Anterior</div>
                <div className="font-display text-lg mt-3 leading-tight group-hover:text-[color:var(--gold2)] transition-colors">{navIds.prev.title}</div>
                <div className="text-[0.65rem] uppercase tracking-widest mt-2 text-[color:var(--ash)]">F.{navIds.prev.phase} · Lección {navIds.prev.number}</div>
              </Link>
            ) : <div />}
            
            {navIds.next ? (
              <Link to="/conferencia/$id" params={{ id: navIds.next.id }} className="cr-card flex flex-col p-6 group text-right">
                <div className="cr-eyebrow text-[color:var(--gold)] opacity-70 group-hover:opacity-100 transition-opacity">Siguiente →</div>
                <div className="font-display text-lg mt-3 leading-tight group-hover:text-[color:var(--gold2)] transition-colors">{navIds.next.title}</div>
                <div className="text-[0.65rem] uppercase tracking-widest mt-2 text-[color:var(--ash)]">F.{navIds.next.phase} · Lección {navIds.next.number}</div>
              </Link>
            ) : <div />}
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
