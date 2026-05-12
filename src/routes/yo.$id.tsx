import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import { yoesQuery } from "@/lib/cr/queries";
import { ContentBlocks } from "@/components/cr/ContentBlocks";
import { ChevronDown, ArrowUp, BookOpen, Clock, Tag, LayoutList, ArrowLeft, ArrowRight, Share2, Bookmark } from "lucide-react";

export const Route = createFileRoute("/yo/$id")({
  loader: async ({ context, params }) => {
    const all = await context.queryClient.ensureQueryData(yoesQuery());
    const y = all.find(x => x.id === params.id);
    if (!y) throw notFound();
    return y;
  },
  head: ({ loaderData }) => loaderData ? ({
    meta: [
      { title: `${loaderData.title} — Estudios de los Yoes — Conciencia Revolucionaria` },
      { name: "description", content: loaderData.summary },
      { property: "og:title", content: loaderData.title },
      { property: "og:description", content: loaderData.summary },
    ],
  }) : ({ meta: [] }),
  component: YoLectorPage,
});

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
  
  // Navigation
  const currentIndex = all.findIndex(x => x.id === y.id);
  const prevYo = currentIndex > 0 ? all[currentIndex - 1] : null;
  const nextYo = currentIndex < all.length - 1 ? all[currentIndex + 1] : null;
  
  const related = useMemo(() => {
    return all
      .filter(x => x.id !== y.id && (x.category === y.category || x.tags.some(t => y.tags.includes(t))))
      .slice(0, 3);
  }, [all, y]);

  const [mobileIndexOpen, setMobileIndexOpen] = useState(false);
  const showScrollTop = useScrollTop(600);

  if (y.status === "draft" || y.missingSource) {
    return (
      <div className="pt-32 pb-20 mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <Link to="/yoes" className="cr-eyebrow text-[color:var(--gold)]">← Volver a biblioteca</Link>
        <div className="cr-eyebrow mt-12">Estudio en preparación</div>
        <h1 className="cr-display text-4xl sm:text-5xl mt-6 leading-tight balance-text">{y.title}</h1>
        <div className="cr-luxury-border rounded-2xl p-10 mt-12 cr-glass">
          <p className="text-[color:var(--bone)] leading-relaxed opacity-90">
            Este estudio está siendo procesado y normalizado. Estará disponible próximamente como parte de la biblioteca viva.
          </p>
          <Link to="/yoes" className="cr-btn cr-btn-gold mt-8">Explorar otros estudios</Link>
        </div>
      </div>
    );
  }

  const headings = y.content
    .map((b: any, i: number) => b.type === "heading" ? { i, text: b.text, level: b.level } : null)
    .filter(Boolean) as { i: number; text: string; level: number }[];

  return (
    <div className="pt-24 pb-20">
      {/* Lectura Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[color:var(--gold)] z-50 origin-left transform scale-x-0" id="reading-progress" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:grid lg:grid-cols-[280px_1fr_200px] gap-12">
        
        {/* Sidebar Izquierdo: Índice Desktop */}
        <aside className="hidden lg:block sticky top-32 self-start h-[calc(100vh-160px)] overflow-y-auto scrollbar-none pr-4">
          <div className="flex items-center gap-2 mb-8">
            <LayoutList className="w-4 h-4 text-[color:var(--gold)]" />
            <span className="cr-eyebrow text-[color:var(--ash)]">Índice</span>
          </div>
          <nav className="space-y-4 border-l border-[color-mix(in_oklab,var(--gold)_15%,transparent)] pl-5">
            {headings.map(h => (
              <a 
                key={h.i} 
                href={`#h-${h.i}`} 
                className={`block text-sm transition-all hover:text-[color:var(--gold)] ${
                  h.level === 2 ? "font-medium text-[color:var(--bone)]" : "text-[color:var(--ash)] text-[0.85rem] pl-4"
                }`}
              >
                {h.text}
              </a>
            ))}
          </nav>
        </aside>

        {/* Contenido Central */}
        <main className="w-full max-w-[72ch] mx-auto lg:mx-0">
          <header className="mb-16">
            <Link to="/yoes" className="inline-flex items-center gap-2 text-[0.6rem] tracking-[0.2em] uppercase text-[color:var(--gold)] mb-10 hover:translate-x-[-4px] transition-transform">
              <ArrowLeft className="w-3 h-3" /> Volver a biblioteca
            </Link>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[color:var(--gold)] font-bold">{y.category}</span>
                <span className="w-1 h-1 rounded-full bg-[color:var(--ash)] opacity-30" />
                <div className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-widest text-[color:var(--ash)]">
                  <Clock className="w-3 h-3" /> {y.readingTime || 5} MIN
                </div>
                <span className="w-1 h-1 rounded-full bg-[color:var(--ash)] opacity-30" />
                <span className="text-[0.6rem] uppercase tracking-widest text-[color:var(--ash)] font-medium">{y.level}</span>
              </div>

              <h1 className="cr-display text-[clamp(2.2rem,1.5rem+6vw,4.5rem)] leading-[1.05] balance-text">
                {y.title}
              </h1>

              <div className="cr-luxury-border rounded-xl p-6 cr-glass border-l-4 border-l-[color:var(--gold)]">
                <p className="text-sm sm:text-base italic text-[color:var(--bone)] opacity-90 leading-relaxed">
                  <span className="text-[color:var(--gold)] font-bold mr-2">Propósito:</span>
                  En este estudio aprenderás a observar cómo el {y.title.toLowerCase()} fragmenta tu atención, agota tu energía y te mantiene en la mecanicidad del ego.
                </p>
              </div>
            </div>
          </header>

          {/* Índice Móvil */}
          <div className="lg:hidden mb-12">
            <button
              onClick={() => setMobileIndexOpen(!mobileIndexOpen)}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-[color-mix(in_oklab,var(--gold)_20%,transparent)] bg-[color:var(--obsidian)]"
            >
              <span className="font-display text-lg">Ver índice del estudio</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${mobileIndexOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileIndexOpen && (
              <nav className="mt-2 p-4 rounded-xl cr-glass border border-[color-mix(in_oklab,var(--gold)_15%,transparent)] space-y-4">
                {headings.map(h => (
                  <a 
                    key={h.i} 
                    href={`#h-${h.i}`}
                    onClick={() => setMobileIndexOpen(false)}
                    className={`block py-1 ${h.level === 2 ? "text-sm font-medium" : "text-xs pl-4 text-[color:var(--ash)]"}`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            )}
          </div>

          <div className="cr-prose">
            <ContentBlocks blocks={y.content} />
          </div>

          {/* Bloque Final: Práctica y Recomendaciones */}
          <footer className="mt-24 space-y-16">
            <div className="cr-divider" />
            
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="cr-luxury-border rounded-2xl p-8 cr-glass border-t-4 border-t-[color:var(--gold)]">
                <h4 className="font-display text-2xl text-[color:var(--gold2)] mb-4">Práctica semanal</h4>
                <p className="text-sm text-[color:var(--ash)] leading-relaxed">
                  Durante esta semana, observa cada vez que este yo intente tomar el mando. Usa la clave de SOL y la petición a la Madre Divina: "Madre mía, elimina este defecto".
                </p>
              </div>
              <div className="cr-luxury-border rounded-2xl p-8 cr-glass border-t-4 border-t-[color:var(--bone)]">
                <h4 className="font-display text-2xl text-[color:var(--bone)] mb-4">Reflexión</h4>
                <p className="text-sm text-[color:var(--ash)] leading-relaxed">
                  ¿En qué momentos del día este yo es más fuerte? ¿Qué impresiones lo alimentan? ¿Qué centro de mi máquina utiliza más?
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="cr-eyebrow text-[color:var(--ash)]">Siguiente paso</div>
              <div className="flex flex-col sm:flex-row gap-4">
                {nextYo && (
                  <Link to="/yo/$id" params={{ id: nextYo.id }} className="flex-1 cr-card p-6 group">
                    <span className="text-[0.6rem] uppercase tracking-widest text-[color:var(--gold)] opacity-70">Estudio siguiente</span>
                    <h5 className="font-display text-xl mt-2 group-hover:text-[color:var(--gold2)] transition-colors">{nextYo.title}</h5>
                  </Link>
                )}
                <Link to="/yoes" className="flex-1 cr-card p-6 flex items-center justify-center border-dashed group">
                  <span className="text-[0.7rem] uppercase tracking-widest font-bold group-hover:text-[color:var(--gold)]">Volver a la biblioteca</span>
                </Link>
              </div>
            </div>

            {related.length > 0 && (
              <div className="space-y-8">
                <div className="cr-eyebrow text-[color:var(--ash)]">Estudios relacionados</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map(r => (
                    <Link key={r.id} to="/yo/$id" params={{ id: r.id }} className="cr-card p-5 block group">
                      <h6 className="font-display text-lg leading-tight group-hover:text-[color:var(--gold2)] transition-colors">{r.title}</h6>
                      <span className="text-[0.6rem] uppercase tracking-widest text-[color:var(--ash)] mt-3 block">{r.category}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </footer>
        </main>

        {/* Sidebar Derecho: Herramientas Desktop */}
        <aside className="hidden lg:block sticky top-32 self-start space-y-10">
          <div className="space-y-6">
            <button className="w-full flex items-center gap-3 text-[0.65rem] uppercase tracking-widest text-[color:var(--ash)] hover:text-[color:var(--gold)] transition">
              <Bookmark className="w-4 h-4" /> Guardar estudio
            </button>
            <button className="w-full flex items-center gap-3 text-[0.65rem] uppercase tracking-widest text-[color:var(--ash)] hover:text-[color:var(--gold)] transition">
              <Share2 className="w-4 h-4" /> Compartir
            </button>
          </div>
          <div className="cr-divider opacity-20" />
          <div className="space-y-4">
            <span className="text-[0.6rem] uppercase tracking-widest text-[color:var(--gold)] font-bold">Nivel</span>
            <div className="text-sm font-medium uppercase tracking-widest">{y.level}</div>
          </div>
        </aside>

      </div>

      {/* Scroll Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-6 z-40 p-4 rounded-full bg-[color:var(--gold)] text-[var(--ink)] shadow-2xl hover:scale-110 active:scale-95 transition-all"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
