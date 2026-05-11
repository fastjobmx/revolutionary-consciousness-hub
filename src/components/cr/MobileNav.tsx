import { Link } from "@tanstack/react-router";
import { X, Menu } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ to: string; label: string }>;
  currentPath: string;
}

export function MobileNav({ isOpen, onClose, links, currentPath }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay oscuro */}
      <div 
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer lateral derecho */}
      <div 
        className="fixed top-0 right-0 bottom-0 w-[min(85vw,380px)] z-50 bg-[var(--obsidian)] border-l border-[color-mix(in_oklab,var(--gold)_30%,transparent)] shadow-2xl animate-in slide-in-from-right-full duration-300 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación móvil"
      >
        {/* Header del drawer */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[color-mix(in_oklab,var(--gold)_15%,transparent)]">
          <span className="font-display text-xl text-[var(--gold)] tracking-wide">
            Menú
          </span>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] transition-colors focus:outline-none"
            aria-label="Cerrar menú"
          >
            <X className="w-7 h-7 text-[var(--bone)]" />
          </button>
        </div>

        {/* Links de navegación */}
        <nav className="px-6 py-8 flex flex-col gap-1 overflow-y-auto">
          {links.map((link) => {
            const isActive = currentPath === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={`
                  py-4 px-5 rounded-xl text-lg font-medium transition-all duration-300
                  min-h-[52px] flex items-center
                  ${isActive 
                    ? "bg-[color-mix(in_oklab,var(--gold)_12%,transparent)] text-[var(--gold2)] border border-[color-mix(in_oklab,var(--gold)_30%,transparent)] shadow-inner" 
                    : "text-[var(--bone)] hover:bg-[color-mix(in_oklab,var(--gold)_5%,transparent)] hover:text-[var(--gold)]"
                  }
                `}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Sección de curso */}
        <div className="px-6 py-8 mt-auto border-t border-[color-mix(in_oklab,var(--gold)_15%,transparent)] bg-[color-mix(in_oklab,var(--ink)_50%,transparent)]">
          <span className="text-[0.65rem] uppercase tracking-[0.25em] text-[color:var(--ash)] mb-4 block font-semibold">
            Comienza tu camino
          </span>
          
          <div className="flex flex-col gap-4 pb-[env(safe-area-inset-bottom)]">
            <Link
              to="/como-empezar"
              onClick={onClose}
              className="
                py-4 px-6 rounded-xl bg-[var(--gold)] text-[var(--ink)] 
                text-center font-semibold shadow-lg shadow-[var(--gold)]/10
                active:scale-[0.98] transition-all duration-200
              "
            >
              <span className="block text-[0.6rem] uppercase tracking-[0.2em] opacity-80 mb-0.5">
                Comenzar aquí
              </span>
              <span className="font-display text-lg">Fase A — Fundamentos</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// Botón hamburguesa mejorado
interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        lg:hidden p-2.5 rounded-lg
        text-[var(--bone)] hover:text-[var(--gold)]
        hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)]
        transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]
      "
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}
