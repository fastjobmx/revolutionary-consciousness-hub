import { queryOptions } from "@tanstack/react-query";
import type { Conferencia, Yo, ConferenciaFaseB, Libro } from "./types";
import conferenciasData from "../../../public/data/conferencias.json";
import yoesData from "../../../public/data/yoes.json";
import conferenciasFaseBData from "../../../public/data/conferencias-fase-b.json";
import librosData from "../../../public/data/libros.json";

export const conferenciasQuery = () =>
  queryOptions({
    queryKey: ["conferencias"],
    queryFn: async () => conferenciasData as unknown as Conferencia[],
    staleTime: Infinity,
  });

export const yoesQuery = () =>
  queryOptions({
    queryKey: ["yoes"],
    queryFn: async () => yoesData as unknown as Yo[],
    staleTime: Infinity,
  });

export const conferenciasFaseBQuery = () =>
  queryOptions({
    queryKey: ["conferencias-fase-b"],
    queryFn: async () => conferenciasFaseBData as unknown as ConferenciaFaseB[],
    staleTime: Infinity,
  });

export const librosQuery = () =>
  queryOptions({
    queryKey: ["libros"],
    queryFn: async () => librosData as unknown as Libro[],
    staleTime: Infinity,
  });

export const SOCIAL = {
  whatsappGroup: "https://chat.whatsapp.com/KWamxv5ZAsK2JobCfTkkzF",
  whatsappPhone: "+57 302 232 3472",
  whatsappPhoneRaw: "+573022323472",
  youtube: "https://www.youtube.com/@concienciarevolucionaria",
  instagram: "https://www.instagram.com/concienciarevolucionaria18/",
  tiktok: "https://www.tiktok.com/@concienciarevolucionaria",
  facebook: "https://www.facebook.com/profile.php?id=61550522941805",
};

export const FILTER_TAGS = [
  { id: "todas", label: "Todas" },
  { id: "phase:A", label: "Fase A" },
  { id: "phase:B", label: "Fase B" },
  { id: "psicologia", label: "Psicología" },
  { id: "practica", label: "Práctica" },
  { id: "meditacion", label: "Meditación" },
  { id: "astral", label: "Astral" },
  { id: "karma", label: "Karma" },
  { id: "ego", label: "Ego" },
  { id: "tres-factores", label: "Tres Factores" },
  { id: "with-images", label: "Con imágenes" },
  { id: "leidas", label: "Leídas" },
  { id: "no-leidas", label: "No leídas" },
];

export const FILTER_TYPES_FASE_B = [
  { id: "todas", label: "Todas" },
  { id: "practica", label: "Práctica" },
  { id: "doctrina", label: "Doctrina" },
  { id: "simbolo", label: "Símbolo" },
  { id: "iniciacion", label: "Iniciación" },
];

// Filtros por pilar para Fase A
export const FILTER_PILARES_FASE_A = [
  { id: "todas", label: "Todas" },
  { id: "ciencia", label: "Ciencia" },
  { id: "arte", label: "Arte" },
  { id: "psicologia", label: "Psicología" },
  { id: "mistica", label: "Mística" },
];

// Filtros por nivel para Fase A
export const FILTER_NIVELES_FASE_A = [
  { id: "todas", label: "Todos los niveles" },
  { id: "inicial", label: "Inicial" },
  { id: "intermedio", label: "Intermedio" },
  { id: "avanzado", label: "Avanzado" },
];

// Filtros para libros
export const FILTER_TIPOS_LIBROS = [
  { id: "todos", label: "Todos" },
  { id: "gnosis", label: "Gnosis" },
  { id: "psicologia", label: "Psicología" },
  { id: "esoterismo", label: "Esoterismo" },
  { id: "budismo", label: "Budismo" },
  { id: "egiptologia", label: "Egiptología" },
  { id: "yoga", label: "Yoga" },
  { id: "tantra", label: "Tantra" },
];

export const FILTER_AUTORES_LIBROS = [
  { id: "todos", label: "Todos los autores" },
  { id: "samael", label: "V.M. Samael Aun Weor" },
];

export function estimateReadingTime(c: { content: { type: string; text?: string; items?: string[] }[] }) {
  let words = 0;
  for (const b of c.content) {
    if ("text" in b && b.text) words += b.text.split(/\s+/).length;
    if ("items" in b && b.items) words += b.items.join(" ").split(/\s+/).length;
  }
  return Math.max(1, Math.round(words / 220));
}

export function normalize(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
