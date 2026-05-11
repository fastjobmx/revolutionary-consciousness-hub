/**
 * Utilidad para limpiar contenido importado desde PDF o Markdown
 * Elimina artefactos comunes de conversión de documentos
 */

export interface CleanOptions {
  removeSeparators?: boolean;
  removePageNumbers?: boolean;
  fixBrokenHeadings?: boolean;
  convertFakeLists?: boolean;
  removeOrphanPunctuation?: boolean;
  maxConsecutiveSeparators?: number;
}

const DEFAULT_OPTIONS: CleanOptions = {
  removeSeparators: true,
  removePageNumbers: true,
  fixBrokenHeadings: true,
  convertFakeLists: true,
  removeOrphanPunctuation: true,
  maxConsecutiveSeparators: 3,
};

/**
 * Separa un texto en párrafos manteniendo la estructura
 */
function splitParagraphs(text: string): string[] {
  return text.split(/\n\n+/).filter(p => p.trim().length > 0);
}

/**
 * Une párrafos de vuelta en texto
 */
function joinParagraphs(paragraphs: string[]): string {
  return paragraphs.join("\n\n");
}

/**
 * Detecta si una línea es un separador (puntos, asteriscos, etc.)
 */
function isSeparator(line: string): boolean {
  const trimmed = line.trim();
  // Patrones de separadores: • • • •, * * * *, ---, ===, etc.
  const separatorPatterns = [
    /^[•·∙⋅\-*•]+\s*[•·∙⋅\-*•]*\s*[•·∙⋅\-*•]*$/,
    /^[-=~_]{3,}$/,
    /^\s*•\s*•\s*•\s*•?\s*$/,
    /^\s*\*\s*\*\s*\*\s*\*?\s*$/,
  ];
  return separatorPatterns.some(pattern => pattern.test(trimmed));
}

/**
 * Detecta si es un número de página suelto
 */
function isPageNumber(text: string): boolean {
  const trimmed = text.trim();
  // Números solos, o números entre paréntesis/corchetes
  return /^\s*\d+\s*$/.test(trimmed) || 
         /^\s*\[?\d+\]?\s*$/.test(trimmed) ||
         /^\s*\(?\d+\)?\s*$/.test(trimmed);
}

/**
 * Detecta puntuación huérfana (puntos o números aislados en medio de texto)
 */
function isOrphanPunctuation(text: string): boolean {
  const trimmed = text.trim();
  // Puntos sueltos, números solos entre párrafos
  return /^\s*\.+\s*$/.test(trimmed) ||
         /^\s*\d+\s*[.]?$/.test(trimmed) && trimmed.length <= 3;
}

/**
 * Detecta si un texto parece ser un encabezado roto (termina abruptamente)
 */
function isBrokenHeading(text: string): boolean {
  // Encabezados que terminan en conectores o preposiciones comunes
  const brokenEndings = /\s(de|del|la|el|los|las|un|una|y|o|con|por|para|sin|sobre|entre|hacia|hasta|desde)$/i;
  return brokenEndings.test(text.trim());
}

/**
 * Detecta listas falsas (líneas que empiezan con • o - pero no son listas reales)
 */
function isFakeListItem(text: string): boolean {
  const trimmed = text.trim();
  // Si empieza con bullet o guion pero tiene poco contenido
  return /^[•·∙⋅\-*]\s*\w+/.test(trimmed) && trimmed.length < 50;
}

/**
 * Limpia un texto completo aplicando todas las opciones
 */
export function cleanContent(text: string, options: CleanOptions = {}): string {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let paragraphs = splitParagraphs(text);

  // 1. Eliminar separadores
  if (opts.removeSeparators) {
    paragraphs = paragraphs.filter(p => !isSeparator(p));
  }

  // 2. Eliminar números de página
  if (opts.removePageNumbers) {
    paragraphs = paragraphs.filter(p => !isPageNumber(p));
  }

  // 3. Eliminar puntuación huérfana
  if (opts.removeOrphanPunctuation) {
    paragraphs = paragraphs.filter(p => !isOrphanPunctuation(p));
  }

  // 4. Limpiar separadores consecutivos
  if (opts.removeSeparators && opts.maxConsecutiveSeparators !== undefined) {
    let cleanResult: string[] = [];
    let separatorCount = 0;
    
    for (const p of paragraphs) {
      if (isSeparator(p)) {
        separatorCount++;
        if (separatorCount <= opts.maxConsecutiveSeparators) {
          cleanResult.push(p);
        }
      } else {
        separatorCount = 0;
        cleanResult.push(p);
      }
    }
    paragraphs = cleanResult;
  }

  // 5. Corregir encabezados partidos (unir con el siguiente párrafo)
  if (opts.fixBrokenHeadings) {
    const fixed: string[] = [];
    for (let i = 0; i < paragraphs.length; i++) {
      const current = paragraphs[i];
      const next = paragraphs[i + 1];
      
      if (isBrokenHeading(current) && next && !isSeparator(next) && !isPageNumber(next)) {
        // Unir el encabezado roto con el siguiente párrafo
        fixed.push(current + " " + next);
        i++; // Saltar el siguiente párrafo
      } else {
        fixed.push(current);
      }
    }
    paragraphs = fixed;
  }

  // 6. Limpiar espacios extra y líneas vacías
  paragraphs = paragraphs
    .map(p => p.replace(/\n+/g, " ").trim())
    .filter(p => p.length > 0);

  return joinParagraphs(paragraphs);
}

/**
 * Limpia contenido de un estudio específico de Yoes
 * Aplica reglas específicas para el contenido doctrinal
 */
export function cleanYoeContent(content: string): string {
  // Primero limpiar el contenido general
  let cleaned = cleanContent(content, {
    removeSeparators: true,
    removePageNumbers: true,
    fixBrokenHeadings: true,
    removeOrphanPunctuation: true,
  });

  // Limpiar caracteres específicos del PDF
  cleaned = cleaned
    // Reemplazar caracteres de viñeta raros
    .replace(/[]/g, "• ")
    // Limpiar múltiples bullets consecutivos
    .replace(/(?:•\s*){3,}/g, "")
    // Limpiar múltiples espacios
    .replace(/  +/g, " ")
    // Limpiar líneas con solo números y espacios
    .replace(/\n\s*\d+\s*\n/g, "\n")
    // Unir palabras partidas por guiones al final de línea
    .replace(/(\w+)-\n(\w+)/g, "$1$2")
    // Limpiar encabezados duplicados
    .replace(/^(Conf\. \d+.*?)\n\1/m, "$1");

  return cleaned.trim();
}

/**
 * Limpia el contenido de una conferencia
 */
export function cleanConferenceContent(content: string): string {
  return cleanContent(content, {
    removeSeparators: true,
    removePageNumbers: true,
    fixBrokenHeadings: true,
    removeOrphanPunctuation: true,
  });
}

/**
 * Verifica si un párrafo debería ser eliminado (para debugging)
 */
export function shouldRemoveParagraph(text: string, options: CleanOptions = {}): {
  shouldRemove: boolean;
  reason?: string;
} {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  if (opts.removeSeparators && isSeparator(text)) {
    return { shouldRemove: true, reason: "separator" };
  }
  
  if (opts.removePageNumbers && isPageNumber(text)) {
    return { shouldRemove: true, reason: "page-number" };
  }
  
  if (opts.removeOrphanPunctuation && isOrphanPunctuation(text)) {
    return { shouldRemove: true, reason: "orphan-punctuation" };
  }
  
  return { shouldRemove: false };
}
