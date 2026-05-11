import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/components/cr/Reveal";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre la escuela — Conciencia Revolucionaria" },
      { name: "description", content: "Conciencia Revolucionaria es una escuela viva del Conocimiento de Sí Mismo: ciencia, arte, filosofía y mística al servicio del trabajo interior." },
      { property: "og:title", content: "Sobre Conciencia Revolucionaria" },
      { property: "og:description", content: "Una escuela viva del Conocimiento de Sí Mismo." },
    ],
  }),
  component: SobrePage,
});

const PILARES = [
  { name: "Ciencia", text: "Observación rigurosa de la psiquis y de las leyes que rigen al ser humano. No creemos: comprobamos." },
  { name: "Arte", text: "El trabajo interior como obra viva. Cada acto consciente es una pincelada sobre el alma." },
  { name: "Filosofía", text: "Pensar lo esencial. Distinguir lo verdadero de lo aparente, lo permanente de lo pasajero." },
  { name: "Mística", text: "Experiencia directa de lo divino, dentro y fuera del ser humano. No teoría: vivencia." },
];

const PRINCIPIOS = [
  { n: "01", title: "Auto-observación", text: "Observar sin juzgar lo que ocurre dentro: pensamientos, emociones, impulsos. La luz de la atención disuelve la mecanicidad." },
  { n: "02", title: "Comprensión", text: "No basta con ver el defecto: hay que comprenderlo en todos los niveles de la mente. Comprender es ya disolver." },
  { n: "03", title: "Eliminación", text: "Pedir a la Madre Divina interior la desintegración del yo comprendido. La muerte psicológica es el verdadero nacimiento." },
];

function SobrePage() {
  const ref = useReveal();
  return (
    <div ref={ref} className="pt-32 pb-20">
      <section className="relative mx-auto max-w-4xl px-6 text-center mb-20">
        <div className="cr-halo" style={{ inset: "-30% 10%", height: "140%", opacity: 0.4 }} />
        <div className="relative">
          <div className="cr-eyebrow cr-reveal">La escuela</div>
          <h1 className="cr-display text-5xl md:text-7xl mt-4 cr-reveal leading-[1.05]">
            Una <span className="cr-shimmer">escuela viva</span> del<br/>Conocimiento de Sí Mismo
          </h1>
          <p className="mt-8 text-[color:var(--ash)] cr-reveal max-w-2xl mx-auto leading-relaxed text-lg">
            Conciencia Revolucionaria reúne y transmite las enseñanzas de la psicología revolucionaria
            del Ser. No es una doctrina más: es un trabajo, una práctica, un camino.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 md:px-10 mb-24">
        <div className="cr-luxury-border rounded-2xl p-8 md:p-12 cr-glass cr-reveal">
          <div className="cr-eyebrow text-[color:var(--gold)]">Manifiesto</div>
          <div className="mt-6 space-y-5 text-[color:var(--bone)] leading-relaxed">
            <p>El ser humano duerme. Camina, habla, trabaja, ama y muere creyéndose despierto, sin sospechar que dentro suyo conviven cientos de yoes que toman su voz, su mano, su decisión.</p>
            <p>Despertar no es una metáfora. Es un acto técnico, preciso, posible. Requiere conocimiento, requiere método, requiere valor para mirarse sin máscara.</p>
            <p className="text-[color:var(--gold2)] font-display italic text-xl">El camino no se explica. Se recorre.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-10 mb-24">
        <div className="cr-eyebrow text-center">Los cuatro pilares</div>
        <h2 className="cr-display text-4xl md:text-5xl text-center mt-3 cr-reveal">Ciencia · Arte · Filosofía · Mística</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PILARES.map((p, i) => (
            <div key={p.name} className="cr-card cr-reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="cr-eyebrow text-[color:var(--gold)]">Pilar 0{i + 1}</div>
              <div className="font-display text-2xl mt-3">{p.name}</div>
              <p className="mt-3 text-sm text-[color:var(--ash)] leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 md:px-10 mb-24">
        <div className="cr-eyebrow text-center">Los tres factores</div>
        <h2 className="cr-display text-4xl md:text-5xl text-center mt-3 cr-reveal">El método</h2>
        <div className="mt-12 space-y-6">
          {PRINCIPIOS.map((p, i) => (
            <div key={p.n} className="cr-luxury-border rounded-2xl p-6 md:p-8 cr-glass cr-reveal flex flex-col md:flex-row gap-6 md:gap-10" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="font-display text-5xl text-[color:var(--gold)] leading-none">{p.n}</div>
              <div>
                <div className="font-display text-2xl">{p.title}</div>
                <p className="mt-3 text-[color:var(--ash)] leading-relaxed">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 text-center">
        <div className="cr-divider mb-12" />
        <div className="cr-eyebrow">Comenzar</div>
        <h2 className="cr-display text-4xl md:text-5xl mt-3 cr-reveal">Tu primer paso</h2>
        <p className="mt-5 text-[color:var(--ash)] leading-relaxed">
          La biblioteca está abierta. La Conferencia 01 es el umbral: el Conocimiento de Sí Mismo y los objetivos del trabajo.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link to="/conferencia/$id" params={{ id: "fase-a-01" }} className="cr-btn cr-btn-gold">Empezar por Conferencia 01</Link>
          <Link to="/contacto" className="cr-btn cr-btn-ghost">Contactar la escuela</Link>
        </div>
      </section>
    </div>
  );
}
