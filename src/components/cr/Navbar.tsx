import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import logo from "/assets/logo/logo.png?url";
import { ChevronDown } from "lucide-react";
import { MobileNav, MobileMenuButton } from "./MobileNav";
import { MobileCourseCTA } from "./MobileCourseCTA";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/como-empezar", label: "Cómo empezar" },
  { to: "/conferencias", label: "Conferencias" },
  { to: "/yoes", label: "Estudios de Yoes" },
  { to: "/libros", label: "Libros" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contacto", label: "Contacto" },
];

// Hook personalizado para detectar scroll
function useScroll(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  
  return scrolled;
}

// Hook para bloquear scroll del body
function useLockBodyScroll(lock: boolean) {
  useEffect(() => {
    if (lock) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [lock]);
}

export function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [cursoOpen, setCursoOpen] = useState(false);
  const scrolled = useScroll(12);
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Bloquear scroll cuando el menú móvil está abierto
  useLockBodyScroll(mobileNavOpen);
  
  // Cerrar menú con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileNavOpen) {
        setMobileNavOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileNavOpen]);
  
  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMobileNavOpen(false);
  }, [currentPath]);

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen(prev => !prev);
  }, []);

  const closeMobileNav = useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  return (
    <>
      <header 
        className={`
          fixed inset-x-0 top-0 z-50 
          transition-all duration-300 ease-out
          h-[64px] md:h-[72px] lg:h-auto
          ${scrolled 
            ? "bg-[color-mix(in_oklab,var(--void)_85%,transparent)] backdrop-blur-xl border-b border-[color-mix(in_oklab,var(--gold)_20%,transparent)]" 
            : "bg-transparent"
          }
        `}
      >
        <nav className="mx-auto flex max-w-7xl h-full items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* Logo - siempre visible */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <img 
              src={logo} 
              alt="Conciencia Revolucionaria" 
              className="h-8 w-8 sm:h-9 sm:w-9 object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-200" 
              width="36" 
              height="36"
              fetchPriority="high"
              decoding="async"
            />
            <div className="leading-none hidden sm:block">
              <div className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.2em] text-[var(--ash)]">Conciencia</div>
              <div className="font-display text-base sm:text-lg tracking-wide cr-shimmer">Revolucionaria</div>
            </div>
          </Link>

          {/* Desktop Navigation - ocultar en lg y menor */}
          <div className="hidden xl:flex items-center gap-6 2xl:gap-8">
            {links.map(link => {
              const isActive = currentPath === link.to;
              return (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  className={`
                    text-sm tracking-[0.12em] 2xl:tracking-[0.15em] uppercase 
                    transition-colors duration-200
                    py-2 px-1
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded
                    ${isActive 
                      ? "text-[var(--gold)] font-medium" 
                      : "text-[color-mix(in_oklab,var(--bone)_75%,transparent)] hover:text-[var(--gold)]"
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {/* Menú desplegable Tomar Curso - Desktop */}
            <div className="relative">
              <button 
                onClick={() => setCursoOpen(!cursoOpen)}
                onBlur={() => setTimeout(() => setCursoOpen(false), 150)}
                className="
                  cr-btn cr-btn-gold 
                  !py-2 !px-4 2xl:!py-2.5 2xl:!px-5 
                  !text-[0.65rem] 2xl:!text-[0.7rem] 
                  flex items-center gap-1.5 2xl:gap-2
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                "
                aria-expanded={cursoOpen}
                aria-haspopup="true"
              >
                Tomar Curso
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${cursoOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {cursoOpen && (
                <div 
                  className="
                    absolute top-full right-0 mt-2 w-56 
                    cr-glass cr-luxury-border rounded-xl overflow-hidden 
                    animate-in fade-in slide-in-from-top-1 duration-200
                    shadow-xl shadow-black/30
                  "
                >
                  <Link 
                    to="/conferencias-fase-a" 
                    className="
                      block px-4 py-3 
                      hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] 
                      transition-colors duration-150
                      border-b border-[color-mix(in_oklab,var(--gold)_15%,transparent)]
                    "
                  >
                    <span className="block text-[0.65rem] uppercase tracking-[0.16em] text-[var(--ash)] mb-1">Comenzar aquí</span>
                    <span className="font-display text-sm text-[var(--bone)]">Fase A — Fundamentos</span>
                  </Link>
                  <Link 
                    to="/conferencias-fase-b" 
                    className="
                      block px-4 py-3 
                      hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] 
                      transition-colors duration-150
                    "
                  >
                    <span className="block text-[0.65rem] uppercase tracking-[0.16em] text-[var(--ash)] mb-1">Profundización</span>
                    <span className="font-display text-sm text-[var(--bone)]">Fase B — Esoterismo</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Tablet Navigation - entre md y lg */}
          <div className="hidden md:flex xl:hidden items-center gap-4">
            {/* Solo mostrar links esenciales en tablet */}
            {links.slice(0, 4).map(link => {
              const isActive = currentPath === link.to;
              return (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  className={`
                    text-xs tracking-[0.1em] uppercase 
                    transition-colors duration-200
                    py-2 px-1
                    ${isActive 
                      ? "text-[var(--gold)]" 
                      : "text-[color-mix(in_oklab,var(--bone)_70%,transparent)] hover:text-[var(--gold)]"
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
            
            <Link 
              to="/como-empezar"
              className="cr-btn cr-btn-gold !py-2 !px-3 !text-[0.6rem]"
            >
              Tomar Curso
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <MobileMenuButton 
            isOpen={mobileNavOpen} 
            onClick={toggleMobileNav} 
          />
        </nav>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav 
        isOpen={mobileNavOpen}
        onClose={closeMobileNav}
        links={links}
        currentPath={currentPath}
      />

      {/* Mobile Bottom CTA */}
      <MobileCourseCTA isNavOpen={mobileNavOpen} />
    </>
  );
}
