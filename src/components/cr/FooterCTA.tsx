import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function FooterCTA() {
  return (
    <div className="relative mb-12 md:mb-16">
      <div className="cr-luxury-border relative overflow-hidden rounded-2xl px-5 py-7 sm:px-8 sm:py-8 md:px-10 md:py-9 cr-glass">
        {/* Single muted gold glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-[-10%] h-72 w-72 rounded-full bg-[color:var(--gold)] opacity-[0.06] blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[color:color-mix(in_oklab,var(--gold)_45%,transparent)] to-transparent opacity-70"
        />

        <div className="relative z-10 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-[34rem]">
            <p className="cr-eyebrow mb-2.5 !text-[0.6rem] tracking-[0.32em] text-[color:color-mix(in_oklab,var(--gold)_75%,var(--ash))] opacity-90">
              Llamado interior
            </p>
            <h3 className="font-display text-[1.6rem] leading-[1.12] text-[color:var(--bone)] sm:text-3xl md:text-[2.1rem]">
              Comienza tu <span className="italic text-[color:var(--gold2)]">trabajo interior</span>
            </h3>
            <p className="mt-3.5 text-[0.95rem] leading-relaxed text-[color:color-mix(in_oklab,var(--ash)_92%,var(--bone))] opacity-90">
              Estudia las conferencias, observa tus yoes y lleva la práctica al
              diario vivir.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:shrink-0">
            <Link
              to="/conferencia/$id"
              params={{ id: "fase-a-01" }}
              className="cr-btn cr-btn-gold group w-full justify-center !px-6 !py-3 !text-[0.7rem] !tracking-[0.18em] !font-bold sm:w-auto"
            >
              Comenzar por Conf. 01
              <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/yoes"
              className="cr-btn cr-btn-ghost w-full justify-center !px-6 !py-3 !text-[0.7rem] !tracking-[0.18em] !font-semibold sm:w-auto"
            >
              Estudiar Yo de la Semana
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
