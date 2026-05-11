import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { conferenciasQuery, SOCIAL } from "@/lib/cr/queries";
import { useReveal } from "@/components/cr/Reveal";
import { SectionHeader, PillarCard, FAQAccordion } from "@/components/cr";
import { MapPin, Monitor, BookOpen, Video, Smartphone, Search, ArrowRight, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Conciencia Revolucionaria — Conócete a ti mismo" },
      { name: "description", content: "Curso práctico y gratuito de 75 conferencias para despertar la conciencia. Auto-observación, comprensión y práctica interior." },
      { property: "og:title", content: "Conciencia Revolucionaria — Conócete a ti mismo" },
      { property: "og:description", content: "Curso práctico y gratuito para despertar la conciencia." },
      { property: "og:image", content: "/assets/logo/logo.png" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(conferenciasQuery()),
  component: HomePage,
});

const PILLARS = [
  { name: "Ciencia", text: "Observación rigurosa de los procesos internos y las leyes que rigen la psique humana." },
  { name: "Arte", text: "La transformación interior como obra creativa que esculpe el Ser sobre sí mismo." },
  { name: "Psicología", text: "Estudio práctico de la conciencia, los agregados psicológicos y la liberación interior." },
  { name: "Mística", text: "Experiencia directa de lo sagrado, la trascendencia y la unión con lo divino." },
];

const PRACTICES = [
  { name: "Auto-observación", desc: "Mirar sin juzgar lo que ocurre dentro de nosotros mismos." },
  { name: "Concentración", desc: "Fijar la atención en un punto para desarrollar voluntad y discernimiento." },
  { name: "Relajación", desc: "Liberar tensiones físicas y psíquicas para permitir el fluir de la energía." },
  { name: "Meditación", desc: "Silenciar la mente para escuchar la voz del Ser interior." },
  { name: "Viaje astral", desc: "Desdoblamiento consciente para explorar dimensiones superiores del ser." },
];

const RESOURCES = [
  { icon: MapPin, title: "Salas presenciales", desc: "Encuentros grupales en diferentes ciudades para practicar juntos.", cta: "Buscar sala", href: "#salas" },
  { icon: Monitor, title: "Curso online", desc: "Accede a las 75 conferencias desde cualquier lugar del mundo.", cta: "Estudiar online", href: "/conferencias-fase-a" },
  { icon: Video, title: "Videos", desc: "Conferencias completas, meditaciones guiadas y cápsulas de práctica.", cta: "Ver videos", href: SOCIAL.youtube },
  { icon: BookOpen, title: "Libros", desc: "Biblioteca completa con textos fundamentales y estudios especializados.", cta: "Ver biblioteca", href: "/conferencias-fase-a" },
  { icon: Smartphone, title: "App", desc: "Lleva la práctica contigo. Próximamente disponible.", cta: "Próximamente", href: "#", disabled: true },
];

const FAQ_ITEMS = [
  { question: "¿Es gratuito?", answer: "Sí. Las 75 conferencias son de entrada libre y gratuita. El conocimiento debe ser libre como el aire." },
  { question: "¿Necesito experiencia previa?", answer: "No. El curso comienza desde cero. Solo necesitas sinceridad, esfuerzo y voluntad de cambiar." },
  { question: "¿Por dónde comienzo?", answer: "Por la Conferencia 01 de la Fase A. Es el umbral que introduce los fundamentos del trabajo." },
  { question: "¿Hay salas presenciales?", answer: "Sí. Grupos de estudio se reúnen regularmente en diversas ciudades. Contáctanos para encontrar la más cercana." },
  { question: "¿Puedo estudiar online?", answer: "Absolutamente. Todo el contenido está disponible en esta web y en nuestro canal de YouTube." },
];

function HomePage() {
  const ref = useReveal();
  const { data: confs } = useSuspenseQuery(conferenciasQuery());

  const countA = confs?.filter(c => c.phase === "A").length ?? 50;
  const countB = confs?.filter(c => c.phase === "B").length ?? 25;

  return (
    <div ref={ref}>
      {/* 1. HERO */}
      <section className="relative min-h-[85svh] flex items-center justify-center overflow-hidden pt-20 pb-12">
        <div className="cr-halo" style={{ inset: "10% 20%", borderRadius: "9999px" }} />
        <div className="cr-orb" style={{ width: 420, height: 420, top: "15%", left: "10%" }} />
        <div className="cr-orb" style={{ width: 320, height: 320, bottom: "15%", right: "15%", opacity: 0.5 }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center text-center">
          <div className="cr-halo" style={{ inset: "-20% 10%", height: "140%", opacity: 0.4 }} />
          <div className="relative w-full max-w-4xl">
            <div className="cr-eyebrow cr-reveal">El Conocimiento de Sí Mismo</div>
            <h1 className="cr-display text-[clamp(2.5rem,1.5rem+8vw,5.5rem)] mt-6 cr-reveal leading-[1.1] tracking-tight">
              <span className="cr-shimmer">Conciencia</span>
              <br />
              <span className="cr-gold-text italic font-light">Revolucionaria</span>
            </h1>
            
            <p className="mt-8 text-sm sm:text-base md:text-xl text-[color:var(--ash)] max-w-2xl mx-auto cr-reveal leading-relaxed line-clamp-3 sm:line-clamp-none">
              Un curso práctico y gratuito para despertar la conciencia a través de la auto-observación, 
              la comprensión y la práctica interior.
            </p>
            
            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row justify-center gap-4 cr-reveal w-full sm:w-auto px-4 sm:px-0">
              <Link to="/como-empezar" className="cr-btn cr-btn-gold w-full sm:w-auto min-h-[48px]">
                Empezar Fase A
              </Link>
              <Link to="/conferencias-fase-a" className="cr-btn cr-btn-ghost w-full sm:w-auto min-h-[48px]">
                <Monitor className="w-4 h-4 mr-2 shrink-0" />
                <span>Curso online</span>
              </Link>
              <a href="#salas" className="cr-btn cr-btn-ghost w-full sm:w-auto min-h-[48px]">
                <MapPin className="w-4 h-4 mr-2 shrink-0" />
                <span>Buscar sala</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUÉ ES ESTE CONOCIMIENTO */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 md:px-10 py-20 md:py-24">
        <div className="cr-luxury-border rounded-2xl p-7 sm:p-10 md:p-12 cr-glass cr-reveal shadow-2xl">
          <div className="cr-eyebrow text-[color:var(--gold)] mb-6">Qué es este conocimiento</div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-6 leading-tight">Un camino hacia el ser</h2>
          <p className="text-[color:var(--bone)] leading-relaxed text-base sm:text-lg opacity-90">
            Este es un curso de <strong className="text-[color:var(--gold2)]">75 conferencias gratuitas</strong> de entrada libre, 
            diseñado para quienes buscan despertar la conciencia y transformar su vida interior. 
            No es una religión ni una filosofía abstracta: es un <strong>método práctico</strong> basado en la auto-observación, 
            la eliminación de defectos psicológicos y el desarrollo de los sentidos superiores. 
            Dividido en dos fases —A y B— guía al estudiante desde los fundamentos hasta la profundización en el trabajo esotérico. 
            Cada conferencia es una invitación a conocerse a sí mismo y a experimentar directamente la realidad del Ser.
          </p>
        </div>
      </section>

      {/* 3. LOS CUATRO PILARES */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="cr-halo" style={{ inset: "20% 30%", opacity: 0.3 }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
          <SectionHeader
            eyebrow="Fundamentos"
            title="Los cuatro pilares"
            subtitle="Cuatro dimensiones que sustentan el trabajo interior."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12">
            {PILLARS.map((p, i) => (
              <PillarCard
                key={p.name}
                number={String(i + 1).padStart(2, "0")}
                title={p.name}
                description={p.text}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. RUTA DE APRENDIZAJE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 py-20 md:py-24">
        <SectionHeader
          eyebrow="El sendero"
          title="Ruta de aprendizaje"
          subtitle="Dos fases que guían el desarrollo progresivo de la conciencia."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12">
          {/* Fase A */}
          <div className="cr-card cr-reveal relative overflow-hidden p-7 sm:p-8 md:p-10 flex flex-col h-full group">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
              <BookOpen className="w-32 h-32 md:w-40 md:h-32" />
            </div>
            <div className="cr-eyebrow text-[color:var(--gold)] mb-4">Primera etapa</div>
            <h3 className="font-display text-2xl sm:text-3xl mb-6">Fase A</h3>
            <p className="text-sm sm:text-base text-[color:var(--bone)] mb-8 leading-relaxed opacity-90 flex-1">
              <strong>{countA} conferencias</strong> fundamentales que establecen las bases del Conocimiento de Sí Mismo. 
              Temas esenciales: auto-observación, meditación, leyes del karma, mundo astral y los tres factores de la revolución de la conciencia.
            </p>
            <Link to="/conferencias-fase-a" className="cr-btn cr-btn-gold w-full sm:w-auto justify-center min-h-[48px]">
              <span>Explorar Fase A</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          {/* Fase B */}
          <div className="cr-card cr-reveal relative overflow-hidden p-7 sm:p-8 md:p-10 flex flex-col h-full group" style={{ transitionDelay: "80ms" }}>
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
              <Search className="w-32 h-32 md:w-40 md:h-32" />
            </div>
            <div className="cr-eyebrow text-[color:var(--gold)] mb-4">Segunda etapa</div>
            <h3 className="font-display text-2xl sm:text-3xl mb-6">Fase B</h3>
            <p className="text-sm sm:text-base text-[color:var(--bone)] mb-8 leading-relaxed opacity-90 flex-1">
              <strong>{countB} conferencias</strong> de profundización práctica. Se abordan técnicas avanzadas de meditación, 
              el desdoblamiento astral consciente, el trabajo con la kundalini y la trascendencia del ego.
            </p>
            <Link to="/conferencias-fase-b" className="cr-btn cr-btn-ghost w-full sm:w-auto justify-center min-h-[48px]">
              <span>Explorar Fase B</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. PRÁCTICAS ESENCIALES */}
      <section className="relative py-20 md:py-24 overflow-hidden bg-[color-mix(in_oklab,var(--gold)_3%,transparent)]">
        <div className="cr-orb" style={{ width: 500, height: 500, top: "10%", right: "-15%", opacity: 0.4 }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
          <SectionHeader
            eyebrow="Disciplinas"
            title="Prácticas esenciales"
            subtitle="Cinco ejercicios fundamentales que desarrollan los sentidos superiores."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-12">
            {PRACTICES.map((p, i) => (
              <div key={p.name} className="cr-card cr-reveal p-6 sm:p-8" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="w-10 h-10 rounded-xl bg-[color-mix(in_oklab,var(--gold)_12%,transparent)] flex items-center justify-center border border-[color-mix(in_oklab,var(--gold)_20%,transparent)] mb-5">
                  <span className="font-display text-[color:var(--gold)]">0{i + 1}</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl mb-3 leading-tight">{p.name}</h3>
                <p className="text-sm sm:text-base text-[color:var(--ash)] leading-relaxed opacity-90">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ASISTE O ESTUDIA ONLINE */}
      <section id="salas" className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 py-20 md:py-24">
        <SectionHeader
          eyebrow="Formas de participar"
          title="Asiste o estudia online"
          subtitle="Múltiples caminos para acceder al conocimiento. Elige el que mejor se adapte a tu situación."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-12">
          {RESOURCES.map((r, i) => (
            <a 
              key={r.title} 
              href={r.href}
              className={`cr-card cr-reveal block group p-6 sm:p-8 ${r.disabled ? 'opacity-60 pointer-events-none' : ''}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-5">
                <div className="p-3.5 rounded-xl bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] border border-[color-mix(in_oklab,var(--gold)_15%,transparent)] group-hover:bg-[color:var(--gold)] group-hover:text-[color:var(--ink)] transition-colors duration-300">
                  <r.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl sm:text-2xl mb-2 group-hover:text-[color:var(--gold2)] transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-sm text-[color:var(--ash)] leading-relaxed mb-4 opacity-90">{r.desc}</p>
                  <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[color:var(--gold)] font-bold">
                    {r.cta} →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 7. FAQ BREVE */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 md:px-10 py-20 md:py-24">
        <SectionHeader
          eyebrow="Preguntas frecuentes"
          title="Dudas comunes"
        />
        <div className="mt-12">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-24 md:py-32 overflow-hidden border-t border-[color-mix(in_oklab,var(--gold)_10%,transparent)]">
        <div className="cr-halo" style={{ inset: "20% 25%" }} />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <div className="cr-eyebrow cr-reveal mb-6">Comienza hoy</div>
          <h2 className="cr-display text-[clamp(2.25rem,1.5rem+6vw,4rem)] mb-8 cr-reveal balance-text leading-[1.1]">
            El primer paso es <span className="cr-gold-text italic font-light">conocerte</span>
          </h2>
          <p className="mt-8 text-sm sm:text-base md:text-lg text-[color:var(--ash)] cr-reveal max-w-xl mx-auto leading-relaxed opacity-90">
            No se necesita nada especial para empezar. Solo la voluntad sincera de cambiar y el esfuerzo consciente de practicar.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 cr-reveal px-4">
            <Link to="/conferencia/$id" params={{ id: "fase-a-01" }} className="cr-btn cr-btn-gold min-h-[52px] flex items-center justify-center text-base">
              <span>Comenzar Conferencia 01</span>
            </Link>
            <a href={SOCIAL.whatsappGroup} target="_blank" rel="noreferrer" className="cr-btn cr-btn-ghost min-h-[52px] flex items-center justify-center text-base">
              <MessageCircle className="w-4 h-4 mr-2" />
              <span>Unirse al grupo</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
