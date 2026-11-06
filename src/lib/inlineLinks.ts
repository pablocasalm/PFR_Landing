/**
 * Enlaces dentro de un texto del diccionario, con la forma `[texto](/ruta)` (p. ej. la respuesta
 * de «¿Cuánto cuesta?» de la FAQ). `splitLinks` lo parte en trozos para pintarlo; `stripLinks`
 * deja solo el texto (datos estructurados, donde no caben enlaces).
 */
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export type TextPart = { text: string; href?: string };

export function splitLinks(text: string): TextPart[] {
  const parts: TextPart[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    if (match.index! > last) parts.push({ text: text.slice(last, match.index) });
    parts.push({ text: match[1], href: match[2] });
    last = match.index! + match[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}

export const stripLinks = (text: string) => text.replace(LINK, "$1");
