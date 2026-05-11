import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { yoesQuery } from "@/lib/cr/queries";
import { ContentBlocks } from "@/components/cr/ContentBlocks";
import { ChevronDown, ChevronUp, ArrowUp, BookOpen, X } from "lucide-react";

export const Route = createFileRoute("/yo/$id")({
  loader: async ({ context, params }) => {
    const all = await context.queryClient.ensureQueryData(yoesQuery());
    const y = all.find(x => x.id === params.id);
    if (!y) throw notFound();
    return y;
  },
  head: ({ loaderData }) => loaderData ? ({
    meta: [
      { title: `${loaderData.title} — Estudios de los Yoes` },
      { name: "description", content: loaderData.summary },
      { property: "og:title", content: loaderData.title },
      { property: "og:description", content: loaderData.summary },
    ],
  }) : ({ meta: [] }),
  component: YoLectorPage,
  notFoundComponent: () => (
    <div className="min-h-[70svh] flex items-center justify-center pt-32 px-6 text-center">
      <div>
        <div className="cr-eyebrow">Estudio no encontrado</div>
        <h1 className="cr-display text-4xl mt-3">Este Yo no está en la biblioteca</h1>
        <Link to="/yoes" className="cr-btn cr-btn-gold mt-6 inline-flex">Volver a los estudios</Link>
      </div>
    </div>
  ),
});

// Hook para scroll top
function useScrollTop(threshold = 400) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return show;
}

function YoLectorPage() {
  const y = Route.useLoaderData();
  const { data: all } = useSuspenseQuery(yoesQuery());
  const related = all.filter(x => y.related.includes(x.id)).slice(0, 3);
  const [mobileIndexOpen, setMobileIndexOpen] = useState(false);
  const showScrollTop = useScrollTop(600);

  if (y.status === "incompleto" || y.missingSource) {
    return (
      <div className="pt-24 sm:pt-32 pb-20 mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <Link to="/yoes" className="cr-eyebrow text-[color:var(--gold)]">← Estudios</Link>
        <div className="cr-eyebrow mt-12">Estudio en preparación</div>
        <h1 className="cr-display text-[clamp(2.5rem,1.5rem+6vw,4.5rem)] mt-6 leading-tight balance-text">{y.title}</h1>
        <p className="mt-8 text-sm sm:text-base md:text-lg text-[color:var(--ash)] leading-relaxed max-w-2xl mx-auto">{y.summary}</p>
        <div className="cr-luxury-border rounded-2xl p-7 sm:p-10 md:p-12 mt-12 cr-glass">
          <div className="cr-eyebrow text-[color:var(--gold)] mb-4">Contenido en preparación</div>
          <p className="text-sm sm:text-base text-[color:var(--bone)] leading-relaxed opacity-90">
            Este estudio aún no ha sido publicado. Falta su fuente original
            <span className="text-[color:var(--ash)]"> ({y.source})</span>. Cuando esté disponible,
            será integrado con el mismo cuidado editorial que el resto de la biblioteca.
          </p>
        </div>
      </div>
    );
  }

  const headings = y.content.map((b: import("@/lib/cr/types").Block, i: number) => b.type === "heading" ? { i, text: b.text, level: b.level } : null).filter(Boolean) as { i: number; text: string; level: number }[];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pt-20 sm:pt-28 pb-20 mx-auto max-w-7xl px-4 sm:px-6 md:px-10 grid gap-8 lg:gap-12 lg:grid-cols-[260px_1fr]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block sticky top-28 self-start">
        <div className="cr-eyebrow mb-6">Índice de estudio</div>
        <nav className="space-y-3 text-sm border-l border-[color-mix(in_oklab,var(--gold)_20%,transparent)] pl-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-none">
          {headings.length === 0 && <div className="text-[color:var(--ash)] text-xs">Lectura continua</div>}
          {headings.map(h => (
            <a 
              key={h.i} 
              href={`#h-${h.i}`} 
              className={`block hover:text-[color:var(--gold2)] transition-colors py-1 ${h.level === 2 ? "font-medium" : "pl-3 text-[color:var(--ash)] text-[0.82rem]"}`}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </aside>

      <article className="w-full max-w-[75ch] mx-auto lg:mx-0">
        <header className="mb-12">
          <Link to="/yoes" className="inline-flex items-center text-[0.65rem] tracking-[0.2em] uppercase text-[color:var(--gold)] hover:text-[color:var(--gold2)] transition-colors mb-8">
            ← Volver a biblioteca
          </Link>
          
          <div className="space-y-4">
            <div className="cr-eyebrow text-[color:var(--ash)]">Estudio del Yo</div>
            <h1 className="cr-display text-[clamp(1.85rem,1.5rem+5vw,3.5rem)] leading-[1.1] mb-6 balance-text">{y.title}</h1>
            <p className="text-sm sm:text-base md:text-lg text-[color:var(--ash)] leading-relaxed opacity-90">{y.summary}</p>
          </div>

          {y.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {y.tags.map((t: string) => (
                <span key={t} className="text-[0.55rem] tracking-[0.15em] uppercase px-2.5 py-1 rounded-md border border-[color-mix(in_oklab,var(--gold)_15%,transparent)] text-[color:var(--ash)] bg-[color-mix(in_oklab,var(--gold)_5%,transparent)]">
                  {t}
                </span>
              ))}
            </div>
          )}
          <div className="cr-divider mt-10 opacity-40" />
        </header>

        {/* Mobile Index Accordion */}
        {headings.length > 0 && (
          <div className="lg:hidden mb-12">
            <button
              onClick={() => setMobileIndexOpen(!mobileIndexOpen)}
              className="w-full flex items-center justify-between p-4.5 rounded-xl border border-[color-mix(in_oklab,var(--gold)_20%,transparent)] bg-[color-mix(in_oklab,var(--gold)_8%,transparent)] active:scale-[0.98] transition-all"
              aria-expanded={mobileIndexOpen}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[color:var(--gold)]" />
                <span className="font-display tracking-wide">{mobileIndexOpen ? "Ocultar contenido" : "Ver contenido"}</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-[color:var(--gold)] transition-transform duration-300 ${mobileIndexOpen ? "rotate-180" : ""}`} />
            </button>
            
            {mobileIndexOpen && (
              <nav className="mt-3 p-5 rounded-xl cr-glass border border-[color-mix(in_oklab,var(--gold)_15%,transparent)] max-h-[60vh] overflow-y-auto scrollbar-none animate-in fade-in slide-in-from-top-2 duration-300">
                {headings.map(h => (
                  <a 
                    key={h.i} 
                    href={`#h-${h.i}`}
                    onClick={() => setMobileIndexOpen(false)}
                    className={`block py-3 px-2 border-b border-[color-mix(in_oklab,var(--gold)_5%,transparent)] last:border-0 ${h.level === 2 ? "font-medium text-[color:var(--bone)]" : "pl-6 text-[color:var(--ash)] text-sm"}`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            )}
          </div>
        )}

        {/* Content */}
        <div className="cr-prose">
          <ContentBlocks blocks={y.content} />
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <div className="cr-eyebrow mb-6">Estudios relacionados</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map(r => (
                <Link key={r.id} to="/yo/$id" params={{ id: r.id }} className="cr-card p-6 block group">
                  <div className="cr-eyebrow text-[color:var(--gold)] opacity-70 group-hover:opacity-100 transition-opacity">Estudio relacionado</div>
                  <div className="font-display text-lg mt-3 leading-tight group-hover:text-[color:var(--gold2)] transition-colors">{r.title}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-6 z-40 p-3.5 rounded-full bg-[color:var(--gold)] text-[var(--ink)] shadow-2xl shadow-[var(--gold)]/20 hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
