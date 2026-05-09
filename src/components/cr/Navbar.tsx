import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "/assets/logo/logo.png?url";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/conferencias", label: "Conferencias" },
  { to: "/yoes", label: "Estudios de Yoes" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 cr-hide-on-focus ${scrolled ? "py-3 backdrop-blur-md bg-[color-mix(in_oklab,var(--void)_72%,transparent)] border-b border-[color-mix(in_oklab,var(--gold)_20%,transparent)]" : "py-5"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Conciencia Revolucionaria" className="h-9 w-9 object-contain opacity-90 group-hover:opacity-100 transition" />
          <div className="leading-none">
            <div className="cr-eyebrow text-[0.6rem]">Conciencia</div>
            <div className="font-display text-lg tracking-wide cr-shimmer">Revolucionaria</div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.to} to={l.to} className="text-sm tracking-[0.18em] uppercase text-[color-mix(in_oklab,var(--bone)_80%,transparent)] hover:text-[color:var(--gold2)] transition" activeProps={{ className: "text-[color:var(--gold2)]" }}>
              {l.label}
            </Link>
          ))}
          <Link to="/conferencias" className="cr-btn cr-btn-gold !py-2.5 !px-5 !text-[0.7rem]">Explorar Biblioteca</Link>
        </div>
        <button className="md:hidden cr-btn cr-btn-ghost !py-2 !px-3 !text-[0.65rem]" onClick={() => setOpen(o => !o)} aria-label="Menú">
          {open ? "Cerrar" : "Menú"}
        </button>
      </nav>
      {open && (
        <div className="md:hidden mx-5 mt-3 cr-glass rounded-xl p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm tracking-[0.18em] uppercase">{l.label}</Link>
          ))}
          <Link to="/conferencias" onClick={() => setOpen(false)} className="cr-btn cr-btn-gold !text-[0.7rem]">Explorar Biblioteca</Link>
        </div>
      )}
    </header>
  );
}
