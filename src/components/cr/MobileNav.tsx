import { Link } from "@tanstack/react-router";
import { X, Menu, ChevronRight, Monitor, MapPin, MessageCircle, Info, Sparkles, BookOpen } from "lucide-react";
import logo from "/assets/logo/logo.png?url";
import { useState } from "react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ to: string; label: string; hasMega?: string }>;
  currentPath: string;
}

export function MobileNav({ isOpen, onClose, links, currentPath }: MobileNavProps) {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleAccordion = (key: string) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-black/85 backdrop-blur-xl animate-in fade-in duration-700"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div 
        className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] z-50 bg-[var(--obsidian)] border-l border-[color-mix(in_oklab,var(--gold)_15%,transparent)] shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-in slide-in-from-right duration-700 flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Drawer */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-[color-mix(in_oklab,var(--gold)_8%,transparent)] bg-[color:var(--ink)]">
          <Link to="/" onClick={onClose} className="flex items-center gap-2 group">
            <img src={logo} alt="Logo" className="h-6 w-6 opacity-80 group-active:opacity-100 transition-opacity" />
            <span className="font-display text-base tracking-tight cr-shimmer font-medium">Conciencia</span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[color-mix(in_oklab,var(--gold)_8%,transparent)] text-[var(--gold)] active:scale-90 transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-none py-6 px-3 space-y-1">
          {links.map((link) => {
            const isActive = currentPath === link.to;
            const hasSubmenu = !!link.hasMega;

            return (
              <div key={link.to} className="space-y-0.5">
                <div className="flex items-center">
                  <Link
                    to={link.to}
                    onClick={onClose}
                    className={`
                      flex-1 py-3.5 px-5 rounded-lg text-[0.72rem] uppercase tracking-[0.25em] font-bold transition-all duration-500
                      ${isActive 
                        ? "text-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_6%,transparent)]" 
                        : "text-[var(--ash)] active:text-[var(--bone)] active:bg-[color-mix(in_oklab,var(--gold)_4%,transparent)]"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                  {hasSubmenu && (
                    <button 
                      onClick={() => toggleAccordion(link.hasMega!)}
                      className="p-3.5 text-[var(--gold)] opacity-40 active:opacity-100 transition-opacity"
                    >
                      <ChevronRight className={`w-4 h-4 transition-transform duration-500 ${activeAccordion === link.hasMega ? 'rotate-90' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Submenus (Accordion style) */}
                {hasSubmenu && activeAccordion === link.hasMega && (
                  <div className="ml-5 pl-5 border-l border-[color-mix(in_oklab,var(--gold)_10%,transparent)] py-1 space-y-1 animate-in slide-in-from-top-1 duration-500">
                    {link.hasMega === "conferencias" && (
                      <>
                        <SubMenuLink to="/conferencias-fase-a" label="Fase A — Fundamentos" onClick={onClose} />
                        <SubMenuLink to="/conferencias-fase-b" label="Fase B — Esoterismo" onClick={onClose} />
                        <SubMenuLink to="/como-empezar" label="Cómo empezar" onClick={onClose} />
                      </>
                    )}
                    {link.hasMega === "yoes" && (
                      <>
                        <SubMenuLink to="/yoes" label="Yo de la semana" onClick={onClose} />
                        <SubMenuLink to="/yoes" label="Yoes básicos" onClick={onClose} />
                        <SubMenuLink to="/yoes" label="Ver biblioteca viva" onClick={onClose} />
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Drawer / CTA */}
        <div className="p-6 bg-[color:var(--ink)] border-t border-[color-mix(in_oklab,var(--gold)_8%,transparent)] space-y-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <Link
            to="/como-empezar"
            onClick={onClose}
            className="cr-btn cr-btn-gold w-full justify-center min-h-[48px] !text-[0.65rem] !font-black shadow-[0_10px_30px_-5px_rgba(198,161,91,0.2)]"
          >
            <Sparkles className="w-3.5 h-3.5 mr-2" />
            Tomar curso gratuito
          </Link>
          <div className="text-center">
            <span className="text-[0.55rem] uppercase tracking-[0.4em] text-[color:var(--ash)] opacity-30 font-medium">Conócete a ti mismo</span>
          </div>
        </div>
      </div>
    </>
  );
}

function SubMenuLink({ to, label, onClick }: { to: string; label: string; onClick: () => void }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="flex items-center justify-between group py-2.5 px-2 rounded-md active:bg-[color-mix(in_oklab,var(--gold)_4%,transparent)] transition-all"
    >
      <span className="text-[0.75rem] text-[var(--ash)] group-active:text-[var(--gold)] transition-colors duration-500">{label}</span>
      <ChevronRight className="w-3 h-3 text-[var(--gold)] opacity-0 group-active:opacity-100 transition-opacity" />
    </Link>
  );
}

export function MobileMenuButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2.5 rounded-full bg-[color-mix(in_oklab,var(--gold)_8%,transparent)] text-[var(--gold)] active:scale-90 transition-all duration-500 shadow-lg shadow-black/20"
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    </button>
  );
}
