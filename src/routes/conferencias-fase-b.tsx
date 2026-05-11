import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { conferenciasFaseBQuery, FILTER_TYPES_FASE_B, normalize } from "@/lib/cr/queries";
import { useReveal } from "@/components/cr/Reveal";
import type { ConferenciaFaseB } from "@/lib/cr/types";
import { Search, BookOpen } from "lucide-react";

export const Route = createFileRoute("/conferencias-fase-b")({
  head: () => ({
    meta: [
      { title: "Fase B — 25 Conferencias Esotéricas — Conciencia Revolucionaria" },
      { name: "description", content: "25 conferencias prácticas de profundización esotérica: desdoblamiento astral, chakras, iniciación, símbolos sagrados y más." },
      { property: "og:title", content: "Fase B — Conferencias de Profundización" },
      { property: "og:description", content: "25 lecciones avanzadas para el trabajo esotérico serio." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(conferenciasFaseBQuery()),
  component: ConferenciasFaseBPage,
});

function ConferenciasFaseBPage() {
  const ref = useReveal();
  const { data: conferencias } = useSuspenseQuery(conferenciasFaseBQuery());
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState("todas");

  const filtered = useMemo(() => {
    let list = conferencias.slice();
    
    // Filtro por tipo
    if (typeFilter !== "todas") {
      list = list.filter(c => c.type === typeFilter);
    }
    
    // Búsqueda por título
    if (q) {
      const nq = normalize(q);
      list = list.filter(c => 
        normalize(c.title).includes(nq) || 
        normalize(c.summary).includes(nq)
      );
    }
    
    return list.sort((a, b) => a.number - b.number);
  }, [conferencias, q, typeFilter]);

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      practica: "Práctica",
      doctrina: "Doctrina",
      simbolo: "Símbolo",
      iniciacion: "Iniciación",
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      practica: "border-[color:var(--gold)] text-[color:var(--gold2)]",
      doctrina: "border-[color:var(--bone)] text-[color:var(--bone)]",
      simbolo: "border-[color-mix(in_oklab,var(--gold)_60%,var(--bone))] text-[color-mix(in_oklab,var(--gold)_80%,var(--bone))]",
      iniciacion: "border-[color-mix(in_oklab,var(--ember)_50%,var(--gold))] text-[color:var(--gold)]",
    };
    return colors[type] || "";
  };

  return (
    <div ref={ref} className="pt-32 pb-20">
      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-6 md:px-10 mb-16">
        <div className="cr-halo" style={{ inset: "-20% 20%", height: "120%", opacity: 0.4 }} />
        <div className="relative text-center">
          <div className="cr-eyebrow cr-reveal">Segunda etapa del trabajo</div>
          <h1 className="cr-display text-5xl md:text-7xl mt-4 cr-reveal">
            Fase <span className="cr-shimmer">B</span>
          </h1>
          <p className="mt-6 text-lg text-[color:var(--ash)] max-w-2xl mx-auto cr-reveal leading-relaxed">
            25 conferencias de profundización esotérica para quienes han completado 
            los fundamentos y desean avanzar en el camino del autoconocimiento.
          </p>
          <div className="mt-4 text-[color:var(--gold)] cr-reveal text-sm tracking-[0.2em] uppercase">
            Práctica · Doctrina · Símbolo · Iniciación
          </div>
        </div>
      </section>

      {/* CONTROLES */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 mb-10">
        <div className="cr-luxury-border rounded-2xl p-5 md:p-6 cr-glass">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Buscador */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--ash)]" />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Buscar por título o contenido..."
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
          
          {/* Filtros por tipo */}
          <div className="mt-5 flex flex-wrap gap-2">
            {FILTER_TYPES_FASE_B.map(f => (
              <button 
                key={f.id} 
                onClick={() => setTypeFilter(f.id)}
                className={`text-[0.65rem] tracking-[0.16em] uppercase px-4 py-2 rounded-full border transition ${
                  typeFilter === f.id 
                    ? "bg-[color:var(--gold)] text-[color:var(--ink)] border-[color:var(--gold)]" 
                    : "border-[color-mix(in_oklab,var(--gold)_25%,transparent)] hover:border-[color:var(--gold)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          
          <div className="mt-4 text-xs text-[color:var(--ash)] tracking-[0.16em] uppercase">
            {filtered.length} de 25 conferencias
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section className="mx-auto max-w-7xl px-6 md:px-10">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="cr-eyebrow">Silencio</div>
            <h3 className="cr-display text-3xl mt-3">Ninguna conferencia coincide</h3>
            <p className="mt-3 text-[color:var(--ash)]">Prueba con otro término o limpia el filtro.</p>
            <button 
              onClick={() => { setQ(""); setTypeFilter("todas"); }} 
              className="cr-btn cr-btn-gold mt-6"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => (
              <ConferenciaCard 
                key={c.id} 
                conferencia={c} 
                typeLabel={getTypeLabel(c.type)}
                typeColor={getTypeColor(c.type)}
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
  conferencia: ConferenciaFaseB;
  typeLabel: string;
  typeColor: string;
  delay: number;
}

function ConferenciaCard({ conferencia, typeLabel, typeColor, delay }: ConferenciaCardProps) {
  return (
    <Link 
      to="/conferencia-fase-b/$id" 
      params={{ id: conferencia.id }} 
      className="cr-card cr-reveal block group h-full"
      style={{ transitionDelay: `${(delay % 9) * 50}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="cr-eyebrow text-[color:var(--gold)]">
          Conf. {String(conferencia.number).padStart(2, "0")}
        </span>
        <span className={`text-[0.6rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border ${typeColor}`}>
          {typeLabel}
        </span>
      </div>
      
      <h3 className="font-display text-xl mb-3 leading-snug group-hover:text-[color:var(--gold2)] transition">
        {conferencia.title}
      </h3>
      
      <p className="text-sm text-[color:var(--ash)] leading-relaxed line-clamp-3 mb-4">
        {conferencia.summary}
      </p>
      
      <div className="mt-auto flex items-center justify-between">
        <span className="text-[0.65rem] tracking-[0.18em] uppercase text-[color:var(--gold)]">
          Leer conferencia →
        </span>
        <BookOpen className="w-4 h-4 text-[color:var(--ash)] opacity-50 group-hover:opacity-100 transition" />
      </div>
    </Link>
  );
}
