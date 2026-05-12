import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { yoesQuery } from "@/lib/cr/queries";
import { Sparkles, ArrowRight, Target, Heart, Users } from "lucide-react";
import { useReveal } from "./Reveal";

export function YoesPromo() {
  const ref = useReveal();
  const { data: yoes } = useSuspenseQuery(yoesQuery());

  const featuredYo = useMemo(() => {
    return yoes.find(y => y.featured) || yoes.find(y => y.id === "yo-de-la-ansiedad") || yoes[0];
  }, [yoes]);

  const quickAccess = [
    { 
      id: "yoes-basicos", 
      title: "Yoes básicos", 
      icon: Target,
      desc: "Los defectos más comunes y visibles.",
      filter: "Yoes básicos"
    },
    { 
      id: "emocionales", 
      title: "Yoes emocionales", 
      icon: Heart,
      desc: "Miedo, ira, tristeza y sentimentalismo.",
      filter: "Centro emocional"
    },
    { 
      id: "relaciones", 
      title: "Yoes de relación", 
      icon: Users,
      desc: "Vínculos, apegos y trato con los demás.",
      filter: "Relaciones"
    },
  ];

  if (!featuredYo) return null;

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-[color:var(--void)] border-y border-[color-mix(in_oklab,var(--gold)_10%,transparent)]">
      {/* Subtle Glows */}
      <div className="cr-halo" style={{ inset: "15% 20%", opacity: 0.1 }} />
      <div className="cr-orb" style={{ width: 400, height: 400, top: "0%", right: "-10%", opacity: 0.1 }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        {/* Header Area */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="cr-eyebrow text-[color:var(--gold)] mb-4 cr-reveal">Biblioteca Práctica</div>
          <h2 className="cr-display text-[clamp(2.5rem,2rem+4vw,4rem)] leading-[1.05] mb-6 cr-reveal">
            Estudia un yo <span className="cr-gold-text italic font-light">cada semana</span>
          </h2>
          <p className="text-[color:var(--ash)] text-base sm:text-lg leading-relaxed cr-reveal opacity-90 max-w-2xl">
            Una biblioteca viva diseñada para llevar la auto-observación al diario vivir, 
            comprendiendo los defectos psicológicos paso a paso para lograr su eliminación.
          </p>
        </div>

        {/* 3-Column Desktop Grid / 1-Column Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Column 1: Call to Action & Info */}
          <div className="flex flex-col justify-between p-8 rounded-3xl bg-[color-mix(in_oklab,var(--gold)_3%,transparent)] border border-[color-mix(in_oklab,var(--gold)_10%,transparent)] cr-reveal">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[color:var(--gold)] text-[color:var(--ink)] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl leading-tight">Trabajo sobre <br /><span className="text-[color:var(--gold)]">sí mismo</span></h3>
              <p className="text-sm text-[color:var(--ash)] leading-relaxed opacity-80">
                Cada estudio contiene claves prácticas, puntos de observación y ejercicios para aplicar en el momento presente.
              </p>
            </div>
            
            <div className="mt-10 space-y-4">
              <Link to="/yoes" className="cr-btn cr-btn-gold w-full justify-center min-h-[52px] text-sm">
                Ver Estudios de Yoes
              </Link>
              <Link to="/yoes" className="cr-btn cr-btn-ghost w-full justify-center min-h-[52px] text-sm group">
                Empezar por los yoes básicos
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Column 2: Featured Card (Yo de la semana) */}
          <Link 
            to="/yo/$id" 
            params={{ id: featuredYo.id }}
            className="lg:col-span-1 group relative overflow-hidden rounded-3xl border border-[color:var(--gold)] bg-[color:var(--obsidian)] shadow-2xl shadow-gold/5 cr-reveal flex flex-col h-full"
            style={{ transitionDelay: "100ms" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_oklab,var(--gold)_10%,transparent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="p-8 sm:p-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8">
                <span className="px-2 py-0.5 rounded bg-[color:var(--gold)] text-[color:var(--ink)] text-[0.6rem] font-bold uppercase tracking-widest">Recomendado</span>
                <span className="text-[0.6rem] tracking-[0.1em] uppercase text-[color:var(--ash)] opacity-60">Yo de la semana</span>
              </div>
              
              <h3 className="font-display text-3xl sm:text-4xl mb-6 group-hover:text-[color:var(--gold2)] transition-colors leading-tight">
                {featuredYo.title}
              </h3>
              
              <p className="text-[color:var(--bone)] text-sm sm:text-base leading-relaxed mb-10 opacity-80 line-clamp-4 flex-1">
                {featuredYo.summary}
              </p>
              
              <div className="pt-6 border-t border-[color-mix(in_oklab,var(--gold)_15%,transparent)] flex items-center justify-between">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-[color:var(--gold)]">Estudiar ahora</span>
                <div className="w-10 h-10 rounded-full border border-[color:var(--gold)] flex items-center justify-center text-[color:var(--gold)] group-hover:bg-[color:var(--gold)] group-hover:text-[color:var(--ink)] transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </Link>

          {/* Column 3: Quick Access Points */}
          <div className="flex flex-col gap-4 cr-reveal" style={{ transitionDelay: "200ms" }}>
            {quickAccess.map((item) => (
              <Link
                key={item.id}
                to="/yoes"
                className="cr-card flex-1 p-6 flex items-center gap-5 group hover:border-[color:var(--gold)] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[color-mix(in_oklab,var(--gold)_8%,transparent)] flex items-center justify-center border border-[color-mix(in_oklab,var(--gold)_15%,transparent)] group-hover:bg-[color:var(--gold)] group-hover:text-[color:var(--ink)] transition-all shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-lg group-hover:text-[color:var(--gold2)] transition-colors">{item.title}</h4>
                  <p className="text-[0.65rem] text-[color:var(--ash)] mt-1 opacity-70 line-clamp-1">{item.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[color:var(--ash)] group-hover:text-[color:var(--gold)] group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
