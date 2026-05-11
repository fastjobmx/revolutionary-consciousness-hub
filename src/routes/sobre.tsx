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
  { name: "Psicología", text: "Pensar lo esencial. Distinguir lo verdadero de lo aparente, lo permanente de lo pasajero." },
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
    <div ref={ref} className="pt-24 sm:pt-32 pb-20 overflow-hidden">
      <section className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center mb-16 md:mb-20">
        <div className="cr-halo" style={{ inset: "-30% 10%", height: "140%", opacity: 0.4 }} />
        <div className="relative">
          <div className="cr-eyebrow cr-reveal">La escuela</div>
          <h1 className="cr-display text-[clamp(2.25rem,1.5rem+6vw,4.5rem)] mt-6 cr-reveal leading-[1.1] balance-text">
            Una <span className="cr-shimmer">escuela viva</span> del<br/>Conocimiento de Sí Mismo
          </h1>
          <p className="mt-8 text-sm sm:text-base md:text-xl text-[color:var(--ash)] cr-reveal max-w-2xl mx-auto leading-relaxed opacity-90">
            Conciencia Revolucionaria reúne y transmite las enseñanzas de la psicología revolucionaria
            del Ser. No es una doctrina más: es un trabajo, una práctica, un camino.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 md:px-10 mb-20 md:mb-24">
        <div className="cr-luxury-border rounded-2xl p-7 sm:p-10 md:p-12 cr-glass cr-reveal">
          <div className="cr-eyebrow text-[color:var(--gold)] mb-6">Manifiesto</div>
          <div className="space-y-6 text-sm sm:text-base md:text-lg text-[color:var(--bone)] leading-relaxed opacity-90">
            <p>El ser humano duerme. Camina, habla, trabaja, ama y muere creyéndose despierto, sin sospechar que dentro suyo conviven cientos de yoes que toman su voz, su mano, su decisión.</p>
            <p>Despertar no es una metáfora. Es un acto técnico, preciso, posible. Requiere conocimiento, requiere método, requiere valor para mirarse sin máscara.</p>
            <div className="pt-4">
              <p className="text-[color:var(--gold2)] font-display italic text-xl sm:text-2xl text-center md:text-left">El camino no se explica. Se recorre.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 mb-24">
        <div className="text-center mb-12">
          <div className="cr-eyebrow">Los cuatro pilares</div>
          <h2 className="cr-display text-3xl sm:text-4xl md:text-5xl mt-4 cr-reveal balance-text">Ciencia · Arte · Psicología · Mística</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {PILARES.map((p, i) => (
            <div key={p.name} className="cr-card cr-reveal p-6 sm:p-8" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="cr-eyebrow text-[color:var(--gold)]">Pilar 0{i + 1}</div>
              <div className="font-display text-2xl mt-4 leading-tight">{p.name}</div>
              <p className="mt-4 text-sm text-[color:var(--ash)] leading-relaxed opacity-90">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 md:px-10 mb-24">
        <div className="text-center mb-12">
          <div className="cr-eyebrow">Los tres factores</div>
          <h2 className="cr-display text-3xl sm:text-4xl md:text-5xl mt-4 cr-reveal">El método</h2>
        </div>
        <div className="mt-12 space-y-4 md:space-y-6">
          {PRINCIPIOS.map((p, i) => (
            <div key={p.n} className="cr-luxury-border rounded-2xl p-7 sm:p-8 md:p-10 cr-glass cr-reveal flex flex-col md:flex-row gap-6 md:gap-10" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="font-display text-5xl md:text-6xl text-[color:var(--gold)] leading-none opacity-80">{p.n}</div>
              <div>
                <div className="font-display text-2xl sm:text-3xl mb-4 leading-tight">{p.title}</div>
                <p className="text-sm sm:text-base text-[color:var(--ash)] leading-relaxed opacity-90">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 text-center pb-12">
        <div className="cr-divider mb-12 opacity-30" />
        <div className="cr-eyebrow mb-4">Comenzar</div>
        <h2 className="cr-display text-3xl sm:text-4xl md:text-5xl mt-3 cr-reveal">Tu primer paso</h2>
        <p className="mt-6 text-sm sm:text-base text-[color:var(--ash)] leading-relaxed max-w-xl mx-auto mb-10">
          La biblioteca está abierta. La Conferencia 01 es el umbral: el Conocimiento de Sí Mismo y los objetivos del trabajo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <Link to="/conferencia/$id" params={{ id: "fase-a-01" }} className="cr-btn cr-btn-gold min-h-[52px] flex items-center justify-center">Empezar por Conferencia 01</Link>
          <Link to="/contacto" className="cr-btn cr-btn-ghost min-h-[52px] flex items-center justify-center">Contactar la escuela</Link>
        </div>
      </section>
    </div>
  );
}
