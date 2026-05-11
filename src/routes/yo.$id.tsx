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
      <div className="pt-32 pb-20 mx-auto max-w-3xl px-6 text-center">
        <Link to="/yoes" className="cr-eyebrow text-[color:var(--gold)]">← Estudios</Link>
        <div className="cr-eyebrow mt-8">Estudio en preparación</div>
        <h1 className="cr-display text-5xl md:text-6xl mt-4">{y.title}</h1>
        <p className="mt-6 text-[color:var(--ash)] leading-relaxed">{y.summary}</p>
        <div className="cr-luxury-border rounded-2xl p-8 mt-12 cr-glass">
          <div className="cr-eyebrow text-[color:var(--gold)]">Contenido en preparación</div>
          <p className="mt-4 text-[color:var(--bone)] leading-relaxed">
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
    <div className="pt-28 pb-20 mx-auto max-w-7xl px-4 sm:px-5 md:px-10 grid gap-8 lg:gap-12 lg:grid-cols-[260px_1fr]">
      {/* Desktop Sidebar - Hidden on mobile/tablet */}
      <aside className="hidden lg:block sticky top-28 self-start">
        <div className="cr-eyebrow mb-4">Índice</div>
        <nav className="space-y-2 text-sm border-l border-[color-mix(in_oklab,var(--gold)_20%,transparent)] pl-4 max-h-[70vh] overflow-y-auto pr-2">
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

      <article className="max-w-3xl lg:max-w-none">
        {/* Mobile Index Accordion - Only visible on small screens */}
        <div className="lg:hidden mb-8">
          <button
            onClick={() => setMobileIndexOpen(!mobileIndexOpen)}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] bg-[color-mix(in_oklab,var(--gold)_5%,transparent)] hover:bg-[color-mix(in_oklab,var(--gold)_8%,transparent)] transition-colors"
            aria-expanded={mobileIndexOpen}
            aria-controls="mobile-index"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-[color:var(--gold)]" />
              <span className="font-medium">{mobileIndexOpen ? "Cerrar índice" : "Ver índice del estudio"}</span>
            </div>
            {mobileIndexOpen ? (
              <ChevronUp className="w-5 h-5 text-[color:var(--gold)]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[color:var(--gold)]" />
            )}
          </button>
          
          {mobileIndexOpen && (
            <nav 
              id="mobile-index"
              className="mt-3 p-4 rounded-xl border border-[color-mix(in_oklab,var(--gold)_20%,transparent)] bg-[color-mix(in_oklab,var(--void)_60%,transparent)] max-h-[60vh] overflow-y-auto"
            >
              {headings.length === 0 && (
                <div className="text-[color:var(--ash)] text-sm py-2">Lectura continua</div>
              )}
              {headings.map(h => (
                <a 
                  key={h.i} 
                  href={`#h-${h.i}`}
                  onClick={() => setMobileIndexOpen(false)}
                  className={`block py-2.5 px-3 rounded-lg hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] transition-colors ${h.level === 2 ? "font-medium text-[color:var(--bone)]" : "pl-6 text-[color:var(--ash)] text-sm"}`}
                >
                  {h.text}
                </a>
              ))}
            </nav>
          )}
        </div>

        <header className="mb-10 px-4 sm:px-0">
          <Link to="/yoes" className="cr-eyebrow text-[color:var(--gold)] hover:text-[color:var(--gold2)] transition-colors">← Estudios</Link>
          <div className="cr-eyebrow mt-6 text-[color:var(--ash)]">Estudio · {y.status === "completo" ? "Disponible" : "En preparación"}</div>
          <h1 className="cr-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-3 leading-[1.1]">{y.title}</h1>
          <p className="mt-5 text-[color:var(--ash)] leading-relaxed max-w-2xl">{y.summary}</p>
          {y.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {y.tags.map((t: string) => <span key={t} className="text-[0.6rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] text-[color:var(--ash)]">{t}</span>)}
            </div>
          )}
          <div className="cr-divider mt-8" />
        </header>

        {/* Content with improved reading experience */}
        <div className="prose-content">
          <ContentBlocks blocks={y.content} />
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <div className="cr-eyebrow">Estudios relacionados</div>
            <div className="grid gap-4 md:grid-cols-3 mt-5">
              {related.map(r => (
                <Link key={r.id} to="/yo/$id" params={{ id: r.id }} className="cr-card block">
                  <div className="cr-eyebrow text-[color:var(--gold)]">Estudio</div>
                  <div className="font-display text-lg mt-2 leading-tight">{r.title}</div>
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
          className="fixed bottom-8 right-6 md:right-10 z-40 p-3 rounded-full bg-[color:var(--gold)] text-[var(--ink)] shadow-lg shadow-black/30 hover:bg-[color:var(--gold2)] transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--obsidian)]"
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
