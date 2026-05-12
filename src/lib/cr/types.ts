export type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "mantra"; text: string }
  | { type: "practice"; title: string; steps: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "image"; src: string; alt: string; caption?: string; sourcePage?: number };

export interface Conferencia {
  id: string;
  collection: "conferencias";
  phase: "A" | "B";
  number: string;
  title: string;
  page: number;
  pageStart: number;
  pageEnd: number;
  summary: string;
  tags: string[];
  related: string[];
  sourcePdf: string;
  sourcePages: number[];
  images: { id: string; src: string; alt: string; caption?: string; sourcePage: number }[];
  content: Block[];
}

export interface Yo {
  id: string;
  collection: "yoes";
  title: string;
  summary: string;
  excerpt?: string;
  tags: string[];
  related: string[];
  status: "completo" | "incompleto" | "draft";
  source: string;
  missingSource: boolean;
  content: Block[];
  date: string; // ISO date string format YYYY-MM-DD
  category: string;
  center?: "intelectual" | "emocional" | "motor" | "instintivo" | "sexual";
  level: "inicial" | "intermedio" | "avanzado";
  featured?: boolean;
  recommended?: boolean;
  readingTime?: number; // in minutes
}

export interface ConferenciaFaseB {
  id: string;
  number: number;
  title: string;
  summary: string;
  type: "practica" | "doctrina" | "simbolo" | "iniciacion";
  content: Block[];
}

export interface Libro {
  id: string;
  title: string;
  author: string;
  type: "gnosis" | "psicologia" | "esoterismo" | "budismo" | "egiptologia" | "yoga" | "tantra" | string;
  description: string;
  cover: string;
  downloadUrl: string;
  year: number;
  pages: number;
}
