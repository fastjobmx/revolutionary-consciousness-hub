import { Search } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
}

interface SearchAndFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: {
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
  }[];
  resultCount?: string;
}

export function SearchAndFilters({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  filters = [],
  resultCount
}: SearchAndFiltersProps) {
  return (
    <div className="cr-luxury-border rounded-2xl p-5 md:p-6 cr-glass">
      {/* Buscador */}
      <div className="flex flex-col md:flex-row gap-4 mb-5">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--ash)]" />
          <input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-transparent border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] focus:border-[color:var(--gold)] rounded-full pl-11 pr-5 py-3 outline-none text-sm placeholder:text-[color:var(--ash)] transition"
            aria-label="Buscar"
          />
          {searchValue && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.65rem] text-[color:var(--ash)] hover:text-[color:var(--gold)]"
              onClick={() => onSearchChange("")}
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Filtros */}
      {filters.length > 0 && (
        <div className="space-y-6">
          {filters.map((filter, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              {filter.label && (
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--ash)] font-medium">
                  {filter.label}
                </span>
              )}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1 sm:flex-wrap">
                {filter.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => filter.onChange(option.id)}
                    className={`
                      text-[0.7rem] tracking-[0.12em] uppercase px-4 py-2 rounded-full border transition-all shrink-0
                      min-h-[36px] flex items-center justify-center
                      ${filter.value === option.id
                        ? "bg-[color:var(--gold)] text-[color:var(--ink)] border-[color:var(--gold)] shadow-sm"
                        : "border-[color-mix(in_oklab,var(--gold)_20%,transparent)] text-[color:var(--ash)] hover:border-[color:var(--gold)] hover:text-[color:var(--gold2)]"
                      }
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {resultCount && (
        <div className="mt-4 text-xs text-[color:var(--ash)] tracking-[0.16em] uppercase">
          {resultCount}
        </div>
      )}
    </div>
  );
}
