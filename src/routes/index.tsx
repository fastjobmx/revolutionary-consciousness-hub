import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { conferenciasQuery, yoesQuery, SOCIAL } from "@/lib/cr/queries";
import { useReveal } from "@/components/cr/Reveal";
import logo from "/assets/logo/logo.png?url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Conciencia Revolucionaria — Conocimiento de Sí Mismo" },
      { name: "description", content: "Una experiencia digital para el estudio del Conocimiento de Sí Mismo: 75 conferencias, estudios psicológicos y la práctica diaria de la Revolución de la Conciencia." },
      { property: "og:title", content: "Conciencia Revolucionaria" },
      { property: "og:description", content: "El camino no se explica. Se recorre." },
      { property: "og:image", content: "/assets/logo/logo.png" },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(conferenciasQuery());
    context.queryClient.ensureQueryData(yoesQuery());
  },
  component: HomePage,
});

const PILLARS = [
  { name: "Ciencia", text: "Observación rigurosa de la psiquis y de las leyes que rigen al ser." },
  { name: "Arte", text: "La obra interior como creación viva del Ser sobre sí mismo." },
  { name: "Filosofía", text: "Pensar lo esencial, distinguir lo verdadero de lo aparente." },
  { name: "Mística", text: "Experiencia directa de lo divino dentro y fuera del ser humano." },
];

const FACTORS = [
  { n: "I", t: "Nacer", d: "Crear los Cuerpos Solares; nacer una segunda vez al Espíritu." },
  { n: "II", t: "Morir", d: "Disolver el yo psicológico, los agregados, los defectos." },
  { n: "III", t: "Sacrificio", d: "Servir a la humanidad como expresión natural del Ser despierto." },
];

const ROUTE_STEPS = [
  { n: "01", t: "Fase A", d: "Cincuenta lecciones fundamentales que abren el camino del conocimiento de sí mismo." },
  { n: "02", t: "Fase B", d: "Veinticinco lecciones de profundización psicológica, meditación y mundo astral." },
  { n: "03", t: "Estudios de Yoes", d: "Trabajo psicológico directo: observar, comprender y disolver los agregados." },
  { n: "04", t: "Práctica diaria", d: "La transformación se realiza instante a instante en la vida cotidiana." },
];

function HomePage() {
  const ref = useReveal();
  const { data: confs } = useSuspenseQuery(conferenciasQuery());
  const { data: yoes } = useSuspenseQuery(yoesQuery());
  const featuredA = confs.filter(c => c.phase === "A").slice(0, 3);
  const featuredB = confs.filter(c => c.phase === "B").slice(0, 3);

  return (
    <div ref={ref}>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-16">
        <div className="cr-halo" style={{ inset: "10% 20%", borderRadius: "9999px" }} />
        <div className="cr-orb" style={{ width: 480, height: 480, top: "10%", left: "8%" }} />
        <div className="cr-orb" style={{ width: 380, height: 380, bottom: "12%", right: "12%", opacity: 0.6 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-vignette)" }} />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="cr-reveal">
            <img src={logo} alt="Sello Conciencia Revolucionaria" className="mx-auto h-28 md:h-36 mb-10 opacity-90" />
          </div>
          <div className="cr-eyebrow cr-reveal">Escuela viva del conocimiento de sí mismo</div>
          <h1 className="cr-display text-6xl md:text-8xl mt-6 cr-reveal">
            <span className="cr-shimmer">Conciencia</span>
            <br />
            <span className="cr-gold-text italic font-light">Revolucionaria</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-[color:var(--ash)] max-w-2xl mx-auto cr-reveal leading-relaxed">
            Un camino hacia el conocimiento de sí mismo y la revolución interior.
          </p>
          <p className="mt-4 italic font-display text-xl text-[color:var(--gold2)] cr-reveal">
            "El camino no se explica. Se recorre."
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4 cr-reveal">
            <Link to="/conferencias" className="cr-btn cr-btn-gold">Explorar Conferencias</Link>
            <Link to="/conferencia/$id" params={{ id: "fase-a-01" }} className="cr-btn cr-btn-ghost">Iniciar Ruta de Estudio</Link>
          </div>
        </div>
      </section>

      {/* RUTA DE ESTUDIO */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-32">
        <div className="text-center mb-20">
          <div className="cr-eyebrow cr-reveal">El sendero</div>
          <h2 className="cr-display text-4xl md:text-6xl mt-4 cr-reveal">Ruta de Estudio</h2>
          <p className="mt-5 text-[color:var(--ash)] max-w-xl mx-auto cr-reveal">
            Cuatro etapas que se entrelazan en una misma obra interior.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ROUTE_STEPS.map((s, i) => (
            <div key={s.n} className="cr-card cr-reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="cr-eyebrow text-[color:var(--gold)]">{s.n}</div>
              <div className="font-display text-2xl mt-3">{s.t}</div>
              <p className="mt-3 text-sm text-[color:var(--ash)] leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PILARES */}
      <section className="relative py-32 overflow-hidden">
        <div className="cr-halo" style={{ inset: "20% 30%", opacity: 0.4 }} />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <div className="text-center mb-16">
            <div className="cr-eyebrow cr-reveal">Cuatro pilares</div>
            <h2 className="cr-display text-4xl md:text-6xl mt-4 cr-reveal">Pilares de la Sabiduría</h2>
          </div>
          <div className="grid gap-px bg-[color-mix(in_oklab,var(--gold)_20%,transparent)] md:grid-cols-2 lg:grid-cols-4 cr-luxury-border rounded-2xl overflow-hidden">
            {PILLARS.map((p, i) => (
              <div key={p.name} className="bg-[color:var(--obsidian)] p-8 md:p-10 hover:bg-[color-mix(in_oklab,var(--gold)_5%,var(--obsidian))] transition cr-reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="cr-eyebrow text-[color:var(--gold)]">{String(i + 1).padStart(2, "0")}</div>
                <div className="font-display text-3xl mt-3">{p.name}</div>
                <p className="mt-4 text-sm text-[color:var(--ash)] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRES FACTORES */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-32">
        <div className="text-center mb-16">
          <div className="cr-eyebrow cr-reveal">Tres factores</div>
          <h2 className="cr-display text-4xl md:text-6xl mt-4 cr-reveal">de la Revolución de la Conciencia</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {FACTORS.map((f, i) => (
            <div key={f.n} className="cr-card text-center cr-reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="font-display text-6xl cr-gold-text">{f.n}</div>
              <div className="cr-divider my-5" />
              <div className="font-display text-2xl">{f.t}</div>
              <p className="mt-3 text-sm text-[color:var(--ash)] leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BIBLIOTECA */}
      <section className="relative py-32 overflow-hidden">
        <div className="cr-orb" style={{ width: 600, height: 600, top: "0%", right: "-10%", opacity: 0.5 }} />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-wrap items-end justify-between mb-12 gap-6">
            <div>
              <div className="cr-eyebrow cr-reveal">Biblioteca viva</div>
              <h2 className="cr-display text-4xl md:text-6xl mt-3 cr-reveal">75 Conferencias</h2>
              <p className="mt-3 text-[color:var(--ash)] cr-reveal max-w-xl">Fase A · Fase B. Lecturas con prácticas, mantrams, diagramas y meditaciones.</p>
            </div>
            <Link to="/conferencias" className="cr-btn cr-btn-ghost cr-reveal">Ver biblioteca completa →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...featuredA, ...featuredB].map((c, i) => (
              <Link key={c.id} to="/conferencia/$id" params={{ id: c.id }} className="cr-card cr-reveal block group" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="flex items-center justify-between text-xs">
                  <span className="cr-eyebrow text-[color:var(--gold)]">Fase {c.phase} · {c.number}</span>
                  {c.images.length > 0 && <span className="text-[color:var(--ash)]">◇ Diagramas</span>}
                </div>
                <div className="font-display text-2xl mt-4 group-hover:text-[color:var(--gold2)] transition leading-tight">{c.title}</div>
                <p className="mt-3 text-sm text-[color:var(--ash)] leading-relaxed line-clamp-3">{c.summary}</p>
                <div className="mt-5 text-xs tracking-[0.2em] uppercase text-[color:var(--gold)]">Leer →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* YOES */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-32">
        <div className="flex flex-wrap items-end justify-between mb-12 gap-6">
          <div>
            <div className="cr-eyebrow cr-reveal">Trabajo psicológico</div>
            <h2 className="cr-display text-4xl md:text-6xl mt-3 cr-reveal">Estudios de los Yoes</h2>
            <p className="mt-3 text-[color:var(--ash)] cr-reveal max-w-xl">Observar, comprender y disolver los agregados internos.</p>
          </div>
          <Link to="/yoes" className="cr-btn cr-btn-ghost cr-reveal">Ver todos →</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {yoes.map((y, i) => (
            <Link key={y.id} to="/yo/$id" params={{ id: y.id }} className="cr-card cr-reveal block group" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between">
                <span className="cr-eyebrow text-[color:var(--gold)]">Estudio</span>
                <span className={`text-[0.65rem] tracking-[0.18em] uppercase px-2 py-1 rounded-full border ${y.status === "completo" ? "border-[color:var(--gold)] text-[color:var(--gold2)]" : "border-[color:var(--ash)] text-[color:var(--ash)]"}`}>
                  {y.status === "completo" ? "Disponible" : "En preparación"}
                </span>
              </div>
              <div className="font-display text-2xl mt-4 leading-tight group-hover:text-[color:var(--gold2)] transition">{y.title}</div>
              <p className="mt-3 text-sm text-[color:var(--ash)] line-clamp-3 leading-relaxed">{y.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-32 overflow-hidden">
        <div className="cr-halo" style={{ inset: "20% 25%" }} />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="cr-eyebrow cr-reveal">Comienza ahora</div>
          <h2 className="cr-display text-5xl md:text-7xl mt-5 cr-reveal">
            <span className="cr-gold-text italic">Conf. 01</span>
            <br />
            <span className="cr-shimmer">El conocimiento de sí mismo</span>
          </h2>
          <p className="mt-6 text-[color:var(--ash)] cr-reveal">El primer paso del camino siempre se da hoy.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 cr-reveal">
            <Link to="/conferencia/$id" params={{ id: "fase-a-01" }} className="cr-btn cr-btn-gold">Comenzar la primera conferencia</Link>
            <a href={SOCIAL.whatsappGroup} target="_blank" rel="noreferrer" className="cr-btn cr-btn-ghost">Unirse al grupo</a>
          </div>
        </div>
      </section>
    </div>
  );
}
