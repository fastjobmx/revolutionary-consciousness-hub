import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { SOCIAL } from "@/lib/cr/queries";
import { FooterCTA } from "./FooterCTA";
import { FooterColumn, FooterLink } from "./FooterColumn";
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
      {/* Top gold hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:color-mix(in_oklab,var(--gold)_55%,transparent)] to-transparent opacity-60"
      />
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-[color:var(--gold)] opacity-[0.04] blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-32 h-[380px] w-[380px] rounded-full bg-[color:var(--ember)] opacity-[0.05] blur-[140px]"
      />
      {/* Subtle vignette gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[color:color-mix(in_oklab,var(--obsidian)_60%,transparent)] via-transparent to-[color:var(--void)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-10 pt-16 pb-10 md:pt-20 md:pb-12">
        {/* A. CTA */}
        <FooterCTA />

        {/* B. Navigation */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-4">
            <Link to="/" className="group inline-flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[color:color-mix(in_oklab,var(--gold)_25%,transparent)] bg-[color:color-mix(in_oklab,var(--gold)_10%,transparent)] font-display text-2xl font-semibold text-[color:var(--gold2)] transition-colors duration-200 group-hover:border-[color:var(--gold)]">
                C
              </span>
              <span className="flex flex-col leading-tight">
                <span className="cr-eyebrow !text-[0.55rem] tracking-[0.32em] opacity-60">
                  Conciencia
                </span>
                <span className="font-display text-xl tracking-tight text-[color:var(--bone)]">
                  Revolucionaria
                </span>
              </span>
            </Link>
            <p className="max-w-[340px] text-[0.92rem] leading-relaxed text-[color:var(--ash)] opacity-85">
              Difusión gratuita del conocimiento de sí mismo para el despertar
              de la conciencia y la liberación del ser.
            </p>
            <p className="font-display italic text-[1.05rem] tracking-wide text-[color:var(--gold2)] opacity-70">
              "Conócete a ti mismo."
            </p>
          </div>

          {/* Estudio */}
          <div className="lg:col-span-2">
            <FooterColumn title="Estudio" ariaLabel="Sección de estudio">
              <FooterLink to="/conferencias">Biblioteca de Conferencias</FooterLink>
              <FooterLink to="/como-empezar">Cómo empezar</FooterLink>
              <FooterLink to="/conferencia/$id" params={{ id: "fase-a-01" }}>
                Comenzar por Conf. 01
              </FooterLink>
              <FooterLink to="/conferencias-fase-a">Fase A</FooterLink>
              <FooterLink to="/conferencias-fase-b">Fase B</FooterLink>
              <FooterLink to="/libros">Libros</FooterLink>
            </FooterColumn>
          </div>

          {/* Yoes */}
          <div className="lg:col-span-2">
            <FooterColumn title="Estudios de Yoes" ariaLabel="Estudios de yoes">
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
          <div className="space-y-5 lg:col-span-2">
            <h4 className="cr-eyebrow !text-[0.62rem] tracking-[0.28em] font-semibold text-[color:var(--gold)] opacity-90">
              Contacto
            </h4>
            <div className="space-y-2">
              <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--ash)] opacity-50">
                WhatsApp
              </span>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[0.92rem] font-medium text-[color:var(--bone)] transition-colors hover:text-[color:var(--gold2)]"
              >
                <Phone className="h-3.5 w-3.5 text-[color:var(--gold)]" />
                {WHATSAPP_LABEL}
              </a>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="cr-btn cr-btn-gold w-full max-w-[360px] justify-center !py-3 !px-4 !text-[0.65rem] !font-bold"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Escribir por WhatsApp
            </a>
            <FooterLink to="/contacto">Formulario de contacto</FooterLink>
          </div>
        </div>

        {/* Divider */}
        <div className="cr-divider mt-14 mb-8 opacity-60" />

        {/* C. Legal */}
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:items-center">
          <div className="flex flex-col items-center gap-2 text-center md:flex-row md:items-center md:gap-5 md:text-left">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-[color:var(--ash)] opacity-55">
              © {year} Conciencia Revolucionaria
            </p>
            <span aria-hidden className="hidden h-3 w-px bg-[color:var(--gold)] opacity-20 md:block" />
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] italic text-[color:var(--gold)] opacity-60">
              Difusión gratuita del conocimiento de sí mismo
            </p>
          </div>

          <nav
            aria-label="Enlaces legales"
            className="flex items-center gap-6"
          >
            <Link
              to="/sobre"
              className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--ash)] opacity-60 transition-colors hover:text-[color:var(--gold2)] hover:opacity-100"
            >
              Privacidad
            </Link>
            <Link
              to="/contacto"
              className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--ash)] opacity-60 transition-colors hover:text-[color:var(--gold2)] hover:opacity-100"
            >
              Contacto
            </Link>
            <Link
              to="/"
              className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--ash)] opacity-60 transition-colors hover:text-[color:var(--gold2)] hover:opacity-100"
            >
              Inicio
            </Link>
          </nav>
        </div>
      </div>
      {/* Reference imports kept for tree-shaking awareness */}
      <span className="hidden">{SOCIAL.whatsappPhoneRaw}</span>
    </footer>
  );
}
