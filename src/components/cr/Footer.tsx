import { Link } from "@tanstack/react-router";
import { SOCIAL } from "@/lib/cr/queries";
import logo from "/assets/logo/logo.png?url";

export function Footer() {
  const footerLinks = {
    Estudio: [
      { label: "Biblioteca de Conferencias", to: "/conferencias" },
      { label: "Estudios de Yoes", to: "/yoes" },
      { label: "Comenzar por Conf. 01", to: "/conferencia/$id", params: { id: "fase-a-01" } },
    ],
    Comunidad: [
      { label: "Grupo de WhatsApp", href: SOCIAL.whatsappGroup },
      { label: "YouTube", href: SOCIAL.youtube },
      { label: "Instagram", href: SOCIAL.instagram },
      { label: "TikTok", href: SOCIAL.tiktok },
      { label: "Facebook", href: SOCIAL.facebook },
    ],
    Contacto: [
      { label: `WhatsApp ${SOCIAL.whatsappPhone}`, href: `https://wa.me/${SOCIAL.whatsappPhoneRaw.replace("+", "")}` },
    ],
  };

  return (
    <footer className="relative mt-auto border-t border-[color-mix(in_oklab,var(--gold)_15%,transparent)] bg-[color:var(--void)] pt-16 pb-12 overflow-hidden">
      <div className="cr-halo" style={{ inset: "auto 0 0 auto", width: "40%", height: "60%", opacity: 0.2 }} />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[color-mix(in_oklab,var(--gold)_12%,transparent)] flex items-center justify-center border border-[color-mix(in_oklab,var(--gold)_20%,transparent)]">
                <span className="font-display text-xl text-[color:var(--gold)]">C</span>
              </div>
              <span className="font-display text-xl sm:text-2xl cr-shimmer">Conciencia Revolucionaria</span>
            </Link>
            <p className="text-sm text-[color:var(--ash)] leading-relaxed max-w-xs">
              Difusión gratuita del conocimiento de sí mismo para el despertar de la conciencia y la liberación del ser.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-6">
              <h4 className="cr-eyebrow text-[color:var(--gold)] !text-[0.65rem] tracking-[0.25em]">{category}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a 
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-[color:var(--ash)] hover:text-[color:var(--gold2)] transition-colors py-1.5 inline-block min-h-[40px] flex items-center"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link 
                        to={link.to} 
                        params={link.params}
                        className="text-sm text-[color:var(--ash)] hover:text-[color:var(--gold2)] transition-colors py-1.5 inline-block min-h-[40px] flex items-center"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[color-mix(in_oklab,var(--gold)_10%,transparent)] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[0.65rem] uppercase tracking-widest text-[color:var(--ash)] opacity-60">
            © {new Date().getFullYear()} Conciencia Revolucionaria · Sin fines de lucro
          </p>
        </div>
      </div>
    </footer>
  );
}
