import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { yoesQuery, normalize } from "@/lib/cr/queries";
import { useReveal } from "@/components/cr/Reveal";
import { HeroSection, SearchAndFilters } from "@/components/cr";
import { Search, Sparkles, BookOpen, Clock, ArrowUpDown, Calendar, Tag } from "lucide-react";
import type { Yo } from "@/lib/cr/types";

const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "emociones", label: "Emociones" },
  { id: "relaciones", label: "Relaciones" },
  { id: "miedos", label: "Miedos" },
  { id: "ego", label: "Ego" },
  { id: "habitos", label: "Hábitos" },
];

const TAGS = [
  { id: "todos", label: "Todos" },
  { id: "duelo", label: "Duelo" },
  { id: "depresión", label: "Depresión" },
  { id: "ansiedad", label: "Ansiedad" },
  { id: "miedo", label: "Miedo" },
  { id: "relación", label: "Relación" },
  { id: "conquista", label: "Conquista" },
  { id: "machismo", label: "Machismo" },
  { id: "ego", label: "Ego" },
  { id: "psicología", label: "Psicología" },
];

const SORT_OPTIONS = [
  { id: "recientes", label: "Más recientes" },
  { id: "antiguos", label: "Más antiguos" },
];

// Función para verificar si una fecha está dentro de los últimos 14 días
const isNew = (dateStr?: string): boolean => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 14;
};

// Función para formatear fecha
const formatDate = (dateStr?: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const Route = createFileRoute("/yoes")({
  head: () => ({
    meta: [
      { title: "Estudios de Yoes — Biblioteca Viva — Conciencia Revolucionaria" },
      { name: "description", content: "Material práctico para la auto-observación, la comprensión y la muerte psicológica en el diario vivir." },
      { property: "og:title", content: "Estudios de Yoes — Biblioteca Viva" },
      { property: "og:description", content: "Material práctico para la auto-observación y la transformación de los agregados." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(yoesQuery()),
  component: YoesPage,
});

function YoesPage() {
  const ref = useReveal();
  const { data: yoes } = useSuspenseQuery(yoesQuery());
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("todos");
  const [tag, setTag] = useState("todos");
  const [sortBy, setSortBy] = useState("recientes");

  const filtered = useMemo(() => {
    let list = yoes.slice();
    
    // Filtro por categoría
    if (category !== "todos") {
      list = list.filter(y => y.category === category || y.tags.some(t => normalize(t).includes(normalize(category))));
    }
    
    // Filtro por tag
    if (tag !== "todos") {
      list = list.filter(y => y.tags.some(t => normalize(t).includes(normalize(tag))));
    }
    
    // Búsqueda
    if (q) {
      const nq = normalize(q);
      list = list.filter(y => 
        normalize(y.title).includes(nq) || 
        normalize(y.summary).includes(nq) || 
        y.tags.some(t => normalize(t).includes(nq))
      );
    }
    
    // Ordenar por fecha
    list.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return sortBy === "recientes" ? dateB - dateA : dateA - dateB;
    });
    
    return list;
  }, [yoes, q, category, tag, sortBy]);

  // Separar estudio destacado (el más reciente con fecha)
  const featured = useMemo(() => {
    const withDate = filtered.filter(y => y.date && y.status === "completo");
    return withDate.length > 0 ? withDate[0] : filtered[0];
  }, [filtered]);
  
  const gridItems = filtered.filter(y => y.id !== featured?.id);

  return (
    <div ref={ref} className="pt-32 pb-20">
      {/* HERO */}
      <HeroSection
        eyebrow="Biblioteca viva"
        title="Estudios de"
        highlight="Yoes"
        subtitle="Material práctico para la auto-observación, la comprensión y la muerte psicológica en el diario vivir."
      />

      {/* FILTROS Y BÚSQUEDA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 mb-12">
        <div className="cr-luxury-border rounded-2xl p-4 sm:p-5 md:p-6 cr-glass">
          {/* Buscador */}
          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--ash)]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por título, contenido o tema..."
              className="w-full bg-transparent border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] focus:border-[color:var(--gold)] rounded-full pl-11 pr-5 py-3 outline-none text-sm placeholder:text-[color:var(--ash)] transition"
              aria-label="Buscar estudios"
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

          {/* Filtros */}
          <div className="space-y-4">
            {/* Categorías */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[0.65rem] uppercase tracking-[0.16em] text-[color:var(--ash)] mr-2">
                <Tag className="w-3 h-3 inline mr-1" />
                Categoría:
              </span>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`text-[0.65rem] tracking-[0.16em] uppercase px-3 py-1.5 rounded-full border transition ${
                    category === c.id
                      ? "bg-[color:var(--gold)] text-[color:var(--ink)] border-[color:var(--gold)]"
                      : "border-[color-mix(in_oklab,var(--gold)_25%,transparent)] hover:border-[color:var(--gold)]"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[0.65rem] uppercase tracking-[0.16em] text-[color:var(--ash)] mr-2">
                <Sparkles className="w-3 h-3 inline mr-1" />
                Tema:
              </span>
              {TAGS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTag(t.id)}
                  className={`text-[0.65rem] tracking-[0.16em] uppercase px-3 py-1.5 rounded-full border transition ${
                    tag === t.id
                      ? "bg-[color:var(--gold)] text-[color:var(--ink)] border-[color:var(--gold)]"
                      : "border-[color-mix(in_oklab,var(--gold)_25%,transparent)] hover:border-[color:var(--gold)]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Ordenar */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[color-mix(in_oklab,var(--gold)_10%,transparent)]">
              <span className="text-[0.65rem] uppercase tracking-[0.16em] text-[color:var(--ash)] mr-2">
                <ArrowUpDown className="w-3 h-3 inline mr-1" />
                Ordenar:
              </span>
              {SORT_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id)}
                  className={`text-[0.65rem] tracking-[0.16em] uppercase px-3 py-1.5 rounded-full border transition ${
                    sortBy === s.id
                      ? "bg-[color-mix(in_oklab,var(--gold)_20%,transparent)] text-[color:var(--gold)] border-[color:var(--gold)]"
                      : "border-[color-mix(in_oklab,var(--gold)_25%,transparent)] hover:border-[color:var(--gold)]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        {filtered.length === 0 ? (
          <EmptyState onClear={() => { setQ(""); setCategory("todos"); setTag("todos"); }} />
        ) : (
          <>
            {/* Estudio Destacado */}
            {featured && <FeaturedCard yo={featured} />}

            {/* Grid */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              {gridItems.map((y, i) => (
                <YoCard key={y.id} yo={y} index={i} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

// Tarjeta de estudio destacado
function FeaturedCard({ yo }: { yo: Yo }) {
  const ref = useReveal();
  const newBadge = isNew(yo.date);

  return (
    <div ref={ref} className="cr-luxury-border rounded-2xl p-6 sm:p-8 md:p-10 cr-glass cr-reveal mb-12">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Imagen placeholder o icono */}
        <div className="shrink-0 hidden sm:flex items-center justify-center">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[color-mix(in_oklab,var(--gold)_12%,transparent)] flex items-center justify-center shadow-inner">
            <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-[color:var(--gold)]" />
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="cr-eyebrow text-[color:var(--gold)]">Estudio destacado</span>
            {newBadge && (
              <span className="text-[0.6rem] tracking-[0.18em] uppercase px-2.5 py-0.5 rounded-full bg-[color:var(--gold)] text-[color:var(--ink)] font-bold">
                Nuevo
              </span>
            )}
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 leading-tight group-hover:text-[color:var(--gold2)] transition">{yo.title}</h2>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[color:var(--ash)] mb-6">
            {yo.date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[color:var(--gold)]" />
                <span>{formatDate(yo.date)}</span>
              </div>
            )}
            {yo.category && (
              <span className="px-2 py-0.5 rounded-md border border-[color-mix(in_oklab,var(--gold)_20%,transparent)] text-[color:var(--ash)] bg-[color-mix(in_oklab,var(--gold)_5%,transparent)]">
                {yo.category}
              </span>
            )}
          </div>

          <p className="text-[color:var(--bone)] text-sm sm:text-base leading-relaxed mb-6 max-w-2xl opacity-90">{yo.summary}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {yo.tags.slice(0, 5).map((t) => (
              <span
                key={t}
                className="text-[0.6rem] tracking-[0.15em] uppercase px-2.5 py-1 rounded-lg border border-[color-mix(in_oklab,var(--gold)_15%,transparent)] text-[color:var(--ash)] bg-[color-mix(in_oklab,var(--void)_50%,transparent)]"
              >
                {t}
              </span>
            ))}
          </div>

          <Link
            to="/yo/$id"
            params={{ id: yo.id }}
            className="cr-btn cr-btn-gold w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px]"
          >
            <BookOpen className="w-4 h-4" />
            <span>Estudiar ahora</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Tarjeta de estudio regular
function YoCard({ yo, index }: { yo: Yo; index: number }) {
  const newBadge = isNew(yo.date);

  return (
    <Link
      to="/yo/$id"
      params={{ id: yo.id }}
      className="cr-card cr-reveal block group h-full flex flex-col"
      style={{ transitionDelay: `${(index % 9) * 60}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="cr-eyebrow text-[color:var(--gold)]">Estudio</span>
          {newBadge && (
            <span className="text-[0.55rem] tracking-[0.18em] uppercase px-2 py-0.5 rounded-full bg-[color:var(--gold)] text-[color:var(--ink)]">
              Nuevo
            </span>
          )}
        </div>
        {yo.date && (
          <span className="text-[0.6rem] text-[color:var(--ash)] flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDate(yo.date)}
          </span>
        )}
      </div>

      {/* Título */}
      <h3 className="font-display text-xl mb-2 group-hover:text-[color:var(--gold2)] transition leading-snug">
        {yo.title}
      </h3>

      {/* Categoría */}
      {yo.category && (
        <span className="text-[0.6rem] tracking-[0.16em] uppercase text-[color:var(--ash)] mb-3 block">
          {yo.category}
        </span>
      )}

      {/* Extracto */}
      <p className="text-sm text-[color:var(--ash)] leading-relaxed mb-4 flex-1 line-clamp-3">
        {yo.summary}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {yo.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="text-[0.55rem] tracking-[0.18em] uppercase px-2 py-0.5 rounded-full border border-[color-mix(in_oklab,var(--gold)_18%,transparent)] text-[color:var(--ash)]"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Botón */}
      <div className="pt-3 border-t border-[color-mix(in_oklab,var(--gold)_10%,transparent)]">
        <span className="text-[0.7rem] tracking-[0.18em] uppercase text-[color:var(--gold)] flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5" />
          Estudiar
        </span>
      </div>
    </Link>
  );
}

// Estado vacío
function EmptyState({ onClear }: { onClear: () => void }) {
  const ref = useReveal();

  return (
    <div ref={ref} className="text-center py-24 cr-reveal">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] flex items-center justify-center">
        <Search className="w-8 h-8 text-[color:var(--gold)]" />
      </div>
      <div className="cr-eyebrow mb-3">Biblioteca vacía</div>
      <h3 className="cr-display text-3xl mb-3">Ningún estudio coincide</h3>
      <p className="text-[color:var(--ash)] mb-6 max-w-md mx-auto">
        Prueba con otros términos de búsqueda o limpia los filtros para ver todos los estudios disponibles.
      </p>
      <button onClick={onClear} className="cr-btn cr-btn-gold">
        Limpiar filtros
      </button>
    </div>
  );
}
