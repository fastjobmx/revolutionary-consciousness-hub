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
    <div ref={ref} className="pt-32 pb-20">
      {/* HERO */}
      <section className="relative mx-auto max-w-4xl px-6 text-center mb-20">
        <div className="cr-halo" style={{ inset: "-30% 10%", height: "140%", opacity: 0.4 }} />
        <div className="relative">
          <div className="cr-eyebrow cr-reveal">Formas de participar</div>
          <h1 className="cr-display text-5xl md:text-7xl mt-6 cr-reveal leading-[1.05]">
            Salas <span className="cr-shimmer">presenciales</span>
            <br />
            <span className="cr-gold-text italic font-light">y curso online</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-[color:var(--ash)] max-w-2xl mx-auto cr-reveal leading-relaxed">
            Elige la forma de participar que mejor se adapte a tu situación. 
            Todas las vías llevan al mismo conocimiento.
          </p>
        </div>
      </section>

      {/* OPTIONS GRID */}
      <section className="mx-auto max-w-6xl px-6 md:px-10 mb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {OPTIONS.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <div
                key={opt.id}
                className="cr-luxury-border rounded-2xl p-6 md:p-8 cr-glass cr-reveal flex flex-col"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[color-mix(in_oklab,var(--gold)_15%,transparent)] flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-[color:var(--gold)]" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl">{opt.title}</h2>
                    <p className="mt-2 text-[color:var(--ash)] leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6 flex-grow">
                  {opt.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-[color:var(--bone)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold)]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {opt.external ? (
                  <a
                    href={opt.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cr-btn cr-btn-gold w-full justify-center"
                  >
                    {opt.cta}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                ) : (
                  <Link to={opt.ctaLink} className="cr-btn cr-btn-gold w-full justify-center">
                    {opt.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="mx-auto max-w-4xl px-6 md:px-10 mb-24">
        <div className="cr-luxury-border rounded-2xl p-6 md:p-10 cr-glass cr-reveal">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-[color:var(--gold)]" />
            <h2 className="font-display text-2xl md:text-3xl">Horarios de actividades</h2>
          </div>
          <p className="text-[color:var(--ash)] mb-6">
            Los horarios pueden variar según la sala. Confirma siempre los horarios actuales en el grupo de WhatsApp.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SCHEDULE_INFO.map((item) => (
              <div key={item.day} className="p-4 rounded-xl bg-[color-mix(in_oklab,var(--void)_80%,transparent)]">
                <div className="font-display text-lg text-[color:var(--gold)]">{item.day}</div>
                <div className="text-sm text-[color:var(--bone)] mt-1">{item.time}</div>
                <div className="text-xs text-[color:var(--ash)] mt-1">{item.activity}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 text-center">
        <div className="cr-divider mb-12" />
        <div className="cr-eyebrow">Primer paso</div>
        <h2 className="cr-display text-4xl md:text-5xl mt-3 cr-reveal">¿Listo para comenzar?</h2>
        <p className="mt-5 text-[color:var(--ash)] leading-relaxed max-w-xl mx-auto">
          La Conferencia 01 es el umbral. Escúchala y descubre si este camino resuena contigo.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link to="/conferencia/$id" params={{ id: "fase-a-01" }} className="cr-btn cr-btn-gold">
            Ver Conferencia 01
          </Link>
          <a
            href={SOCIAL.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="cr-btn cr-btn-ghost"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Unirse al grupo
          </a>
        </div>
      </section>
    </div>
  );
}
