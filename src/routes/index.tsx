import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { conferenciasQuery, SOCIAL } from "@/lib/cr/queries";
import { useReveal } from "@/components/cr/Reveal";
import { SectionHeader, PillarCard, FAQAccordion } from "@/components/cr";
import { MapPin, Monitor, BookOpen, Video, Smartphone, Search } from "lucide-react";

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
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(conferenciasQuery());
  },
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
      <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden pt-24 pb-16">
        <div className="cr-halo" style={{ inset: "10% 20%", borderRadius: "9999px" }} />
        <div className="cr-orb" style={{ width: 420, height: 420, top: "15%", left: "10%" }} />
        <div className="cr-orb" style={{ width: 320, height: 320, bottom: "15%", right: "15%", opacity: 0.5 }} />
        <section className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 min-h-[90svh] flex flex-col items-center justify-center text-center">
          <div className="cr-halo" style={{ inset: "-20% 10%", height: "140%", opacity: 0.4 }} />
          <div className="relative">
            <div className="cr-eyebrow cr-reveal">El Conocimiento de Sí Mismo</div>
            <h1 className="cr-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mt-4 sm:mt-6 cr-reveal leading-[1.05]">
              <span className="cr-shimmer">Conciencia</span>
              <br />
              <span className="cr-gold-text italic font-light">Revolucionaria</span>
            </h1>
            
            <p className="mt-8 text-lg md:text-xl text-[color:var(--ash)] max-w-2xl mx-auto cr-reveal leading-relaxed">
              Un curso práctico y gratuito para despertar la conciencia a través de la auto-observación, 
              la comprensión y la práctica interior.
            </p>
            
            <div className="mt-12 flex flex-wrap justify-center gap-3 md:gap-4 cr-reveal">
              <Link to="/como-empezar" className="cr-btn cr-btn-gold w-full sm:w-auto justify-center">
                Empezar Fase A
              </Link>
              <a href="#salas" className="cr-btn cr-btn-ghost w-full sm:w-auto justify-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Buscar sala cercana</span>
                <span className="sm:hidden">Salas</span>
              </a>
              <Link to="/conferencias-fase-a" className="cr-btn cr-btn-ghost w-full sm:w-auto justify-center">
                <Monitor className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Tomar curso online</span>
                <span className="sm:hidden">Online</span>
              </Link>
            </div>
        </div>
      </section>
      </section>

      {/* 2. QUÉ ES ESTE CONOCIMIENTO */}
      <section className="mx-auto max-w-4xl px-6 md:px-10 py-24">
        <div className="cr-luxury-border rounded-2xl p-8 md:p-12 cr-glass cr-reveal">
          <div className="cr-eyebrow mb-4">Qué es este conocimiento</div>
          <h2 className="cr-display text-3xl md:text-4xl mb-6">Un camino hacia el ser</h2>
          <p className="text-[color:var(--bone)] leading-relaxed text-lg">
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
      <section className="relative py-24 overflow-hidden">
        <div className="cr-halo" style={{ inset: "20% 30%", opacity: 0.3 }} />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeader
            eyebrow="Fundamentos"
            title="Los cuatro pilares"
            subtitle="Cuatro dimensiones que sustentan el trabajo interior."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-24">
        <SectionHeader
          eyebrow="El sendero"
          title="Ruta de aprendizaje"
          subtitle="Dos fases que guían el desarrollo progresivo de la conciencia."
        />
        <div className="grid gap-8 md:grid-cols-2">
          {/* Fase A */}
          <div className="cr-card cr-reveal relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BookOpen className="w-24 h-24" />
            </div>
            <div className="cr-eyebrow text-[color:var(--gold)] mb-2">Primera etapa</div>
            <h3 className="font-display text-3xl mb-4">Fase A</h3>
            <p className="text-[color:var(--bone)] mb-4 leading-relaxed">
              <strong>{countA} conferencias</strong> fundamentales que establecen las bases del Conocimiento de Sí Mismo. 
              Temas esenciales: auto-observación, meditación, leyes del karma, mundo astral y los tres factores de la revolución de la conciencia.
            </p>
            <Link to="/conferencias-fase-a" className="cr-btn cr-btn-gold !text-[0.7rem]">
              Explorar Fase A →
            </Link>
          </div>
          {/* Fase B */}
          <div className="cr-card cr-reveal relative overflow-hidden" style={{ transitionDelay: "80ms" }}>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Search className="w-24 h-24" />
            </div>
            <div className="cr-eyebrow text-[color:var(--gold)] mb-2">Segunda etapa</div>
            <h3 className="font-display text-3xl mb-4">Fase B</h3>
            <p className="text-[color:var(--bone)] mb-4 leading-relaxed">
              <strong>{countB} conferencias</strong> de profundización práctica. Se abordan técnicas avanzadas de meditación, 
              el desdoblamiento astral consciente, el trabajo con la kundalini y la trascendencia del ego.
            </p>
            <Link to="/conferencias-fase-b" className="cr-btn cr-btn-ghost !text-[0.7rem]">
              Explorar Fase B →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. PRÁCTICAS ESENCIALES */}
      <section className="relative py-24 overflow-hidden">
        <div className="cr-orb" style={{ width: 500, height: 500, top: "10%", right: "-15%", opacity: 0.4 }} />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeader
            eyebrow="Disciplinas"
            title="Prácticas esenciales"
            subtitle="Cinco ejercicios fundamentales que desarrollan los sentidos superiores."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICES.map((p, i) => (
              <div key={p.name} className="cr-card cr-reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="cr-eyebrow text-[color:var(--gold)] mb-3">Práctica 0{i + 1}</div>
                <h3 className="font-display text-xl mb-2">{p.name}</h3>
                <p className="text-sm text-[color:var(--ash)] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ASISTE O ESTUDIA ONLINE */}
      <section id="salas" className="mx-auto max-w-7xl px-6 md:px-10 py-24">
        <SectionHeader
          eyebrow="Formas de participar"
          title="Asiste o estudia online"
          subtitle="Múltiples caminos para acceder al conocimiento. Elige el que mejor se adapte a tu situación."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r, i) => (
            <a 
              key={r.title} 
              href={r.href}
              className={`cr-card cr-reveal block group ${r.disabled ? 'opacity-60 pointer-events-none' : ''}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[color-mix(in_oklab,var(--gold)_10%,transparent)]">
                  <r.icon className="w-5 h-5 text-[color:var(--gold)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl mb-1 group-hover:text-[color:var(--gold2)] transition">
                    {r.title}
                  </h3>
                  <p className="text-sm text-[color:var(--ash)] leading-relaxed mb-3">{r.desc}</p>
                  <span className="text-[0.7rem] tracking-[0.18em] uppercase text-[color:var(--gold)]">
                    {r.cta} →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 7. FAQ BREVE */}
      <section className="mx-auto max-w-3xl px-6 md:px-10 py-24">
        <SectionHeader
          eyebrow="Preguntas frecuentes"
          title="FAQ"
        />
        <FAQAccordion items={FAQ_ITEMS} />
      </section>

      {/* CTA FINAL */}
      <section className="relative py-24 overflow-hidden">
        <div className="cr-halo" style={{ inset: "20% 25%" }} />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="cr-eyebrow cr-reveal">Comienza hoy</div>
          <h2 className="cr-display text-4xl md:text-5xl mt-4 cr-reveal">
            El primer paso es <span className="cr-gold-text italic">conocerte</span>
          </h2>
          <p className="mt-6 text-[color:var(--ash)] cr-reveal max-w-xl mx-auto">
            No se necesita nada especial para empezar. Solo la voluntad sincera de cambiar y el esfuerzo de practicar.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 cr-reveal">
            <Link to="/conferencia/$id" params={{ id: "fase-a-01" }} className="cr-btn cr-btn-gold">
              Comenzar Conferencia 01
            </Link>
            <a href={SOCIAL.whatsappGroup} target="_blank" rel="noreferrer" className="cr-btn cr-btn-ghost">
              Unirse al grupo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
