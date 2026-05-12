import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { FooterCTA } from "./FooterCTA";
import { FooterColumn, FooterLink } from "./FooterColumn";
import { FooterSitemap } from "./FooterSitemap";
import { SocialLinks } from "./SocialLinks";

const WHATSAPP_URL = "https://wa.me/573022323472";
const WHATSAPP_LABEL = "+57 302 232 3472";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="relative mt-auto overflow-hidden bg-[color:var(--void)]"
    >
      {/* Top hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:color-mix(in_oklab,var(--gold)_40%,transparent)] to-transparent opacity-60"
      />
      {/* Single muted ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 left-1/2 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-[color:var(--gold)] opacity-[0.035] blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8 md:px-10 pt-14 pb-8 md:pt-16 md:pb-10">
        {/* A. CTA */}
        <FooterCTA />

        {/* B. Navigation */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
          {/* Brand — full width on mobile, 4/12 desktop */}
          <div className="col-span-2 space-y-5 lg:col-span-4 lg:pr-6">
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[color:color-mix(in_oklab,var(--gold)_22%,transparent)] bg-[color:color-mix(in_oklab,var(--gold)_8%,transparent)] font-display text-lg font-semibold text-[color:var(--gold2)] transition-colors duration-200 group-hover:border-[color:color-mix(in_oklab,var(--gold)_55%,transparent)]">
                C
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[0.55rem] font-medium uppercase tracking-[0.3em] text-[color:var(--ash)] opacity-55">
                  Conciencia
                </span>
                <span className="font-display text-[1.05rem] tracking-tight text-[color:var(--bone)]">
                  Revolucionaria
                </span>
              </span>
            </Link>
            <p className="max-w-[330px] text-[0.875rem] leading-[1.65] text-[color:color-mix(in_oklab,var(--ash)_88%,var(--bone))] opacity-90">
              Difusión gratuita del conocimiento de sí mismo para el despertar
              de la conciencia y la liberación del ser.
            </p>
            <p className="font-display italic text-[0.95rem] tracking-wide text-[color:color-mix(in_oklab,var(--gold2)_75%,var(--bone))] opacity-80">
              "Conócete a ti mismo."
            </p>
          </div>

          {/* Estudio */}
          <div className="lg:col-span-2">
            <FooterColumn title="Estudio" ariaLabel="Sección de estudio">
              <FooterLink to="/conferencias">Biblioteca</FooterLink>
              <FooterLink to="/como-empezar">Cómo empezar</FooterLink>
              <FooterLink to="/conferencia/$id" params={{ id: "fase-a-01" }}>
                Conf. 01
              </FooterLink>
              <FooterLink to="/conferencias-fase-a">Fase A</FooterLink>
              <FooterLink to="/conferencias-fase-b">Fase B</FooterLink>
              <FooterLink to="/libros">Libros</FooterLink>
            </FooterColumn>
          </div>

          {/* Yoes */}
          <div className="lg:col-span-2">
            <FooterColumn title="Yoes" ariaLabel="Estudios de yoes">
              <FooterLink to="/yoes">Estudios de Yoes</FooterLink>
              <FooterLink to="/yoes">Yo de la semana</FooterLink>
              <FooterLink to="/yoes">Yoes básicos</FooterLink>
              <FooterLink to="/yoes">Yoes emocionales</FooterLink>
              <FooterLink to="/yoes">Yoes de relación</FooterLink>
              <FooterLink to="/yoes">Vida moderna</FooterLink>
            </FooterColumn>
          </div>

          {/* Comunidad */}
          <div className="lg:col-span-2">
            <FooterColumn title="Comunidad" ariaLabel="Comunidad y redes">
              <SocialLinks />
            </FooterColumn>
          </div>

          {/* Contacto */}
          <div className="col-span-2 space-y-4 lg:col-span-2">
            <h4 className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[color:color-mix(in_oklab,var(--gold)_70%,var(--bone))]">
              Contacto
            </h4>
            <div className="space-y-1">
              <span className="block text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[color:var(--ash)] opacity-50">
                WhatsApp
              </span>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-[color:var(--bone)] transition-colors hover:text-[color:var(--gold2)]"
              >
                <Phone className="h-3.5 w-3.5 text-[color:color-mix(in_oklab,var(--gold)_75%,transparent)]" />
                {WHATSAPP_LABEL}
              </a>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="cr-btn cr-btn-gold w-full max-w-[320px] justify-center !py-2.5 !px-4 !text-[0.65rem] !tracking-[0.18em] !font-bold"
            >
              <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
              Escribir por WhatsApp
            </a>
            <div className="pt-1">
              <FooterLink to="/contacto">Formulario de contacto</FooterLink>
            </div>
          </div>
        </div>

        {/* Mini Mapa del sitio */}
        <FooterSitemap />

        {/* Tight divider */}
        <div className="mt-10 mb-5 h-px bg-gradient-to-r from-transparent via-[color:color-mix(in_oklab,var(--gold)_22%,transparent)] to-transparent opacity-60" />

        {/* C. Legal */}
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <div className="flex flex-col items-center gap-1.5 text-center md:flex-row md:gap-4 md:text-left">
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-[color:var(--ash)] opacity-55">
              © {year} Conciencia Revolucionaria
            </p>
            <span aria-hidden className="hidden h-3 w-px bg-[color:var(--gold)] opacity-15 md:block" />
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] italic text-[color:color-mix(in_oklab,var(--gold)_70%,var(--ash))] opacity-65">
              Difusión gratuita · Sin fines de lucro
            </p>
          </div>

          <nav aria-label="Enlaces legales" className="flex items-center gap-5">
            {[
              { to: "/sobre", label: "Privacidad" },
              { to: "/contacto", label: "Contacto" },
              { to: "/", label: "Inicio" },
            ].map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[color:var(--ash)] opacity-60 transition-colors hover:text-[color:var(--gold2)] hover:opacity-100"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
