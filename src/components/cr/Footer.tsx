import { Link } from "@tanstack/react-router";
import { SOCIAL } from "@/lib/cr/queries";
import logo from "/assets/logo/logo.png?url";

export function Footer() {
  return (
    <footer className="cr-hide-on-focus mt-32 border-t border-[color-mix(in_oklab,var(--gold)_18%,transparent)]">
      <div className="cr-divider" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 py-12 md:py-16 grid gap-8 md:gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img 
            src={logo} 
            alt="Conciencia Revolucionaria" 
            className="h-10 w-10 object-contain" 
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
          />
            <div>
              <div className="cr-eyebrow text-[0.6rem]">Conciencia</div>
              <div className="font-display text-xl cr-shimmer">Revolucionaria</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-[color:var(--ash)] max-w-xs leading-relaxed">
            Una escuela viva del Conocimiento de Sí Mismo. El camino no se explica: se recorre.
          </p>
        </div>
        <div>
          <div className="cr-eyebrow mb-4">Estudio</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/conferencias" className="hover:text-[color:var(--gold2)]">Biblioteca de Conferencias</Link></li>
            <li><Link to="/yoes" className="hover:text-[color:var(--gold2)]">Estudios de Yoes</Link></li>
            <li><Link to="/conferencia/$id" params={{ id: "fase-a-01" }} className="hover:text-[color:var(--gold2)]">Comenzar por Conf. 01</Link></li>
          </ul>
        </div>
        <div>
          <div className="cr-eyebrow mb-4">Comunidad</div>
          <ul className="space-y-2 text-sm">
            <li><a href={SOCIAL.whatsappGroup} target="_blank" rel="noreferrer" className="hover:text-[color:var(--gold2)]">Grupo de WhatsApp</a></li>
            <li><a href={SOCIAL.youtube} target="_blank" rel="noreferrer" className="hover:text-[color:var(--gold2)]">YouTube</a></li>
            <li><a href={SOCIAL.instagram} target="_blank" rel="noreferrer" className="hover:text-[color:var(--gold2)]">Instagram</a></li>
            <li><a href={SOCIAL.tiktok} target="_blank" rel="noreferrer" className="hover:text-[color:var(--gold2)]">TikTok</a></li>
            <li><a href={SOCIAL.facebook} target="_blank" rel="noreferrer" className="hover:text-[color:var(--gold2)]">Facebook</a></li>
          </ul>
        </div>
        <div>
          <div className="cr-eyebrow mb-4">Contacto</div>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`https://wa.me/${SOCIAL.whatsappPhoneRaw.replace("+","")}`} target="_blank" rel="noreferrer" className="hover:text-[color:var(--gold2)]">
                WhatsApp {SOCIAL.whatsappPhone}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[color-mix(in_oklab,var(--gold)_12%,transparent)] py-6 text-center text-xs text-[color:var(--ash)] tracking-[0.2em] uppercase">
        © {new Date().getFullYear()} Conciencia Revolucionaria
      </div>
    </footer>
  );
}
