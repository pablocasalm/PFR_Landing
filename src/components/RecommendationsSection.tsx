import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

type RecommendationTopic = {
  id: number;
  category: string;
  exampleClip: string;
  thumbnail: string;
};

const topics: RecommendationTopic[] = [
  {
    id: 1,
    category: "Salida de pared",
    exampleClip: "Clip de ejemplo: Bandeja y transición",
    thumbnail:
      "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    category: "Resto agresivo",
    exampleClip: "Clip de ejemplo: Lectura de señal",
    thumbnail:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    category: "Bola de oro",
    exampleClip: "Clip de ejemplo: Contexto 40-40",
    thumbnail:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    category: "Defensa profunda",
    exampleClip: "Clip de ejemplo: No forzar winner",
    thumbnail:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    category: "Cierre en volea",
    exampleClip: "Clip de ejemplo: Consecuencia del patrón",
    thumbnail:
      "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=700&q=80",
  },
];

export function RecommendationsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="recomendaciones"
      className="px-4 py-20 sm:px-6 lg:py-24"
      initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Recomendaciones"
          title="Tendencias ahora"
        />

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {topics.map((topic) => (
            <article
              key={topic.id}
              className="group relative aspect-[2/3] overflow-hidden rounded-2xl border border-border bg-surface-1 transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:border-accent-cyan/60 hover:shadow-[0_0_0_1px_rgba(40,240,224,0.35),0_18px_36px_rgba(40,240,224,0.20)]"
            >
              <div className="group relative block h-full w-full text-left">
                <img
                  src={topic.thumbnail}
                  alt={`Portada de la categoria: ${topic.category}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                <span className="absolute left-2 bottom-14 font-display text-7xl leading-none text-transparent [text-shadow:0_3px_12px_rgba(0,0,0,0.65)] [-webkit-text-stroke:2px_#e9e9e9]">
                  {topic.id}
                </span>

                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-sm font-semibold leading-tight text-text">{topic.category}</p>
                  <p className="mt-1 text-xs leading-tight text-muted">{topic.exampleClip}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
