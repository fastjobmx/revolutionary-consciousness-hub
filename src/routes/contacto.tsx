import { createFileRoute } from "@tanstack/react-router";
import { SOCIAL } from "@/lib/cr/queries";
import { useReveal } from "@/components/cr/Reveal";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Conciencia Revolucionaria" },
      { name: "description", content: "Únete al grupo de WhatsApp, sigue los canales o escríbenos directamente. La escuela está abierta a quien quiera caminar." },
      { property: "og:title", content: "Contacto — Conciencia Revolucionaria" },
      { property: "og:description", content: "Únete a la comunidad. La escuela está abierta." },
    ],
  }),
  component: ContactoPage,
});

const CHANNELS = [
  { id: "whatsapp", label: "Grupo de WhatsApp", desc: "Comparte con quienes ya recorren el camino. Encuentros, anuncios, práctica colectiva.", href: SOCIAL.whatsappGroup, cta: "Unirme al grupo" },
  { id: "youtube", label: "YouTube", desc: "Conferencias completas, charlas y meditaciones guiadas en video.", href: SOCIAL.youtube, cta: "Ver canal" },
  { id: "instagram", label: "Instagram", desc: "Publicaciones diarias, frases, fragmentos del trabajo interior.", href: SOCIAL.instagram, cta: "Seguir" },
  { id: "tiktok", label: "TikTok", desc: "Cápsulas breves para llevar el trabajo a la vida cotidiana.", href: SOCIAL.tiktok, cta: "Seguir" },
  { id: "facebook", label: "Facebook", desc: "Noticias, eventos y comunidad extendida.", href: SOCIAL.facebook, cta: "Visitar página" },
];

function ContactoPage() {
  const ref = useReveal();
  const wa = `https://wa.me/${SOCIAL.whatsappPhoneRaw.replace("+", "")}`;
  return (
    <div ref={ref} className="pt-32 pb-20">
      <section className="relative mx-auto max-w-4xl px-6 text-center mb-16">
        <div className="cr-halo" style={{ inset: "-30% 10%", height: "140%", opacity: 0.4 }} />
        <div className="relative">
          <div className="cr-eyebrow cr-reveal">Comunidad</div>
          <h1 className="cr-display text-5xl md:text-7xl mt-4 cr-reveal leading-[1.05]">
            La <span className="cr-shimmer">escuela</span> está abierta
          </h1>
          <p className="mt-8 text-[color:var(--ash)] cr-reveal max-w-2xl mx-auto leading-relaxed text-lg">
            Caminar acompañado acelera el trabajo. Únete por el canal que prefieras, escribe directamente o presenta a alguien que esté buscando.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 mb-20">
        <div className="cr-luxury-border rounded-2xl p-8 md:p-10 cr-glass cr-reveal text-center">
          <div className="cr-eyebrow text-[color:var(--gold)]">Contacto directo</div>
          <h2 className="cr-display text-3xl md:text-4xl mt-4">WhatsApp</h2>
          <p className="mt-3 text-[color:var(--ash)]">Para preguntas, orientación o coordinación.</p>
          <a href={wa} target="_blank" rel="noreferrer" className="cr-btn cr-btn-gold mt-8 inline-flex">
            Escribir a {SOCIAL.whatsappPhone}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="cr-eyebrow text-center">Canales</div>
        <h2 className="cr-display text-3xl md:text-4xl text-center mt-3 cr-reveal">Síguenos donde estés</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <a key={c.id} href={c.href} target="_blank" rel="noreferrer" className="cr-card cr-reveal flex flex-col" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="cr-eyebrow text-[color:var(--gold)]">Canal</div>
              <div className="font-display text-2xl mt-3">{c.label}</div>
              <p className="mt-3 text-sm text-[color:var(--ash)] leading-relaxed flex-1">{c.desc}</p>
              <div className="mt-5 text-[0.65rem] tracking-[0.18em] uppercase text-[color:var(--gold)]">{c.cta} →</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
