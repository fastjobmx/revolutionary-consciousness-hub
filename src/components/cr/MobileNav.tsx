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
        className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[360px] z-50 bg-[var(--obsidian)] border-l border-[color-mix(in_oklab,var(--gold)_30%,transparent)] shadow-2xl animate-in slide-in-from-right-full duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación móvil"
      >
        {/* Header del drawer */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[color-mix(in_oklab,var(--gold)_15%,transparent)]">
          <span className="font-display text-lg text-[var(--gold)] tracking-wide">
            Menú
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
            aria-label="Cerrar menú"
          >
            <X className="w-6 h-6 text-[var(--bone)]" />
          </button>
        </div>

        {/* Links de navegación */}
        <nav className="px-5 py-6 flex flex-col gap-2">
          {links.map((link) => {
            const isActive = currentPath === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={`
                  py-3.5 px-4 rounded-lg text-base font-medium transition-all duration-200
                  min-h-[44px] flex items-center
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]
                  ${isActive 
                    ? "bg-[color-mix(in_oklab,var(--gold)_15%,transparent)] text-[var(--gold2)] border border-[color-mix(in_oklab,var(--gold)_40%,transparent)]" 
                    : "text-[var(--bone)] hover:bg-[color-mix(in_oklab,var(--gold)_8%,transparent)] hover:text-[var(--gold)]"
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
        <div className="px-5 py-6 mt-auto border-t border-[color-mix(in_oklab,var(--gold)_15%,transparent)]">
          <span className="text-[0.7rem] uppercase tracking-[0.2em] text-[var(--ash)] mb-3 block">
            Comienza tu camino
          </span>
          
          <div className="flex flex-col gap-3">
            <Link
              to="/conferencias-fase-a"
              onClick={onClose}
              className="
                py-4 px-4 rounded-lg bg-[var(--gold)] text-[var(--ink)] 
                text-center font-medium text-sm
                hover:bg-[var(--gold2)] transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--obsidian)]
              "
            >
              <span className="block text-[0.65rem] uppercase tracking-[0.15em] opacity-80 mb-1">
                Comenzar aquí
              </span>
              <span className="font-display text-base">Fase A — Fundamentos</span>
            </Link>
            
            <Link
              to="/conferencias-fase-b"
              onClick={onClose}
              className="
                py-3 px-4 rounded-lg border border-[color-mix(in_oklab,var(--gold)_50%,transparent)] 
                text-[var(--bone)] text-center font-medium text-sm
                hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] hover:border-[var(--gold)] transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]
              "
            >
              <span className="block text-[0.65rem] uppercase tracking-[0.15em] text-[var(--ash)] mb-1">
                Profundización
              </span>
              <span className="font-display text-base">Fase B — Esoterismo</span>
            </Link>
          </div>
        </div>

        {/* Footer con info */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-[color-mix(in_oklab,var(--gold)_10%,transparent)]">
          <p className="text-[0.7rem] text-[var(--ash)] text-center tracking-wide">
            Conciencia Revolucionaria
          </p>
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
