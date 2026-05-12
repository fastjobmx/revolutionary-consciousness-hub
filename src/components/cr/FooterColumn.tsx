import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function FooterColumn({
  title,
  ariaLabel,
  children,
}: {
  title: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-5">
      <h4 className="cr-eyebrow !text-[0.62rem] tracking-[0.28em] font-semibold text-[color:var(--gold)] opacity-90">
        {title}
      </h4>
      <nav
        aria-label={ariaLabel ?? title}
        className="flex flex-col gap-1"
      >
        {children}
      </nav>
    </div>
  );
}

type LinkProps = {
  to?: string;
  href?: string;
  params?: Record<string, string>;
  external?: boolean;
  children: ReactNode;
};

export function FooterLink({ to, href, params, external, children }: LinkProps) {
  const className =
    "group inline-flex items-center min-h-[44px] py-1.5 text-[0.86rem] text-[color:color-mix(in_oklab,var(--bone)_82%,var(--ash))] hover:text-[color:var(--gold2)] transition-colors duration-200 focus-visible:text-[color:var(--gold2)]";
  const inner = (
    <span className="relative">
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[color:var(--gold)] opacity-60 transition-all duration-200 group-hover:w-full group-focus-visible:w-full" />
    </span>
  );

  if (external && href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {inner}
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to as any} params={params as any} className={className}>
        {inner}
      </Link>
    );
  }
  return null;
}
