import { Link } from "@tanstack/react-router";
import { SOCIAL } from "@/lib/cr/queries";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const WHATSAPP_URL = `https://wa.me/573022323472`;
  const WHATSAPP_LABEL = "+57 302 232 3472";

  return (
    <footer className="relative mt-auto bg-[color:var(--void)] border-t border-[color-mix(in_oklab,var(--gold)_8%,transparent)] overflow-hidden">
      {/* Subtle Spiritual Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[color:var(--gold)] opacity-[0.03] blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 py-16 md:py-20">
        
        {/* BLOCK A: REFINED CTA SUPERIOR */}
        <div className="mb-16 md:mb-24">
          <div className="cr-luxury-border rounded-3xl p-6 md:p-10 cr-glass relative group overflow-hidden border-[color-mix(in_oklab,var(--gold)_15%,transparent)]">
            <div className="absolute top-0 right-0 p-6 opacity-[0.01] group-hover:opacity-5 transition-all duration-1000">
              <Sparkles className="w-32 h-32" />
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <div className="max-w-xl">
                <h3 className="font-display text-2xl md:text-3xl leading-tight mb-3">Comienza tu trabajo interior</h3>
                <p className="text-[color:var(--ash)] text-sm leading-relaxed opacity-70">
                  Estudia las conferencias, observa tus yoes y lleva la práctica al diario vivir.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
                <Link 
                  to="/conferencia/$id" 
                  params={{ id: "fase-a-01" }}
                  className="cr-btn cr-btn-gold px-7 py-3.5 !text-[0.6rem] !font-black shadow-lg shadow-gold/5"
                >
                  Comenzar por Conf. 01
                </Link>
                <Link 
                  to="/yoes"
                  className="cr-btn cr-btn-ghost px-7 py-3.5 !text-[0.6rem] !font-black hover:bg-[color-mix(in_oklab,var(--gold)_5%,transparent)]"
                >
                  Estudiar Yo de la Semana
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* BLOCK B: BALANCED NAVIGATION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-[color-mix(in_oklab,var(--gold)_5%,transparent)]">
          
          {/* Brand Column (4/12) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2.5 group relative z-10">
              <div className="w-9 h-9 rounded-lg bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] flex items-center justify-center border border-[color-mix(in_oklab,var(--gold)_15%,transparent)] group-hover:border-[color:var(--gold)] transition-all duration-700 shrink-0">
                <span className="font-display text-xl font-bold text-[color:var(--gold)]">C</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="cr-eyebrow text-[0.5rem] tracking-[0.3em] mb-0.5 opacity-50">Conciencia</span>
                <span className="font-display text-lg tracking-tight cr-shimmer font-medium">Revolucionaria</span>
              </div>
            </Link>
            <div className="space-y-4">
              <p className="text-[0.78rem] text-[color:var(--ash)] leading-relaxed opacity-60 max-w-[280px]">
                Difusión gratuita del conocimiento de sí mismo para el despertar de la conciencia y la liberación del ser.
              </p>
              <p className="font-display italic text-[color:var(--gold)] text-[0.8rem] opacity-40 tracking-wider">"Conócete a ti mismo."</p>
            </div>
          </div>

          {/* Navigation Columns (2/12 each) */}
          <div className="lg:col-span-2">
            <FooterColumn title="Estudio">
              <FooterLink to="/conferencias">Biblioteca</FooterLink>
              <FooterLink to="/como-empezar">Cómo empezar</FooterLink>
              <FooterLink to="/conferencias-fase-a">Fase A</FooterLink>
              <FooterLink to="/conferencias-fase-b">Fase B</FooterLink>
              <FooterLink to="/libros">Libros</FooterLink>
            </FooterColumn>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="Yoes">
              <FooterLink to="/yoes">Biblioteca Viva</FooterLink>
              <FooterLink to="/yoes">Yo de la semana</FooterLink>
              <FooterLink to="/yoes">Básicos</FooterLink>
              <FooterLink to="/yoes">Emocionales</FooterLink>
              <FooterLink to="/yoes">Vida Moderna</FooterLink>
            </FooterColumn>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="Redes">
              <FooterSocialLink href={SOCIAL.whatsappGroup}>WhatsApp</FooterSocialLink>
              <FooterSocialLink href={SOCIAL.youtube}>YouTube</FooterSocialLink>
              <FooterSocialLink href={SOCIAL.instagram}>Instagram</FooterSocialLink>
              <FooterSocialLink href={SOCIAL.tiktok}>TikTok</FooterSocialLink>
            </FooterColumn>
          </div>

          {/* Contact Column (2/12) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="cr-eyebrow text-[color:var(--gold)] !text-[0.6rem] tracking-[0.25em] font-bold opacity-80">Contacto</h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[0.55rem] uppercase tracking-widest text-[color:var(--ash)] opacity-40 block font-bold">WhatsApp Internacional</span>
                <p className="text-[0.8rem] font-bold text-[color:var(--bone)] opacity-80">{WHATSAPP_LABEL}</p>
              </div>
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noreferrer"
                className="cr-btn cr-btn-gold w-full justify-center !py-2.5 !px-4 !text-[0.55rem] !font-black shadow-lg shadow-gold/5"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-2" />
                Escribir ahora
              </a>
              <FooterLink to="/contacto">Formulario</FooterLink>
            </div>
          </div>
        </div>

        {/* BLOCK C: REFINED LEGAL */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <p className="text-[0.58rem] uppercase tracking-[0.3em] text-[color:var(--ash)] opacity-40 font-medium">
              © {currentYear} Conciencia Revolucionaria
            </p>
            <span className="hidden md:block w-[1px] h-3 bg-[color:var(--gold)] opacity-10" />
            <p className="text-[0.58rem] uppercase tracking-[0.2em] text-[color:var(--gold)] opacity-30 font-bold italic">
              Difusión gratuita · Sin fines de lucro
            </p>
          </div>
          
          <nav className="flex items-center gap-6" aria-label="Enlaces secundarios">
            <Link to="/sobre" className="text-[0.6rem] uppercase tracking-[0.2em] text-[color:var(--ash)] hover:text-[color:var(--gold)] transition-colors font-bold opacity-60 hover:opacity-100">Sobre</Link>
            <Link to="/contacto" className="text-[0.6rem] uppercase tracking-[0.2em] text-[color:var(--ash)] hover:text-[color:var(--gold)] transition-colors font-bold opacity-60 hover:opacity-100">Privacidad</Link>
            <Link to="/" className="text-[0.6rem] uppercase tracking-[0.2em] text-[color:var(--ash)] hover:text-[color:var(--gold)] transition-colors font-bold opacity-60 hover:opacity-100">Inicio</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <h4 className="cr-eyebrow text-[color:var(--gold)] !text-[0.6rem] tracking-[0.25em] font-bold opacity-80">{title}</h4>
      <nav className="flex flex-col gap-2.5" aria-label={`Navegación de ${title}`}>
        {children}
      </nav>
    </div>
  );
}

function FooterLink({ to, params, children }: { to: string; params?: any; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      params={params}
      className="text-[0.78rem] text-[color:var(--ash)] hover:text-[color:var(--gold2)] transition-all duration-500 py-0.5 inline-flex items-center group opacity-70 hover:opacity-100"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[color:var(--gold)] transition-all duration-700 group-hover:w-full opacity-30" />
      </span>
    </Link>
  );
}

function FooterSocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (!href || href === "#") return null;
  return (
    <a 
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-[0.78rem] text-[color:var(--ash)] hover:text-[color:var(--gold2)] transition-all duration-500 py-0.5 inline-flex items-center group opacity-70 hover:opacity-100"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[color:var(--gold)] transition-all duration-700 group-hover:w-full opacity-30" />
      </span>
      <ArrowRight className="w-3 h-3 ml-1.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[color:var(--gold)]" />
    </a>
  );
}
