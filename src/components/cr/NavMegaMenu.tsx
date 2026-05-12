import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";

interface NavMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function NavMegaMenu({ isOpen, onClose, children }: NavMegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-screen max-w-xl z-50 animate-in fade-in slide-in-from-top-1 duration-500"
      onMouseLeave={onClose}
    >
      <div className="cr-glass cr-luxury-border rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-5 md:p-6">
        {children}
      </div>
    </div>
  );
}

interface NavMegaMenuCardProps {
  to: string;
  title: string;
  description: string;
  icon?: ReactNode;
  badge?: string;
  onClick?: () => void;
}

export function NavMegaMenuCard({ to, title, description, icon, badge, onClick }: NavMegaMenuCardProps) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="group block p-3.5 rounded-lg hover:bg-[color-mix(in_oklab,var(--gold)_6%,transparent)] border border-transparent hover:border-[color-mix(in_oklab,var(--gold)_12%,transparent)] transition-all duration-500"
    >
      <div className="flex items-start gap-3.5">
        {icon && (
          <div className="w-9 h-9 rounded-lg bg-[color-mix(in_oklab,var(--gold)_8%,transparent)] flex items-center justify-center text-[color:var(--gold)] group-hover:bg-[color:var(--gold)] group-hover:text-[color:var(--ink)] transition-all shrink-0 duration-500">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="font-display text-base group-hover:text-[color:var(--gold2)] transition-colors duration-500">{title}</h4>
            {badge && (
              <span className="px-1.5 py-0.5 rounded bg-[color:var(--gold)] text-[color:var(--ink)] text-[0.5rem] font-bold uppercase tracking-widest">
                {badge}
              </span>
            )}
          </div>
          <p className="text-[0.68rem] text-[color:var(--ash)] opacity-60 leading-relaxed group-hover:opacity-100 transition-opacity duration-500">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
