import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/components/cr/Reveal";
import { SOCIAL } from "@/lib/cr/queries";
import { MapPin, Monitor, Users, MessageCircle, Video, Clock, ArrowRight, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/salas")({
  head: () => ({
    meta: [
      { title: "Salas de estudio — Conciencia Revolucionaria" },
      { name: "description", content: "Encuentra una sala de estudio presencial cerca de ti o conecta con el curso online. Grupos de WhatsApp y transmisiones en vivo." },
      { property: "og:title", content: "Salas de estudio y curso online" },
      { property: "og:description", content: "Salas presenciales y curso online de Conciencia Revolucionaria." },
    ],
  }),
  component: SalasPage,
});

const OPTIONS = [
  {
    id: "presencial",
    icon: MapPin,
    title: "Salas Presenciales",
    description: "Asiste a una sala de estudio en tu ciudad. Encuentra compañeros de camino y recibe orientación directa.",
    features: [
      "Ambiente propicio para la meditación",
      "Compañeros de estudio serios",
      "Orientación de instructores experimentados",
      "Prácticas grupales de concentración",
    ],
    cta: "Ver ubicaciones",
    ctaLink: SOCIAL.whatsappGroup,
    external: true,
  },
  {
    id: "online",
    icon: Monitor,
    title: "Curso Online",
    description: "Sigue el curso completo desde cualquier lugar. Accede a las 75 conferencias y materiales de estudio.",
    features: [
      "75 conferencias en video",
      "Material de estudio descargable",
      "Foro de discusión y dudas",
      "Horarios flexibles",
    ],
    cta: "Empezar curso online",
    ctaLink: "/conferencias-fase-a",
    external: false,
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    title: "Grupo de WhatsApp",
    description: "Únete a la comunidad activa de estudiantes. Recibe recordatorios, comparte experiencias y resuelve dudas.",
    features: [
      "Comunidad de estudiantes activos",
      "Recordatorios de prácticas",
      "Compartir experiencias",
      "Apoyo mutuo en el camino",
    ],
    cta: "Unirse al grupo",
    ctaLink: SOCIAL.whatsappGroup,
    external: true,
  },
  {
    id: "youtube",
    icon: Video,
    title: "YouTube en Vivo",
    description: "Sigue las transmisiones en vivo y accede al archivo completo de conferencias grabadas.",
    features: [
      "Transmisiones en vivo",
      "Archivo completo de conferencias",
      "Notificaciones de nuevos videos",
      "Playlist organizadas por fases",
    ],
    cta: "Suscribirse en YouTube",
    ctaLink: SOCIAL.youtube,
    external: true,
  },
];

const SCHEDULE_INFO = [
  {
    day: "Lunes",
    time: "7:00 PM",
    activity: "Conferencia y práctica",
  },
  {
    day: "Miércoles",
    time: "7:00 PM",
    activity: "Conferencia y práctica",
  },
  {
    day: "Viernes",
    time: "7:00 PM",
    activity: "Conferencia y práctica",
  },
  {
    day: "Sábado",
    time: "10:00 AM",
    activity: "Práctica extendida",
  },
];

function SalasPage() {
  const ref = useReveal();

  return (
    <div ref={ref} className="pt-24 sm:pt-32 pb-20 overflow-hidden">
      {/* HERO */}
      <section className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center mb-16 md:mb-20">
        <div className="cr-halo" style={{ inset: "-30% 10%", height: "140%", opacity: 0.4 }} />
        <div className="relative">
          <div className="cr-eyebrow cr-reveal">Formas de participar</div>
          <h1 className="cr-display text-[clamp(2.5rem,1.5rem+8vw,5.5rem)] mt-6 cr-reveal leading-[1.1] balance-text">
            Salas <span className="cr-shimmer">presenciales</span>
            <br />
            <span className="cr-gold-text italic font-light">y curso online</span>
          </h1>
          <p className="mt-8 text-sm sm:text-base md:text-xl text-[color:var(--ash)] max-w-2xl mx-auto cr-reveal leading-relaxed opacity-90">
            Elige la forma de participar que mejor se adapte a tu situación. 
            Todas las vías llevan al mismo conocimiento.
          </p>
        </div>
      </section>

      {/* OPTIONS GRID */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10 mb-20 md:mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {OPTIONS.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <div
                key={opt.id}
                className="cr-luxury-border rounded-2xl p-7 sm:p-8 md:p-10 cr-glass cr-reveal flex flex-col shadow-xl"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[color-mix(in_oklab,var(--gold)_12%,transparent)] border border-[color-mix(in_oklab,var(--gold)_20%,transparent)] flex items-center justify-center shrink-0 shadow-inner">
                    <Icon className="w-7 h-7 text-[color:var(--gold)]" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl leading-tight">{opt.title}</h2>
                    <p className="mt-3 text-sm text-[color:var(--ash)] leading-relaxed opacity-90">
                      {opt.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {opt.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-[color:var(--bone)] opacity-80">
                      <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold)] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4">
                  {opt.external ? (
                    <a
                      href={opt.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cr-btn cr-btn-gold w-full justify-center min-h-[52px] shadow-lg shadow-[var(--gold)]/10"
                    >
                      <span>{opt.cta}</span>
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  ) : (
                    <Link to={opt.ctaLink} className="cr-btn cr-btn-gold w-full justify-center min-h-[52px] shadow-lg shadow-[var(--gold)]/10">
                      <span>{opt.cta}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 md:px-10 mb-20 md:mb-24">
        <div className="cr-luxury-border rounded-2xl p-7 sm:p-10 md:p-12 cr-glass cr-reveal shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[color-mix(in_oklab,var(--gold)_12%,transparent)] border border-[color-mix(in_oklab,var(--gold)_20%,transparent)] flex items-center justify-center">
              <Clock className="w-6 h-6 text-[color:var(--gold)]" />
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl leading-tight">Horarios de actividades</h2>
              <p className="text-sm text-[color:var(--ash)] mt-2 opacity-90">
                Sincroniza tu ritmo con el estudio grupal.
              </p>
            </div>
          </div>
          
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {SCHEDULE_INFO.map((item) => (
              <div key={item.day} className="p-5 rounded-2xl bg-[color-mix(in_oklab,var(--void)_60%,transparent)] border border-[color-mix(in_oklab,var(--gold)_10%,transparent)] group hover:border-[color:var(--gold)] transition-colors duration-300">
                <div className="font-display text-xl text-[color:var(--gold)] group-hover:text-[color:var(--gold2)] transition-colors">{item.day}</div>
                <div className="text-sm font-semibold text-[color:var(--bone)] mt-2">{item.time}</div>
                <div className="text-xs text-[color:var(--ash)] mt-1 opacity-80">{item.activity}</div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-[color:var(--ash)] text-center italic opacity-60">
            * Los horarios pueden variar según la sala. Confirma siempre en el grupo de WhatsApp.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 text-center pb-12">
        <div className="cr-divider mb-12 opacity-30" />
        <div className="cr-eyebrow mb-4">Primer paso</div>
        <h2 className="cr-display text-3xl sm:text-4xl md:text-5xl mt-3 cr-reveal balance-text">¿Listo para comenzar?</h2>
        <p className="mt-6 text-sm sm:text-base text-[color:var(--ash)] leading-relaxed max-w-xl mx-auto mb-10">
          La Conferencia 01 es el umbral. Escúchala y descubre si este camino resuena contigo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <Link to="/conferencia/$id" params={{ id: "fase-a-01" }} className="cr-btn cr-btn-gold min-h-[52px] flex items-center justify-center">
            <span>Ver Conferencia 01</span>
          </Link>
          <a
            href={SOCIAL.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="cr-btn cr-btn-ghost min-h-[52px] flex items-center justify-center"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            <span>Unirse al grupo</span>
          </a>
        </div>
      </section>
    </div>
  );
}
