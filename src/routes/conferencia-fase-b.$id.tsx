import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { conferenciasFaseBQuery } from "@/lib/cr/queries";
import { ContentBlocks } from "@/components/cr/ContentBlocks";

export const Route = createFileRoute("/conferencia-fase-b/$id")({
  loader: async ({ context, params }) => {
    const all = await context.queryClient.ensureQueryData(conferenciasFaseBQuery());
    const c = all.find(x => x.id === params.id);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) => loaderData ? ({
    meta: [
      { title: `${loaderData.title} — Fase B — Conciencia Revolucionaria` },
      { name: "description", content: loaderData.summary },
      { property: "og:title", content: loaderData.title },
      { property: "og:description", content: loaderData.summary },
    ],
  }) : ({ meta: [] }),
  component: ConferenciaFaseBPage,
  notFoundComponent: () => (
    <div className="min-h-[70svh] flex items-center justify-center pt-32 px-6 text-center">
      <div>
        <div className="cr-eyebrow">Conferencia no encontrada</div>
        <h1 className="cr-display text-4xl mt-3">Este estudio no está en la biblioteca</h1>
        <Link to="/conferencias-fase-b" className="cr-btn cr-btn-gold mt-6 inline-flex">
          Volver a Fase B
        </Link>
      </div>
    </div>
  ),
});

const typeLabels: Record<string, string> = {
  practica: "Práctica",
  doctrina: "Doctrina",
  simbolo: "Símbolo",
  iniciacion: "Iniciación",
};

function ConferenciaFaseBPage() {
  const conferencia = Route.useLoaderData();
  const { data: all } = useSuspenseQuery(conferenciasFaseBQuery());
  
  // Encontrar conferencias relacionadas (anterior y siguiente)
  const currentIndex = all.findIndex(c => c.id === conferencia.id);
  const prevConf = currentIndex > 0 ? all[currentIndex - 1] : null;
  const nextConf = currentIndex < all.length - 1 ? all[currentIndex + 1] : null;
  
  // Conferencias relacionadas por tipo
  const relatedByType = all
    .filter(c => c.type === conferencia.type && c.id !== conferencia.id)
    .slice(0, 2);

  const hasContent = conferencia.content && conferencia.content.length > 0;

  return (
    <div className="pt-28 pb-20 mx-auto max-w-7xl px-5 md:px-10">
      <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
        {/* SIDEBAR - Índice y navegación */}
        <aside className="hidden lg:block sticky top-28 self-start">
          <Link to="/conferencias-fase-b" className="cr-eyebrow text-[color:var(--gold)] hover:text-[color:var(--gold2)] transition">
            ← Fase B
          </Link>
          
          <div className="cr-divider my-6" />
          
          {/* Navegación anterior/siguiente */}
          <div className="space-y-3">
            <div className="cr-eyebrow mb-2">Navegación</div>
            {prevConf && (
              <a 
                href={`/conferencia-fase-b/${prevConf.id}`}
                className="block text-sm text-[color:var(--ash)] hover:text-[color:var(--gold)] transition"
              >
                <span className="text-[0.65rem] uppercase tracking-[0.16em]">Anterior</span>
                <p className="line-clamp-2 mt-1">{prevConf.title}</p>
              </a>
            )}
            {nextConf && (
              <a 
                href={`/conferencia-fase-b/${nextConf.id}`}
                className="block text-sm text-[color:var(--ash)] hover:text-[color:var(--gold)] transition"
              >
                <span className="text-[0.65rem] uppercase tracking-[0.16em]">Siguiente</span>
                <p className="line-clamp-2 mt-1">{nextConf.title}</p>
              </a>
            )}
          </div>
          
          {/* Relacionadas */}
          {relatedByType.length > 0 && (
            <>
              <div className="cr-divider my-6" />
              <div className="cr-eyebrow mb-3">Del mismo tipo</div>
              <div className="space-y-2">
                {relatedByType.map(r => (
                  <a 
                    key={r.id}
                    href={`/conferencia-fase-b/${r.id}`}
                    className="block text-sm text-[color:var(--ash)] hover:text-[color:var(--gold)] transition line-clamp-2"
                  >
                    Conf. {String(r.number).padStart(2, "0")}: {r.title}
                  </a>
                ))}
              </div>
            </>
          )}
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <article>
          {/* HEADER */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <Link to="/conferencias-fase-b" className="cr-eyebrow text-[color:var(--gold)] lg:hidden">
                ← Fase B
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="cr-eyebrow text-[color:var(--gold)]">
                Conferencia {String(conferencia.number).padStart(2, "0")} de 25
              </span>
              <span className="text-[0.6rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border border-[color:var(--gold)] text-[color:var(--gold2)]">
                {typeLabels[conferencia.type] || conferencia.type}
              </span>
            </div>
            
            <h1 className="cr-display text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
              {conferencia.title}
            </h1>
            
            <p className="mt-5 text-[color:var(--ash)] leading-relaxed text-lg max-w-2xl">
              {conferencia.summary}
            </p>
            
            <div className="cr-divider mt-8" />
          </header>

          {/* CONTENIDO */}
          {hasContent ? (
            <ContentBlocks blocks={conferencia.content} />
          ) : (
            <div className="cr-luxury-border rounded-2xl p-8 md:p-12 cr-glass text-center">
              <div className="cr-eyebrow text-[color:var(--gold)] mb-4">Contenido en preparación</div>
              <h2 className="font-display text-2xl mb-4">Próximamente disponible</h2>
              <p className="text-[color:var(--ash)] leading-relaxed max-w-lg mx-auto mb-6">
                Esta conferencia está siendo preparada con el mismo cuidado editorial 
                que el resto de la biblioteca. El contenido completo estará disponible pronto.
              </p>
              <p className="text-sm text-[color:var(--ash)]">
                Resumen provisional: {conferencia.summary}
              </p>
            </div>
          )}

          {/* NAVEGACIÓN MÓVIL */}
          <div className="lg:hidden mt-16 pt-8 border-t border-[color-mix(in_oklab,var(--gold)_15%,transparent)]">
            <div className="flex justify-between items-center">
              {prevConf ? (
                <a 
                  href={`/conferencia-fase-b/${prevConf.id}`}
                  className="text-sm text-[color:var(--ash)] hover:text-[color:var(--gold)]"
                >
                  ← Anterior
                </a>
              ) : <div />}
              {nextConf && (
                <a 
                  href={`/conferencia-fase-b/${nextConf.id}`}
                  className="text-sm text-[color:var(--gold)] hover:text-[color:var(--gold2)]"
                >
                  Siguiente →
                </a>
              )}
            </div>
          </div>

          {/* LISTA COMPLETA */}
          <div className="mt-20 pt-10 border-t border-[color-mix(in_oklab,var(--gold)_15%,transparent)]">
            <div className="text-center">
              <div className="cr-eyebrow mb-3">Continuar el estudio</div>
              <Link to="/conferencias-fase-b" className="cr-btn cr-btn-gold">
                Ver todas las conferencias de Fase B
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
