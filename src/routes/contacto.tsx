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
    <div ref={ref} className="pt-32 pb-20">
      {/* HERO */}
      <section className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center mb-12 sm:mb-16">
        <div className="cr-halo" style={{ inset: "-30% 10%", height: "140%", opacity: 0.4 }} />
        <div className="relative">
          <div className="cr-eyebrow cr-reveal">Comunicación</div>
          <h1 className="cr-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 cr-reveal leading-[1.05]">
            <span className="cr-shimmer">Contáctanos</span>
          </h1>
          <p className="mt-8 text-lg text-[color:var(--ash)] cr-reveal max-w-2xl mx-auto leading-relaxed">
            Solicita información o recursos relacionados con las conferencias. 
            También puedes enviarnos sugerencias para mejorar el sitio.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_400px]">
          {/* FORMULARIO */}
          <section>
            <div className="cr-luxury-border rounded-2xl p-5 sm:p-8 md:p-10 cr-glass cr-reveal">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-[color-mix(in_oklab,var(--gold)_15%,transparent)]">
                  <Mail className="w-5 h-5 text-[color:var(--gold)]" />
                </div>
                <div className="cr-eyebrow text-[color:var(--gold)]">Formulario de contacto</div>
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
                  className="cr-btn cr-btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[color:var(--ink)] border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>

          {/* SIDEBAR - Redes y enlaces */}
          <aside className="space-y-8">
            {/* Redes sociales */}
            <div className="cr-reveal">
              <div className="cr-eyebrow mb-4">Redes sociales</div>
              <div className="space-y-3">
                {SOCIAL_CARDS.map((card, i) => (
                  <a
                    key={card.id}
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className="cr-card block group"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-full bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] group-hover:bg-[color-mix(in_oklab,var(--gold)_20%,transparent)] transition">
                        <card.icon className="w-4 h-4 text-[color:var(--gold)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-lg">{card.label}</span>
                          <ExternalLink className="w-3 h-3 text-[color:var(--ash)] opacity-0 group-hover:opacity-100 transition" />
                        </div>
                        <p className="text-sm text-[color:var(--ash)] mt-1">{card.desc}</p>
                        <span className="text-[0.65rem] tracking-[0.18em] uppercase text-[color:var(--gold)] mt-2 block">
                          {card.cta} →
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Enlaces relacionados */}
            <div className="cr-reveal" style={{ transitionDelay: "240ms" }}>
              <div className="cr-eyebrow mb-4">Páginas relacionadas</div>
              <div className="cr-luxury-border rounded-2xl p-5 cr-glass space-y-3">
                {RELATED_LINKS.map((link, i) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center justify-between group py-2 border-b border-[color-mix(in_oklab,var(--gold)_10%,transparent)] last:border-0"
                  >
                    <div>
                      <span className="font-display text-[color:var(--bone)] group-hover:text-[color:var(--gold2)] transition">{link.label}</span>
                      <p className="text-xs text-[color:var(--ash)]">{link.desc}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[color:var(--ash)] group-hover:text-[color:var(--gold)] transition" />
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
