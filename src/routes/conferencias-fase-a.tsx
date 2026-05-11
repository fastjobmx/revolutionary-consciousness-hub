import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { conferenciasQuery, FILTER_PILARES_FASE_A, FILTER_NIVELES_FASE_A, normalize } from "@/lib/cr/queries";
import { useReveal } from "@/components/cr/Reveal";
import type { Conferencia } from "@/lib/cr/types";
import { Search, BookOpen } from "lucide-react";

export const Route = createFileRoute("/conferencias-fase-a")({
  head: () => ({
    meta: [
      { title: "Fase A — 50 Conferencias Fundamentales — Conciencia Revolucionaria" },
      { name: "description", content: "50 conferencias prácticas que establecen los fundamentos del Conocimiento de Sí Mismo. Auto-observación, meditación, karma, ego y más." },
      { property: "og:title", content: "Fase A — Conferencias Fundamentales" },
      { property: "og:description", content: "50 lecciones esenciales para comenzar el trabajo interior." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(conferenciasQuery()),
  component: ConferenciasFaseAPage,
});

// Función para truncar texto a máximo 160 caracteres
function truncate(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

// Mapeo de conferencias a pilares (basado en contenido temático)
function getPilar(conferencia: Conferencia): string {
  const tags = conferencia.tags;
  if (tags.includes("psicologia") || tags.includes("ego")) return "psicologia";
  if (tags.includes("meditacion") || tags.includes("practica")) return "mistica";
  if (tags.includes("karma") || tags.includes("leyes")) return "ciencia";
  if (tags.includes("arte")) return "arte";
  return "psicologia"; // Default
}

// Mapeo de conferencias a nivel (basado en número)
function getNivel(number: string): string {
  const num = parseInt(number, 10);
  if (num <= 15) return "inicial";
  if (num <= 35) return "intermedio";
  return "avanzado";
}

function ConferenciasFaseAPage() {
  const ref = useReveal();
  const { data: allConferencias } = useSuspenseQuery(conferenciasQuery());
  
  // Filtrar solo Fase A
  const conferenciasA = useMemo(() => 
    allConferencias.filter(c => c.phase === "A").sort((a, b) => a.number.localeCompare(b.number)),
    [allConferencias]
  );
  
  const [q, setQ] = useState("");
  const [pilarFilter, setPilarFilter] = useState("todas");
  const [nivelFilter, setNivelFilter] = useState("todas");

  const filtered = useMemo(() => {
    let list = conferenciasA.slice();
    
    // Filtro por pilar
    if (pilarFilter !== "todas") {
      list = list.filter(c => getPilar(c) === pilarFilter);
    }
    
    // Filtro por nivel
    if (nivelFilter !== "todas") {
      list = list.filter(c => getNivel(c.number) === nivelFilter);
    }
    
    // Búsqueda por título y contenido
    if (q) {
      const nq = normalize(q);
      list = list.filter(c => 
        normalize(c.title).includes(nq) || 
        normalize(c.summary).includes(nq) ||
        c.tags.some(t => normalize(t).includes(nq))
      );
    }
    
    return list;
  }, [conferenciasA, q, pilarFilter, nivelFilter]);

  const getPilarLabel = (pilar: string) => {
    const labels: Record<string, string> = {
      ciencia: "Ciencia",
      arte: "Arte",
      psicologia: "Psicología",
      mistica: "Mística",
    };
    return labels[pilar] || pilar;
  };

  const getNivelLabel = (nivel: string) => {
    const labels: Record<string, string> = {
      inicial: "Inicial",
      intermedio: "Intermedio",
      avanzado: "Avanzado",
    };
    return labels[nivel] || nivel;
  };

  return (
    <div ref={ref} className="pt-32 pb-20">
      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 mb-16">
        <div className="cr-halo" style={{ inset: "-20% 20%", height: "120%", opacity: 0.4 }} />
        <div className="relative text-center">
          <div className="cr-eyebrow cr-reveal">Primera etapa del trabajo</div>
          <h1 className="cr-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 cr-reveal">
            Fase <span className="cr-shimmer">A</span>
          </h1>
          <p className="mt-6 text-lg text-[color:var(--ash)] max-w-2xl mx-auto cr-reveal leading-relaxed">
            50 conferencias fundamentales que establecen las bases del Conocimiento de Sí Mismo. 
            Desde la auto-observación básica hasta la comprensión profunda de la psique.
          </p>
          <div className="mt-4 text-[color:var(--gold)] cr-reveal text-sm tracking-[0.2em] uppercase">
            Ciencia · Arte · Psicología · Mística
          </div>
        </div>
      </section>

      {/* CONTROLES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 mb-10">
        <div className="cr-luxury-border rounded-2xl p-4 sm:p-5 md:p-6 cr-glass">
          {/* Buscador */}
          <div className="flex flex-col md:flex-row gap-4 mb-5">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--ash)]" />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Buscar por título, tema o contenido..."
                className="w-full bg-transparent border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] focus:border-[color:var(--gold)] rounded-full pl-11 pr-5 py-3 outline-none text-sm placeholder:text-[color:var(--ash)] transition"
                aria-label="Buscar conferencias"
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
            {/* Filtros por pilar */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[0.65rem] uppercase tracking-[0.16em] text-[color:var(--ash)] mr-2">Pilar:</span>
              {FILTER_PILARES_FASE_A.map(f => (
                <button 
                  key={f.id} 
                  onClick={() => setPilarFilter(f.id)}
                  className={`text-[0.65rem] tracking-[0.16em] uppercase px-3 py-1.5 rounded-full border transition ${
                    pilarFilter === f.id 
                      ? "bg-[color:var(--gold)] text-[color:var(--ink)] border-[color:var(--gold)]" 
                      : "border-[color-mix(in_oklab,var(--gold)_25%,transparent)] hover:border-[color:var(--gold)]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            
            {/* Filtros por nivel */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[0.65rem] uppercase tracking-[0.16em] text-[color:var(--ash)] mr-2">Nivel:</span>
              {FILTER_NIVELES_FASE_A.map(f => (
                <button 
                  key={f.id} 
                  onClick={() => setNivelFilter(f.id)}
                  className={`text-[0.65rem] tracking-[0.16em] uppercase px-3 py-1.5 rounded-full border transition ${
                    nivelFilter === f.id 
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
            {filtered.length} de {conferenciasA.length} conferencias
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="cr-eyebrow">Silencio</div>
            <h3 className="cr-display text-3xl mt-3">Ninguna conferencia coincide</h3>
            <p className="mt-3 text-[color:var(--ash)]">Prueba con otro término o limpia los filtros.</p>
            <button 
              onClick={() => { setQ(""); setPilarFilter("todas"); setNivelFilter("todas"); }} 
              className="cr-btn cr-btn-gold mt-6"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => (
              <ConferenciaCard 
                key={c.id} 
                conferencia={c} 
                pilar={getPilar(c)}
                nivel={getNivel(c.number)}
                delay={i}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

interface ConferenciaCardProps {
  conferencia: Conferencia;
  pilar: string;
  nivel: string;
  delay: number;
}

function ConferenciaCard({ conferencia, pilar, nivel, delay }: ConferenciaCardProps) {
  const pilarColors: Record<string, string> = {
    ciencia: "bg-[color-mix(in_oklab,var(--gold)_20%,transparent)] text-[color:var(--gold)]",
    arte: "bg-[color-mix(in_oklab,var(--bone)_20%,transparent)] text-[color:var(--bone)]",
    psicologia: "bg-[color-mix(in_oklab,var(--ash)_20%,transparent)] text-[color:var(--ash)]",
    mistica: "bg-[color-mix(in_oklab,var(--gold)_30%,transparent)] text-[color:var(--gold2)]",
  };

  const nivelLabels: Record<string, string> = {
    inicial: "Nivel inicial",
    intermedio: "Nivel intermedio",
    avanzado: "Nivel avanzado",
  };

  return (
    <Link 
      to="/conferencia/$id" 
      params={{ id: conferencia.id }} 
      className="cr-card cr-reveal block group h-full flex flex-col"
      style={{ transitionDelay: `${(delay % 9) * 40}ms` }}
    >
      {/* Header con número y pilar */}
      <div className="flex items-center justify-between mb-3">
        <span className="cr-eyebrow text-[color:var(--gold)]">
          Conf. {conferencia.number}
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-[0.55rem] tracking-[0.16em] uppercase px-2 py-1 rounded-full ${pilarColors[pilar]}`}>
            {pilar === "ciencia" ? "Ciencia" : 
             pilar === "arte" ? "Arte" : 
             pilar === "psicologia" ? "Psicología" : "Mística"}
          </span>
        </div>
      </div>
      
      {/* Título */}
      <h3 className="font-display text-lg mb-2 leading-snug group-hover:text-[color:var(--gold2)] transition">
        {conferencia.title}
      </h3>
      
      {/* Resumen truncado a 160 caracteres */}
      <p className="text-sm text-[color:var(--ash)] leading-relaxed mb-4 flex-1">
        {truncate(conferencia.summary, 160)}
      </p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {conferencia.tags.slice(0, 4).map(tag => (
          <span 
            key={tag} 
            className="text-[0.55rem] tracking-[0.16em] uppercase px-2 py-0.5 rounded border border-[color-mix(in_oklab,var(--gold)_20%,transparent)] text-[color:var(--ash)]"
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Footer con nivel y botón */}
      <div className="flex items-center justify-between pt-3 border-t border-[color-mix(in_oklab,var(--gold)_10%,transparent)]">
        <span className="text-[0.6rem] text-[color:var(--ash)] tracking-[0.16em] uppercase">
          {nivelLabels[nivel]}
        </span>
        <span className="text-[0.65rem] tracking-[0.18em] uppercase text-[color:var(--gold)] flex items-center gap-1">
          Leer más
          <BookOpen className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}
