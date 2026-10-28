import type { Testimonial } from "../i18n/types";

/** Frase de un usuario con su nombre y un dato (nivel). Sus palabras, tal cual. */
export function TestimonialQuote({ item, className = "" }: { item: Testimonial; className?: string }) {
  return (
    <figure className={`rounded-md border border-border bg-surface-2 px-5 py-5 ${className}`}>
      <blockquote className="text-sm leading-relaxed text-text/90 sm:text-base">“{item.text}”</blockquote>
      <figcaption className="mt-3 text-sm text-muted">
        <span className="font-semibold text-text">{item.name}</span> · {item.detail}
      </figcaption>
    </figure>
  );
}
