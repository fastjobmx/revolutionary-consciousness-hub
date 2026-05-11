import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { librosQuery, FILTER_TIPOS_LIBROS, FILTER_AUTORES_LIBROS, normalize } from "@/lib/cr/queries";
import { useReveal } from "@/components/cr/Reveal";
import type { Libro } from "@/lib/cr/types";
import { Search, Download, BookOpen, User, Calendar, FileText } from "lucide-react";

export const Route = createFileRoute("/libros")({
  head: () => ({
    meta: [
      { title: "Biblioteca de Libros — Conciencia Revolucionaria" },
      { name: "description", content: "Colección de libros de gnosis, psicología revolucionaria, esoterismo y sabiduría ancestral para el trabajo interior." },
      { property: "og:title", content: "Biblioteca de Libros — Conciencia Revolucionaria" },
      { property: "og:description", content: "Textos fundamentales para el Conocimiento de Sí Mismo." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(librosQuery()),
  component: LibrosPage,
});

// Función para obtener texto alternativo cuando falta descripción
const getDefaultDescription = (title: string, author: string): string => {
  return `Material de estudio "${title}" de ${author} para profundizar en el trabajo interior.`;
};

function LibrosPage() {
  const ref = useReveal();
  const { data: libros } = useSuspenseQuery(librosQuery());
  const [q, setQ] = useState("");
  const [tipoFilter, setTipoFilter] = useState("todos");
  const [autorFilter, setAutorFilter] = useState("todos");

  const filtered = useMemo(() => {
    let list = libros.slice();
    
    // Filtro por tipo
    if (tipoFilter !== "todos") {
      list = list.filter(l => l.type === tipoFilter);
    }
    
    // Filtro por autor
    if (autorFilter !== "todos") {
      if (autorFilter === "samael") {
        list = list.filter(l => l.author.toLowerCase().includes("samael"));
      }
    }
    
    // Búsqueda por título, autor o descripción
    if (q) {
      const nq = normalize(q);
      list = list.filter(l => 
        normalize(l.title).includes(nq) || 
        normalize(l.author).includes(nq) ||
        normalize(l.description).includes(nq) ||
        normalize(l.type).includes(nq)
      );
    }
    
    return list;
  }, [libros, q, tipoFilter, autorFilter]);

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      gnosis: "Gnosis",
      psicologia: "Psicología",
      esoterismo: "Esoterismo",
      budismo: "Budismo",
      egiptologia: "Egiptología",
      yoga: "Yoga",
      tantra: "Tantra",
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      gnosis: "border-[color:var(--gold)] text-[color:var(--gold)]",
      psicologia: "border-[color:var(--bone)] text-[color:var(--bone)]",
      esoterismo: "border-[color-mix(in_oklab,var(--gold)_60%,var(--bone))] text-[color-mix(in_oklab,var(--gold)_80%,var(--bone))]",
      budismo: "border-[color-mix(in_oklab,var(--ember)_50%,var(--gold))] text-[color:var(--gold)]",
      egiptologia: "border-[color-mix(in_oklab,var(--gold)_40%,var(--ash))] text-[color-mix(in_oklab,var(--gold)_60%,var(--ash))]",
      yoga: "border-[color-mix(in_oklab,var(--bone)_50%,var(--ash))] text-[color-mix(in_oklab,var(--bone)_70%,var(--ash))]",
      tantra: "border-[color-mix(in_oklab,var(--gold)_70%,var(--ember))] text-[color-mix(in_oklab,var(--gold)_90%,var(--ember))]",
    };
    return colors[type] || "border-[color:var(--ash)] text-[color:var(--ash)]";
  };

  return (
    <div ref={ref} className="pt-32 pb-20">
      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 mb-16">
        <div className="cr-halo" style={{ inset: "-20% 20%", height: "120%", opacity: 0.4 }} />
        <div className="relative text-center">
          <div className="cr-eyebrow cr-reveal">Recursos de estudio</div>
          <h1 className="cr-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 cr-reveal leading-[1.05]">
            <span className="cr-shimmer">Biblioteca</span>
          </h1>
          <p className="mt-6 text-lg text-[color:var(--ash)] max-w-2xl mx-auto cr-reveal leading-relaxed">
            Textos fundamentales de gnosis, psicología revolucionaria y sabiduría esotérica 
            para acompañar tu práctica del Conocimiento de Sí Mismo.
          </p>
        </div>
      </section>

      {/* CONTROLES */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 mb-10">
        <div className="cr-luxury-border rounded-2xl p-5 md:p-6 cr-glass">
          {/* Buscador */}
          <div className="flex flex-col md:flex-row gap-4 mb-5">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--ash)]" />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Buscar por título, autor o tema..."
                className="w-full bg-transparent border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] focus:border-[color:var(--gold)] rounded-full pl-11 pr-5 py-3 outline-none text-sm placeholder:text-[color:var(--ash)] transition"
                aria-label="Buscar libros"
              />
              {q && (
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.65rem] text-[color:var(--ash)] hover:text-[color:var(--gold)]"
                  onClick={() => setQ("")}
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>
          
          {/* Filtros */}
          <div className="space-y-4">
            {/* Filtros por tipo */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[0.65rem] uppercase tracking-[0.16em] text-[color:var(--ash)] mr-2">Tema:</span>
              {FILTER_TIPOS_LIBROS.map(f => (
                <button 
                  key={f.id} 
                  onClick={() => setTipoFilter(f.id)}
                  className={`text-[0.65rem] tracking-[0.16em] uppercase px-3 py-1.5 rounded-full border transition ${
                    tipoFilter === f.id 
                      ? "bg-[color:var(--gold)] text-[color:var(--ink)] border-[color:var(--gold)]" 
                      : "border-[color-mix(in_oklab,var(--gold)_25%,transparent)] hover:border-[color:var(--gold)]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            
            {/* Filtros por autor */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[0.65rem] uppercase tracking-[0.16em] text-[color:var(--ash)] mr-2">Autor:</span>
              {FILTER_AUTORES_LIBROS.map(f => (
                <button 
                  key={f.id} 
                  onClick={() => setAutorFilter(f.id)}
                  className={`text-[0.65rem] tracking-[0.16em] uppercase px-3 py-1.5 rounded-full border transition ${
                    autorFilter === f.id 
                      ? "bg-[color:var(--gold)] text-[color:var(--ink)] border-[color:var(--gold)]" 
                      : "border-[color-mix(in_oklab,var(--gold)_25%,transparent)] hover:border-[color:var(--gold)]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-4 text-xs text-[color:var(--ash)] tracking-[0.16em] uppercase">
            {filtered.length} de {libros.length} libros
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section className="mx-auto max-w-7xl px-6 md:px-10">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="cr-eyebrow">Biblioteca vacía</div>
            <h3 className="cr-display text-3xl mt-3">Ningún libro coincide</h3>
            <p className="mt-3 text-[color:var(--ash)]">Prueba con otro término o limpia los filtros.</p>
            <button 
              onClick={() => { setQ(""); setTipoFilter("todos"); setAutorFilter("todos"); }} 
              className="cr-btn cr-btn-gold mt-6"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((libro, i) => (
              <LibroCard 
                key={libro.id} 
                libro={libro} 
                typeLabel={getTypeLabel(libro.type)}
                typeColor={getTypeColor(libro.type)}
                delay={i}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

interface LibroCardProps {
  libro: Libro;
  typeLabel: string;
  typeColor: string;
  delay: number;
}

function LibroCard({ libro, typeLabel, typeColor, delay }: LibroCardProps) {
  // Usar descripción por defecto si está vacía
  const description = libro.description?.trim() 
    ? libro.description 
    : getDefaultDescription(libro.title, libro.author);
  
  // Alt text descriptivo para la portada
  const altText = `Portada del libro "${libro.title}" de ${libro.author}. ${typeLabel}.`;

  return (
    <div 
      className="cr-card cr-reveal flex flex-col h-full group"
      style={{ transitionDelay: `${(delay % 8) * 50}ms` }}
    >
      {/* Portada */}
      <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-[color-mix(in_oklab,var(--void)_90%,var(--gold))]">
        {libro.cover ? (
          <img 
            src={libro.cover} 
            alt={altText}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-[color:var(--ash)] opacity-30" />
          </div>
        )}
        
        {/* Badge de tipo */}
        <span className={`absolute top-3 right-3 text-[0.6rem] tracking-[0.16em] uppercase px-2 py-1 rounded border ${typeColor} bg-[color:var(--void)]`}>
          {typeLabel}
        </span>
      </div>
      
      {/* Información */}
      <div className="flex-1 flex flex-col">
        {/* Título */}
        <h3 className="font-display text-lg leading-snug mb-2 group-hover:text-[color:var(--gold2)] transition">
          {libro.title}
        </h3>
        
        {/* Autor */}
        <div className="flex items-center gap-2 text-sm text-[color:var(--ash)] mb-3">
          <User className="w-3.5 h-3.5" />
          <span>{libro.author}</span>
        </div>
        
        {/* Descripción */}
        <p className="text-sm text-[color:var(--ash)] leading-relaxed mb-4 flex-1 line-clamp-3">
          {description}
        </p>
        
        {/* Metadatos */}
        <div className="flex items-center gap-4 text-xs text-[color:var(--ash)] mb-4">
          {libro.year > 0 && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{libro.year}</span>
            </div>
          )}
          {libro.pages > 0 && (
            <div className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              <span>{libro.pages} págs.</span>
            </div>
          )}
        </div>
        
        {/* Botón descargar */}
        {libro.downloadUrl && libro.downloadUrl !== "#" ? (
          <a 
            href={libro.downloadUrl}
            target="_blank"
            rel="noreferrer"
            className="cr-btn cr-btn-gold w-full flex items-center justify-center gap-2 text-sm"
          >
            <Download className="w-4 h-4" />
            Descargar PDF
          </a>
        ) : (
          <button 
            disabled
            className="cr-btn cr-btn-ghost w-full opacity-50 cursor-not-allowed text-sm"
          >
            <Download className="w-4 h-4" />
            Próximamente
          </button>
        )}
      </div>
    </div>
  );
}
