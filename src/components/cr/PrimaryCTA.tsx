import { Link } from "@tanstack/react-router";
import { useReveal } from "./Reveal";
import { ArrowRight } from "lucide-react";

interface PrimaryCTAProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle: string;
  primaryAction: {
    label: string;
    to: string;
    params?: Record<string, string>;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export function PrimaryCTA({
  eyebrow,
  title,
  highlight,
  subtitle,
  primaryAction,
  secondaryAction
}: PrimaryCTAProps) {
  const ref = useReveal();
  
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="cr-halo" style={{ inset: "20% 25%" }} />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        {eyebrow && <div className="cr-eyebrow cr-reveal mb-6">{eyebrow}</div>}
        <h2 className="cr-display text-4xl md:text-5xl mb-8 cr-reveal">
          {highlight ? (
            <>
              {title} <span className="cr-gold-text italic">{highlight}</span>
            </>
          ) : (
            title
          )}
        </h2>
        <p className="text-[color:var(--ash)] max-w-xl mx-auto mb-10 cr-reveal">
          {subtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-4 cr-reveal">
          <Link 
            to={primaryAction.to} 
            params={primaryAction.params}
            className="cr-btn cr-btn-gold inline-flex items-center gap-2"
          >
            {primaryAction.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
          {secondaryAction && (
            <a 
              href={secondaryAction.href}
              target="_blank"
              rel="noreferrer"
              className="cr-btn cr-btn-ghost"
            >
              {secondaryAction.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
