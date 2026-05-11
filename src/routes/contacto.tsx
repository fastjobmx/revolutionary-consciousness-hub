import { createFileRoute, Link } from "@tanstack/react-router";
import { SOCIAL } from "@/lib/cr/queries";
import { useReveal } from "@/components/cr/Reveal";
import { useState } from "react";
import { Send, CheckCircle, AlertCircle, MessageSquare, Youtube, Instagram, Facebook, Smartphone, Mail, Lock, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contáctanos — Conciencia Revolucionaria" },
      { name: "description", content: "Solicita información, recursos o sugerencias. También encuentra nuestras redes sociales y canales de comunicación." },
      { property: "og:title", content: "Contáctanos — Conciencia Revolucionaria" },
      { property: "og:description", content: "Estamos aquí para escucharte y acompañarte." },
    ],
  }),
  component: ContactoPage,
});

const SOCIAL_CARDS = [
  { id: "whatsapp", label: "WhatsApp", desc: "Contacto directo para preguntas y orientación.", href: `https://wa.me/${SOCIAL.whatsappPhoneRaw.replace("+", "")}`, cta: "Enviar mensaje", icon: Smartphone },
  { id: "youtube", label: "YouTube", desc: "Conferencias completas y contenido de estudio.", href: SOCIAL.youtube, cta: "Ver canal", icon: Youtube },
  { id: "instagram", label: "Instagram", desc: "Publicaciones diarias y fragmentos de práctica.", href: SOCIAL.instagram, cta: "Seguir", icon: Instagram },
  { id: "facebook", label: "Facebook", desc: "Comunidad, eventos y recursos compartidos.", href: SOCIAL.facebook, cta: "Visitar", icon: Facebook },
];

const RELATED_LINKS = [
  { to: "/como-empezar", label: "Cómo empezar", desc: "Guía paso a paso para nuevos estudiantes" },
  { to: "/conferencias-fase-a", label: "Fase A", desc: "50 conferencias fundamentales" },
  { to: "/conferencias-fase-b", label: "Fase B", desc: "25 conferencias de profundización" },
  { to: "/yoes", label: "Estudios de Yoes", desc: "Trabajo psicológico sobre agregados" },
];

interface FormData {
  nombre: string;
  email: string;
  mensaje: string;
  website: string; // Honeypot field
}

interface FormErrors {
  nombre?: string;
  email?: string;
  mensaje?: string;
}

function ContactoPage() {
  const ref = useReveal();
  const [formData, setFormData] = useState<FormData>({ nombre: "", email: "", mensaje: "", website: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Introduce un email válido";
    }
    
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es obligatorio";
    } else if (formData.mensaje.length < 10) {
      newErrors.mensaje = "El mensaje debe tener al menos 10 caracteres";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check - if website field is filled, it's spam
    if (formData.website) {
      return;
    }
    
    if (!validate()) {
      setStatus("error");
      return;
    }
    
    setIsSubmitting(true);
    setStatus("idle");
    
    // Simulate form submission
    try {
      // Here you would normally send to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus("success");
      setFormData({ nombre: "", email: "", mensaje: "", website: "" });
      setErrors({});
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    // Clear status when user modifies form
    if (status !== "idle") {
      setStatus("idle");
    }
  };

  return (
    <div ref={ref} className="pt-24 sm:pt-32 pb-20 overflow-hidden">
      {/* HERO */}
      <section className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center mb-12 sm:mb-16">
        <div className="cr-halo" style={{ inset: "-30% 10%", height: "140%", opacity: 0.4 }} />
        <div className="relative">
          <div className="cr-eyebrow cr-reveal">Comunicación</div>
          <h1 className="cr-display text-[clamp(2.5rem,1.5rem+8vw,5.5rem)] mt-6 cr-reveal leading-[1.1]">
            <span className="cr-shimmer">Contáctanos</span>
          </h1>
          <p className="mt-8 text-sm sm:text-base md:text-xl text-[color:var(--ash)] cr-reveal max-w-2xl mx-auto leading-relaxed opacity-90">
            Estamos aquí para acompañar tu proceso de estudio. Solicita información, recursos 
            o comparte tus sugerencias para mejorar la biblioteca.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[1fr_400px]">
          {/* FORMULARIO */}
          <section className="order-2 lg:order-1">
            <div className="cr-luxury-border rounded-2xl p-6 sm:p-10 md:p-12 cr-glass cr-reveal shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-[color-mix(in_oklab,var(--gold)_12%,transparent)] border border-[color-mix(in_oklab,var(--gold)_20%,transparent)]">
                  <Mail className="w-6 h-6 text-[color:var(--gold)]" />
                </div>
                <div className="cr-eyebrow text-[color:var(--gold)] !mb-0">Formulario de contacto</div>
              </div>

              {/* Mensajes de estado - NUNCA ambos a la vez */}
              {status === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-[color-mix(in_oklab,var(--gold)_15%,transparent)] border border-[color:var(--gold)] flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[color:var(--gold)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[color:var(--bone)] font-medium">Mensaje enviado correctamente</p>
                    <p className="text-sm text-[color:var(--ash)] mt-1">Te responderemos lo antes posible. Gracias por contactarnos.</p>
                  </div>
                </div>
              )}

              {status === "error" && Object.keys(errors).length > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-[color-mix(in_oklab,var(--ember)_15%,transparent)] border border-[color:var(--ember)] flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[color:var(--ember)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[color:var(--bone)] font-medium">Por favor, corrige los errores</p>
                    <p className="text-sm text-[color:var(--ash)] mt-1">Revisa los campos marcados e inténtalo de nuevo.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot - hidden field for spam protection */}
                <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm text-[color:var(--ash)] mb-2">
                    Nombre <span className="text-[color:var(--gold)]">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`w-full bg-transparent border ${errors.nombre ? 'border-[color:var(--ember)]' : 'border-[color-mix(in_oklab,var(--gold)_25%,transparent)]'} focus:border-[color:var(--gold)] rounded-xl px-4 py-3 outline-none text-[color:var(--bone)] placeholder:text-[color:var(--ash)] transition`}
                    placeholder="Tu nombre"
                    autoComplete="name"
                  />
                  {errors.nombre && <p className="mt-1.5 text-sm text-[color:var(--ember)]">{errors.nombre}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm text-[color:var(--ash)] mb-2">
                    Email <span className="text-[color:var(--gold)]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-transparent border ${errors.email ? 'border-[color:var(--ember)]' : 'border-[color-mix(in_oklab,var(--gold)_25%,transparent)]'} focus:border-[color:var(--gold)] rounded-xl px-4 py-3 outline-none text-[color:var(--bone)] placeholder:text-[color:var(--ash)] transition`}
                    placeholder="tu@email.com"
                    autoComplete="email"
                  />
                  {errors.email && <p className="mt-1.5 text-sm text-[color:var(--ember)]">{errors.email}</p>}
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="mensaje" className="block text-sm text-[color:var(--ash)] mb-2">
                    Mensaje <span className="text-[color:var(--gold)]">*</span>
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full bg-transparent border ${errors.mensaje ? 'border-[color:var(--ember)]' : 'border-[color-mix(in_oklab,var(--gold)_25%,transparent)]'} focus:border-[color:var(--gold)] rounded-xl px-4 py-3 outline-none text-[color:var(--bone)] placeholder:text-[color:var(--ash)] transition resize-none`}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                  {errors.mensaje && <p className="mt-1.5 text-sm text-[color:var(--ember)]">{errors.mensaje}</p>}
                </div>

                {/* Aviso de privacidad */}
                <div className="flex items-start gap-2 text-xs text-[color:var(--ash)]">
                  <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>
                    Tu información será tratada con confidencialidad. 
                    Solo la utilizaremos para responder a tu mensaje. 
                    No compartimos datos con terceros.
                  </p>
                </div>

                {/* Botón enviar */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cr-btn cr-btn-gold w-full min-h-[52px] flex items-center justify-center gap-2 text-base font-semibold shadow-lg shadow-[var(--gold)]/10 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-[color:var(--ink)] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar mensaje</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>

          {/* SIDEBAR INFO */}
          <aside className="space-y-12 order-1 lg:order-2">
            {/* Redes Sociales */}
            <div>
              <div className="cr-eyebrow mb-6">Canales oficiales</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {SOCIAL_CARDS.map((card, i) => (
                  <a
                    key={card.id}
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className="cr-card p-6 flex items-start gap-4 group cr-reveal"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="p-2.5 rounded-xl bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] border border-[color-mix(in_oklab,var(--gold)_15%,transparent)] text-[color:var(--gold)] group-hover:bg-[color:var(--gold)] group-hover:text-[color:var(--ink)] transition-colors">
                      <card.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display text-lg leading-none">{card.label}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
                      </div>
                      <p className="text-xs text-[color:var(--ash)] leading-relaxed mb-3">{card.desc}</p>
                      <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[color:var(--gold)] font-bold">{card.cta} →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Enlaces Rápidos */}
            <div className="cr-reveal" style={{ transitionDelay: "400ms" }}>
              <div className="cr-eyebrow mb-6">Guías rápidas</div>
              <div className="cr-glass rounded-2xl p-6 border border-[color-mix(in_oklab,var(--gold)_15%,transparent)] divide-y divide-[color-mix(in_oklab,var(--gold)_10%,transparent)]">
                {RELATED_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex flex-col py-4 first:pt-0 last:pb-0 group"
                  >
                    <span className="font-display text-base group-hover:text-[color:var(--gold)] transition-colors">{link.label}</span>
                    <span className="text-xs text-[color:var(--ash)] mt-1">{link.desc}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* WhatsApp directo */}
            <div className="cr-reveal" style={{ transitionDelay: "300ms" }}>
              <div className="cr-luxury-border rounded-2xl p-6 cr-glass text-center">
                <div className="cr-eyebrow text-[color:var(--gold)] mb-3">¿Prefieres WhatsApp?</div>
                <p className="text-sm text-[color:var(--ash)] mb-4">
                  Para respuestas más rápidas, escríbenos directamente.
                </p>
                <a
                  href={`https://wa.me/${SOCIAL.whatsappPhoneRaw.replace("+", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="cr-btn cr-btn-gold w-full flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Abrir chat
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
