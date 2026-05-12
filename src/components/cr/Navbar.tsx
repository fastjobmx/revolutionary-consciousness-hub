import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState, useCallback, useRef } from "react";
import logo from "/assets/logo/logo.png?url";
import { ChevronDown, BookOpen, Search, Sparkles, Target, Zap, Heart, MessageCircle, MapPin, Monitor } from "lucide-react";
import { MobileNav, MobileMenuButton } from "./MobileNav";
import { MobileCourseCTA } from "./MobileCourseCTA";
import { NavMegaMenu, NavMegaMenuCard } from "./NavMegaMenu";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/como-empezar", label: "Cómo empezar" },
  { to: "/conferencias", label: "Conferencias", hasMega: "conferencias" },
  { to: "/yoes", label: "Estudios de Yoes", hasMega: "yoes" },
  { to: "/libros", label: "Libros" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contacto", label: "Contacto" },
];

function useScroll(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [cursoOpen, setCursoOpen] = useState(false);
  const scrolled = useScroll(20);
  const location = useLocation();
  const currentPath = location.pathname;
  const cursoRef = useRef<HTMLDivElement>(null);
  const megaTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMega(null);
        setCursoOpen(false);
        setMobileNavOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
    setActiveMega(null);
    setCursoOpen(false);
  }, [currentPath]);

  const handleMouseEnter = (mega: string) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setActiveMega(mega);
  };

  const handleMouseLeave = () => {
    megaTimeoutRef.current = setTimeout(() => {
      setActiveMega(null);
    }, 150);
  };

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-50
          transition-all duration-500 ease-in-out
          ${scrolled
            ? "h-[64px] bg-[color-mix(in_oklab,var(--void)_92%,transparent)] backdrop-blur-2xl border-b border-[color-mix(in_oklab,var(--gold)_10%,transparent)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "h-[80px] bg-transparent"
          }
        `}
      >
        <nav className="mx-auto flex max-w-7xl h-full items-center justify-between px-4 sm:px-6 lg:px-10">
          
          {/* LOGO AREA */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0 relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-[color:var(--gold)] blur-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-700" />
              <img
                src={logo}
                alt="Conciencia Revolucionaria"
                className="h-7 w-7 sm:h-8 sm:w-8 object-contain opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="cr-eyebrow text-[0.52rem] tracking-[0.3em] mb-0.5 opacity-60 font-light">Conciencia</span>
              <span className="font-display text-base sm:text-lg lg:text-xl cr-shimmer tracking-tight font-medium">Revolucionaria</span>
            </div>
          </Link>

          {/* DESKTOP NAV CENTER */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {links.map(link => {
              const isActive = currentPath === link.to || (link.to !== '/' && currentPath.startsWith(link.to));
              return (
                <div 
                  key={link.to} 
                  className="relative group/link"
                  onMouseEnter={() => link.hasMega && handleMouseEnter(link.hasMega)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={link.to}
                    className={`
                      relative text-[0.62rem] xl:text-[0.65rem] tracking-[0.2em] uppercase font-bold
                      transition-all duration-400 py-2.5 px-3 xl:px-4 rounded-lg
                      ${isActive
                        ? "text-[color:var(--gold)]"
                        : "text-[color:var(--ash)] hover:text-[color:var(--bone)]"
                      }
                    `}
                  >
                    <span className="relative z-10">{link.label}</span>
                    
                    {/* Active/Hover Indicator */}
                    <div className={`
                      absolute bottom-1 left-1/2 -translate-x-1/2 h-[1px] bg-[color:var(--gold)] transition-all duration-500
                      ${isActive ? "w-4 opacity-100" : "w-0 opacity-0 group-hover/link:w-2 group-hover/link:opacity-50"}
                    `} />
                    
                    <div className="absolute inset-0 bg-[color-mix(in_oklab,var(--gold)_4%,transparent)] opacity-0 group-hover/link:opacity-100 rounded-lg transition-opacity duration-500" />
                  </Link>

                  {/* Mega Menus */}
                  {link.hasMega === "conferencias" && activeMega === "conferencias" && (
                    <NavMegaMenu isOpen={true} onClose={() => setActiveMega(null)}>
                      <div className="grid grid-cols-2 gap-4">
                        <NavMegaMenuCard 
                          to="/conferencias-fase-a" 
                          title="Fase A" 
                          description="50 conferencias fundamentales para despertar la conciencia."
                          icon={<Target className="w-5 h-5" />}
                          badge="50 Temas"
                        />
                        <NavMegaMenuCard 
                          to="/conferencias-fase-b" 
                          title="Fase B" 
                          description="25 conferencias avanzadas de profundización práctica."
                          icon={<Sparkles className="w-5 h-5" />}
                          badge="25 Temas"
                        />
                        <NavMegaMenuCard 
                          to="/como-empezar" 
                          title="Cómo empezar" 
                          description="Guía paso a paso para iniciar tu curso hoy mismo."
                          icon={<Zap className="w-5 h-5" />}
                        />
                        <NavMegaMenuCard 
                          to="/conferencias" 
                          title="Ver Biblioteca" 
                          description="Explora todo el catálogo de conferencias gratuitas."
                          icon={<BookOpen className="w-5 h-5" />}
                        />
                      </div>
                    </NavMegaMenu>
                  )}

                  {link.hasMega === "yoes" && activeMega === "yoes" && (
                    <NavMegaMenu isOpen={true} onClose={() => setActiveMega(null)}>
                      <div className="grid grid-cols-2 gap-4">
                        <NavMegaMenuCard 
                          to="/yoes" 
                          title="Yo de la semana" 
                          description="Estudio práctico recomendado para el trabajo diario."
                          icon={<Heart className="w-5 h-5" />}
                          badge="Recomendado"
                        />
                        <NavMegaMenuCard 
                          to="/yoes" 
                          title="Yoes básicos" 
                          description="Fundamentos para la auto-observación del ego."
                          icon={<Target className="w-5 h-5" />}
                        />
                        <NavMegaMenuCard 
                          to="/yoes" 
                          title="Vida Moderna" 
                          description="Redes sociales, celular, dinero y consumo."
                          icon={<Zap className="w-5 h-5" />}
                        />
                        <NavMegaMenuCard 
                          to="/yoes" 
                          title="Ver todos" 
                          description="Explora los más de 70 estudios disponibles."
                          icon={<BookOpen className="w-5 h-5" />}
                        />
                      </div>
                    </NavMegaMenu>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT ACTION */}
          <div className="hidden lg:flex items-center gap-4 relative" ref={cursoRef}>
            <button
              onMouseEnter={() => setCursoOpen(true)}
              onClick={() => setCursoOpen(!cursoOpen)}
              className="
                cr-btn cr-btn-gold !py-2 !px-5 !text-[0.6rem] !font-black
                flex items-center gap-1.5 group/cta shadow-[0_10px_30px_-10px_rgba(198,161,91,0.3)]
                hover:shadow-[0_15px_40px_-10px_rgba(198,161,91,0.5)] transition-all duration-500
              "
              aria-expanded={cursoOpen}
            >
              Tomar curso
              <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${cursoOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* CTA Dropdown */}
            {cursoOpen && (
              <div 
                className="absolute top-full right-0 mt-3 w-60 z-50 animate-in fade-in slide-in-from-top-2 duration-500"
                onMouseLeave={() => setCursoOpen(false)}
              >
                <div className="cr-glass cr-luxury-border rounded-xl overflow-hidden shadow-2xl p-1.5 space-y-0.5">
                  <DropdownLink to="/conferencias-fase-a" icon={<Monitor className="w-3.5 h-3.5" />} title="Curso Online" />
                  <DropdownLink to="/contacto" icon={<MapPin className="w-3.5 h-3.5" />} title="Salas Presenciales" />
                  <a href="https://wa.me/..." target="_blank" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] transition-all group">
                    <MessageCircle className="w-3.5 h-3.5 text-[color:var(--gold)]" />
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[color:var(--bone)] group-hover:text-[color:var(--gold)]">Grupo WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <MobileMenuButton isOpen={mobileNavOpen} onClick={() => setMobileNavOpen(!mobileNavOpen)} />
        </nav>
      </header>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} links={links} currentPath={currentPath} />
      {!mobileNavOpen && <MobileCourseCTA isNavOpen={mobileNavOpen} />}
    </>
  );
}

function DropdownLink({ to, icon, title }: { to: string; icon: any; title: string }) {
  return (
    <Link to={to} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] transition-all group">
      <div className="text-[color:var(--gold)]">{icon}</div>
      <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--bone)] group-hover:text-[color:var(--gold)]">{title}</span>
    </Link>
  );
}
