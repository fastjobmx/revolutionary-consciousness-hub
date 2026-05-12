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
    <div className="space-y-4">
      <h4 className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[color:color-mix(in_oklab,var(--gold)_70%,var(--bone))]">
        {title}
      </h4>
      <nav
        aria-label={ariaLabel ?? title}
        className="flex flex-col gap-0.5"
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
    "group relative inline-flex w-fit items-center min-h-[36px] py-1 text-[0.875rem] leading-snug text-[color:color-mix(in_oklab,var(--bone)_78%,var(--ash))] transition-colors duration-200 hover:text-[color:var(--gold2)] focus-visible:text-[color:var(--gold2)]";
  const inner = (
    <span className="relative">
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[color:color-mix(in_oklab,var(--gold)_70%,transparent)] transition-all duration-200 group-hover:w-full group-focus-visible:w-full" />
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
