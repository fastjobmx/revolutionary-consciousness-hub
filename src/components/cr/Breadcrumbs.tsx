import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`mb-6 ${className}`}>
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        <li>
          <Link to="/" className="text-[color:var(--ash)] hover:text-[color:var(--gold)] transition">
            Inicio
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-[color:var(--ash)]" />
            {item.to ? (
              <Link 
                to={item.to} 
                className="text-[color:var(--ash)] hover:text-[color:var(--gold)] transition"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[color:var(--gold)]" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
