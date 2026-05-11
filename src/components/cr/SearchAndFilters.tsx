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
        <div className="space-y-4">
          {filters.map((filter, idx) => (
            <div key={idx} className="flex flex-wrap items-center gap-2">
              {filter.label && (
                <span className="text-[0.65rem] uppercase tracking-[0.16em] text-[color:var(--ash)] mr-2">
                  {filter.label}:
                </span>
              )}
              {filter.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => filter.onChange(option.id)}
                  className={`text-[0.65rem] tracking-[0.16em] uppercase px-3 py-1.5 rounded-full border transition ${
                    filter.value === option.id
                      ? "bg-[color:var(--gold)] text-[color:var(--ink)] border-[color:var(--gold)]"
                      : "border-[color-mix(in_oklab,var(--gold)_25%,transparent)] hover:border-[color:var(--gold)]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
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
