import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState, useRef, useEffect } from "react";
import { yoesQuery, normalize } from "@/lib/cr/queries";
import { useReveal } from "@/components/cr/Reveal";
import { Search, Sparkles, BookOpen, Clock, Filter, X, ChevronRight, Info, Star, Compass } from "lucide-react";
import type { Yo } from "@/lib/cr/types";

const MAIN_CATEGORIES = [
  { id: "todos", label: "Todo" },
  { id: "inicial", label: "Para Empezar", icon: Compass },
  { id: "Yoes básicos", label: "Básicos" },
  { id: "Centro emocional", label: "Emociones" },
  { id: "Centro intelectual", label: "Mente" },
  { id: "Vida moderna", label: "Vida Moderna" },
  { id: "Relaciones", label: "Relaciones" },
  { id: "Centro sexual", label: "Sexo" },
];

const CENTERS = [
  { id: "todos", label: "Todos" },
  { id: "intelectual", label: "Intelectual" },
  { id: "emocional", label: "Emocional" },
  { id: "motor", label: "Motor" },
  { id: "instintivo", label: "Instintivo" },
  { id: "sexual", label: "Sexual" },
];

const SORT_OPTIONS = [
  { id: "recientes", label: "Recientes" },
  { id: "alfabetico", label: "A-Z" },
  { id: "empezar", label: "Recomendados" },
];

const isNew = (dateStr?: string): boolean => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 14;
};

const formatDate = (dateStr?: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" });
};

export const Route = createFileRoute("/yoes")({
  head: () => ({
    meta: [
      { title: "Estudios de Yoes — Biblioteca Viva — Conciencia Revolucionaria" },
      { name: "description", content: "Material práctico para la auto-observación y comprensión de los defectos psicológicos." },
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
  const [center, setCenter] = useState("todos");
  const [sortBy, setSortBy] = useState("recientes");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = yoes.filter(y => y.status !== "draft");
    
    if (category === "inicial") {
      list = list.filter(y => y.level === "inicial" || y.recommended);
    } else if (category !== "todos") {
      list = list.filter(y => y.category === category);
    }

    if (center !== "todos") list = list.filter(y => y.center === center);
    
    if (q) {
      const nq = normalize(q);
      list = list.filter(y => 
        normalize(y.title).includes(nq) || 
        normalize(y.summary).includes(nq) || 
        y.tags.some(t => normalize(t).includes(nq))
      );
    }
    
    list.sort((a, b) => {
      if (sortBy === "recientes") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "alfabetico") return a.title.localeCompare(b.title);
      if (sortBy === "empezar") return (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0);
      return 0;
    });
    
    return list;
  }, [yoes, q, category, center, sortBy]);

  const featuredYo = useMemo(() => {
    return yoes.find(y => y.featured) || yoes.find(y => y.id === "yo-de-la-ansiedad") || filtered[0];
  }, [yoes, filtered]);

  const resetFilters = () => {
    setQ("");
    setCategory("todos");
    setCenter("todos");
    setSortBy("recientes");
  };

  return (
    <div ref={ref} className="pt-24 pb-20 bg-[color:var(--void)] min-h-screen">
      
      {/* COMPACT HERO */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 mb-12 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[color-mix(in_oklab,var(--gold)_10%,transparent)] pb-10">
          <div className="max-w-2xl space-y-4">
            <div className="cr-eyebrow text-[color:var(--gold)]">Biblioteca Viva</div>
            <h1 className="cr-display text-[clamp(2.5rem,2rem+5vw,4.5rem)] leading-none">Estudios de <span className="cr-gold-text italic font-light">Yoes</span></h1>
            <p className="text-[color:var(--ash)] text-sm sm:text-base leading-relaxed opacity-80">
              Material práctico para observar, comprender y transformar los defectos psicológicos en el diario vivir.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button 
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[color-mix(in_oklab,var(--gold)_20%,transparent)] bg-[color:var(--obsidian)] text-xs uppercase tracking-widest font-bold hover:border-[color:var(--gold)] transition"
            >
              <Filter className="w-4 h-4" /> Filtrar
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        
        {/* SEARCH & HORIZONTAL CATEGORIES */}
        <div className="space-y-8 mb-16">
          <div className="relative max-w-3xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--ash)]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por yo, centro o tema..."
              className="w-full bg-[color:var(--obsidian)] border border-[color-mix(in_oklab,var(--gold)_15%,transparent)] focus:border-[color:var(--gold)] rounded-2xl pl-11 pr-5 py-4 outline-none text-sm placeholder:text-[color:var(--ash)] transition-all shadow-inner"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {MAIN_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-[0.65rem] uppercase tracking-[0.15em] font-bold border transition-all shrink-0 flex items-center gap-2 ${
                  category === cat.id 
                  ? "bg-[color:var(--gold)] text-[color:var(--ink)] border-[color:var(--gold)] shadow-lg shadow-gold/20" 
                  : "bg-[color:var(--obsidian)] border-[color-mix(in_oklab,var(--gold)_15%,transparent)] text-[color:var(--ash)] hover:border-[color:var(--gold)]"
                }`}
              >
                {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* YO DE LA SEMANA - HIGHLIGHTED */}
        {featuredYo && q === "" && category === "todos" && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[color-mix(in_oklab,var(--gold)_20%,transparent)]" />
              <div className="flex items-center gap-2 shrink-0">
                <Sparkles className="w-4 h-4 text-[color:var(--gold)]" />
                <span className="cr-eyebrow text-[color:var(--gold)]">Yo de la semana</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[color-mix(in_oklab,var(--gold)_20%,transparent)]" />
            </div>

            <Link 
              to="/yo/$id" 
              params={{ id: featuredYo.id }}
              className="group block relative overflow-hidden rounded-[2rem] border border-[color-mix(in_oklab,var(--gold)_30%,transparent)] bg-[color:var(--obsidian)] transition-all duration-500 hover:border-[color:var(--gold)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_oklab,var(--gold)_5%,transparent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 flex flex-col md:flex-row">
                <div className="md:w-[40%] aspect-[4/3] md:aspect-auto bg-[color-mix(in_oklab,var(--gold)_5%,transparent)] border-b md:border-b-0 md:border-r border-[color-mix(in_oklab,var(--gold)_15%,transparent)] flex items-center justify-center p-12 overflow-hidden">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[color:var(--gold)] blur-3xl opacity-10 animate-pulse" />
                    <BookOpen className="w-24 h-24 md:w-32 md:h-32 text-[color:var(--gold)] relative z-10 opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700" />
                  </div>
                </div>
                
                <div className="flex-1 p-8 sm:p-12 space-y-6">
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className="px-2 py-0.5 rounded border border-[color:var(--gold)] text-[0.55rem] font-bold text-[color:var(--gold)] uppercase tracking-widest">{featuredYo.category}</span>
                    <span className="text-[0.6rem] tracking-[0.1em] uppercase text-[color:var(--ash)] opacity-60">{formatDate(featuredYo.date)}</span>
                  </div>
                  
                  <h3 className="font-display text-3xl sm:text-5xl group-hover:text-[color:var(--gold2)] transition-colors leading-[1.1]">{featuredYo.title}</h3>
                  
                  <p className="text-[color:var(--bone)] text-sm sm:text-lg leading-relaxed opacity-70 line-clamp-3 sm:line-clamp-none max-w-2xl">
                    {featuredYo.summary}
                  </p>
                  
                  <div className="pt-4 flex items-center gap-6">
                    <div className="cr-btn cr-btn-gold px-12 py-4">Estudiar Ahora</div>
                    <div className="hidden sm:flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-[color:var(--ash)] font-bold">
                      <Clock className="w-3.5 h-3.5" /> {featuredYo.readingTime || 8} MINUTOS
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* EXPLORER GRID */}
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="cr-display text-2xl sm:text-3xl">Explorar <span className="text-[color:var(--ash)] font-light italic">Biblioteca</span></h2>
            <div className="flex items-center gap-3">
              <span className="text-[0.6rem] uppercase tracking-widest text-[color:var(--ash)] font-bold hidden sm:block">Resultados:</span>
              <span className="px-3 py-1 rounded-full bg-[color:var(--obsidian)] border border-[color-mix(in_oklab,var(--gold)_10%,transparent)] text-[0.65rem] text-[color:var(--gold)] font-bold">{filtered.length}</span>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filtered.map((yo, i) => (
                <YoCard key={yo.id} yo={yo} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center space-y-8 cr-glass rounded-[2rem] border border-[color-mix(in_oklab,var(--gold)_10%,transparent)]">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-[color-mix(in_oklab,var(--gold)_8%,transparent)] flex items-center justify-center text-[color:var(--gold)]">
                <Info className="w-10 h-10" />
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-3xl">Sin resultados</h3>
                <p className="text-[color:var(--ash)] max-w-md mx-auto text-sm leading-relaxed">No encontramos estudios con esos filtros. Intenta buscar por otro yo, centro o categoría.</p>
              </div>
              <button onClick={resetFilters} className="cr-btn cr-btn-gold px-10">Limpiar todos los filtros</button>
            </div>
          )}
        </div>
      </section>

      {/* FILTER DRAWER MOBILE */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-[100] md:hidden flex items-end">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setIsFilterDrawerOpen(false)} />
          <div className="relative w-full bg-[color:var(--obsidian)] rounded-t-[2.5rem] border-t border-[color:var(--gold)] p-8 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-500 shadow-2xl shadow-gold/20">
            <div className="flex items-center justify-between mb-10">
              <div className="space-y-1">
                <h3 className="font-display text-2xl">Opciones de filtrado</h3>
                <p className="text-[0.65rem] uppercase tracking-widest text-[color:var(--ash)]">Organiza tu búsqueda</p>
              </div>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="p-3 bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] rounded-full text-[color:var(--gold)]"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="space-y-10">
              <FilterSection label="Categoría" options={MAIN_CATEGORIES} value={category} onChange={setCategory} />
              <FilterSection label="Centro de la Máquina" options={CENTERS} value={center} onChange={setCenter} />
              <FilterSection label="Ordenar por" options={SORT_OPTIONS} value={sortBy} onChange={setSortBy} />
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 sticky bottom-0 bg-[color:var(--obsidian)] pt-6 border-t border-[color-mix(in_oklab,var(--gold)_10%,transparent)]">
              <button onClick={resetFilters} className="cr-btn cr-btn-ghost text-xs py-4">Restaurar</button>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="cr-btn cr-btn-gold text-xs py-4 shadow-lg shadow-gold/10">Aplicar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterSection({ label, options, value, onChange }: { label: string, options: any[], value: string, onChange: (v: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-[0.65rem] uppercase tracking-[0.25em] text-[color:var(--gold)] font-bold">{label}</span>
        <div className="h-px flex-1 bg-[color-mix(in_oklab,var(--gold)_10%,transparent)]" />
      </div>
      <div className="flex flex-wrap gap-2.5">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`px-5 py-3 rounded-xl text-[0.7rem] uppercase tracking-widest font-bold transition-all border ${
              value === opt.id 
              ? "bg-[color:var(--gold)] text-[color:var(--ink)] border-[color:var(--gold)]" 
              : "bg-[color-mix(in_oklab,var(--gold)_5%,transparent)] border-[color-mix(in_oklab,var(--gold)_10%,transparent)] text-[color:var(--ash)]"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function YoCard({ yo, index }: { yo: Yo; index: number }) {
  const isNewItem = isNew(yo.date);
  
  return (
    <Link 
      to="/yo/$id" 
      params={{ id: yo.id }}
      className="cr-card group flex flex-col h-full cr-reveal p-0 overflow-hidden border-[color-mix(in_oklab,var(--gold)_15%,transparent)] bg-[color:var(--obsidian)] hover:border-[color:var(--gold)] transition-all duration-500"
      style={{ transitionDelay: `${(index % 6) * 50}ms` }}
    >
      <div className="p-7 sm:p-8 flex-1 flex flex-col space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[0.55rem] tracking-[0.2em] uppercase text-[color:var(--gold)] font-black">{yo.category}</span>
            {yo.recommended && <Star className="w-3 h-3 text-[color:var(--gold)] fill-[color:var(--gold)] opacity-50" />}
          </div>
          <div className="flex gap-2">
            {isNewItem && <span className="px-2 py-0.5 rounded bg-[color:var(--gold)] text-[color:var(--ink)] text-[0.5rem] font-bold uppercase tracking-widest">Nuevo</span>}
          </div>
        </div>
        
        <h3 className="font-display text-2xl group-hover:text-[color:var(--gold2)] transition-colors leading-tight line-clamp-2">
          {yo.title}
        </h3>
        
        <p className="text-[color:var(--ash)] text-sm leading-relaxed line-clamp-3 flex-1 opacity-80">
          {yo.summary}
        </p>
        
        <div className="flex items-center gap-5 text-[0.6rem] text-[color:var(--ash)] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-70 transition-opacity">
          <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {yo.readingTime || 5} MIN</div>
          <div className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> {yo.level}</div>
        </div>
      </div>
      
      <div className="px-7 py-5 bg-[color-mix(in_oklab,var(--gold)_3%,transparent)] border-t border-[color-mix(in_oklab,var(--gold)_8%,transparent)] flex items-center justify-between group-hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] transition-all">
        <span className="text-[0.65rem] uppercase tracking-[0.25em] font-black text-[color:var(--gold)]">Estudiar Yo</span>
        <ChevronRight className="w-5 h-5 text-[color:var(--gold)] group-hover:translate-x-1.5 transition-transform duration-500" />
      </div>
    </Link>
  );
}
