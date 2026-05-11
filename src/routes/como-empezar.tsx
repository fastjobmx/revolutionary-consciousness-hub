import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/components/cr/Reveal";
import { SOCIAL } from "@/lib/cr/queries";
import { Play, MapPin, Monitor, Users, BookOpen, ArrowRight, Eye, Brain, Heart, Compass, Sparkles } from "lucide-react";

export const Route = createFileRoute("/como-empezar")({
  head: () => ({
    meta: [
      { title: "Cómo empezar el curso — Conciencia Revolucionaria" },
      { name: "description", content: "Guía paso a paso para comenzar el curso de 75 conferencias gratuitas. Fase A y Fase B: auto-observación, meditación y trabajo interior." },
      { property: "og:title", content: "Cómo empezar el curso" },
      { property: "og:description", content: "Tu primer paso hacia el Conocimiento de Sí Mismo." },
    ],
  }),
  component: ComoEmpezarPage,
});

const STEPS = [
  {
    number: "01",
    title: "Ver la Conferencia 1",
    description: "Todo comienza con una sola conferencia. La primera lección introduce los fundamentos del Conocimiento de Sí Mismo y los objetivos del trabajo. No es necesario entenderlo todo de inmediato; lo importante es abrirse a escuchar con atención.",
    icon: Play,
  },
  {
    number: "02",
    title: "Practicar auto-observación",
    description: "Durante el día, dedica momentos a observarte a ti mismo. Nota tus pensamientos, emociones y reacciones sin juzgarlos. Esta práctica sencilla pero poderosa te ayuda a conocer cómo funciona tu propia mente.",
    icon: Eye,
  },
  {
    number: "03",
    title: "Practicar concentración y relajación",
    description: "Reserva unos minutos al día para calmar la mente y centrar la atención. La concentración desarrolla la voluntad interior; la relajación permite que la energía fluya libremente por tu cuerpo.",
    icon: Brain,
  },
  {
    number: "04",
    title: "Asistir a una sala o tomar el curso online",
    description: "No tienes que hacer este camino solo. Puedes unirte a una sala de estudio presencial en tu ciudad o seguir el curso completamente online desde casa. Ambas opciones son válidas.",
    icon: Users,
  },
  {
    number: "05",
    title: "Continuar con Fase A y luego Fase B",
    description: "El curso consta de 75 conferencias divididas en dos etapas: Fase A (50 conferencias fundamentales) y Fase B (25 conferencias de profundización). Ve a tu propio ritmo, pero procura ser constante.",
    icon: Compass,
  },
];

function ComoEmpezarPage() {
  const ref = useReveal();

  return (
    <div ref={ref} className="pt-32 pb-20">
      {/* HERO */}
      <section className="relative mx-auto max-w-4xl px-6 text-center mb-20">
        <div className="cr-halo" style={{ inset: "-30% 10%", height: "140%", opacity: 0.4 }} />
        <div className="relative">
          <div className="cr-eyebrow cr-reveal">Guía para nuevos estudiantes</div>
          <h1 className="cr-display text-5xl md:text-7xl mt-6 cr-reveal leading-[1.05]">
            Cómo <span className="cr-shimmer">empezar</span>
            <br />
            <span className="cr-gold-text italic font-light">el curso</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-[color:var(--ash)] max-w-2xl mx-auto cr-reveal leading-relaxed">
            Un camino de <strong className="text-[color:var(--bone)]">75 conferencias gratuitas</strong> diseñado para quienes 
            sienten el llamado interior de conocerse a sí mismos.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 cr-reveal">
            <span className="text-[0.7rem] tracking-[0.18em] uppercase px-4 py-2 rounded-full border border-[color:var(--gold)] text-[color:var(--gold)]">
              Fase A: 50 conferencias
            </span>
            <span className="text-[0.7rem] tracking-[0.18em] uppercase px-4 py-2 rounded-full border border-[color-mix(in_oklab,var(--gold)_60%,var(--bone))] text-[color:var(--bone)]">
              Fase B: 25 conferencias
            </span>
          </div>
        </div>
      </section>

      {/* INTRODUCCIÓN */}
      <section className="mx-auto max-w-4xl px-6 md:px-10 mb-24">
        <div className="cr-luxury-border rounded-2xl p-8 md:p-12 cr-glass cr-reveal">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-[color-mix(in_oklab,var(--gold)_15%,transparent)]">
              <Sparkles className="w-6 h-6 text-[color:var(--gold)]" />
            </div>
            <div className="cr-eyebrow text-[color:var(--gold)]">Recomendación práctica</div>
          </div>
          <h2 className="font-display text-2xl md:text-3xl mb-4">Un ritmo sostenible</h2>
          <p className="text-[color:var(--bone)] leading-relaxed text-lg mb-6">
            Te sugerimos estudiar <strong className="text-[color:var(--gold2)]">dos conferencias por semana</strong>. 
            Este ritmo te permite dedicar tiempo a reflexionar sobre lo aprendido y, lo más importante, 
            <strong> llevarlo a la práctica</strong> durante tu día a día.
          </p>
          <p className="text-[color:var(--ash)] leading-relaxed">
            No se trata de acumular información, sino de transformar. Cada conferencia es una invitación 
            a observar tu propia vida interior con mayor claridad. La constancia vale más que la velocidad.
          </p>
        </div>
      </section>

      {/* PASOS */}
      <section className="mx-auto max-w-6xl px-6 md:px-10 mb-24">
        <div className="text-center mb-16">
          <div className="cr-eyebrow cr-reveal">El camino paso a paso</div>
          <h2 className="cr-display text-4xl md:text-5xl mt-4 cr-reveal">Cinco pasos para comenzar</h2>
        </div>

        <div className="space-y-6">
          {STEPS.map((step, i) => (
            <div 
              key={step.number} 
              className="cr-card cr-reveal flex flex-col md:flex-row gap-6 md:gap-8"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Número e icono */}
              <div className="flex md:flex-col items-center md:items-start gap-4 md:w-48 shrink-0">
                <div className="font-display text-5xl text-[color:var(--gold)] leading-none">
                  {step.number}
                </div>
                <div className="p-3 rounded-full bg-[color-mix(in_oklab,var(--gold)_10%,transparent)]">
                  <step.icon className="w-5 h-5 text-[color:var(--gold)]" />
                </div>
              </div>
              
              {/* Contenido */}
              <div className="flex-1">
                <h3 className="font-display text-xl md:text-2xl mb-3">{step.title}</h3>
                <p className="text-[color:var(--ash)] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTONES DE ACCIÓN */}
      <section className="relative py-24 overflow-hidden">
        <div className="cr-halo" style={{ inset: "20% 25%" }} />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="cr-eyebrow cr-reveal mb-6">Da tu primer paso hoy</div>
          <h2 className="cr-display text-4xl md:text-5xl mb-8 cr-reveal">
            El momento es <span className="cr-gold-text italic">ahora</span>
          </h2>
          <p className="text-[color:var(--ash)] max-w-xl mx-auto mb-10 cr-reveal">
            No necesitas preparación especial. Solo la voluntad sincera de conocerte 
            y el compromiso de practicar lo que aprendas.
          </p>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto cr-reveal">
            <Link 
              to="/conferencia/$id" 
              params={{ id: "fase-a-01" }}
              className="cr-btn cr-btn-gold flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Empezar Conferencia 1
            </Link>
            
            <a 
              href="#salas"
              className="cr-btn cr-btn-ghost flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Buscar sala
            </a>
            
            <a 
              href={SOCIAL.youtube}
              target="_blank"
              rel="noreferrer"
              className="cr-btn cr-btn-ghost flex items-center justify-center gap-2"
            >
              <Monitor className="w-4 h-4" />
              Curso en YouTube
            </a>
            
            <Link 
              to="/yoes"
              className="cr-btn cr-btn-ghost flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Estudio de Yoes
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-3xl px-6 text-center mt-16">
        <div className="cr-divider mb-12" />
        <div className="cr-eyebrow mb-4">¿Preguntas?</div>
        <p className="text-[color:var(--ash)] mb-6 leading-relaxed">
          Si tienes dudas sobre cómo comenzar, el ritmo de estudio o cómo encontrar una sala cerca de ti, 
          no dudes en contactarnos. Estamos aquí para acompañar tu camino.
        </p>
        <Link to="/contacto" className="cr-btn cr-btn-gold inline-flex items-center gap-2">
          Contactar la escuela
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
