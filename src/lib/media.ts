import type { Language } from "../i18n/types";

/**
 * Vídeos de la portada, en Cloudflare Stream (la misma cuenta que los clips de la app). Estos
 * vídeos tienen desactivado "Require signed URLs" para que se vean sin cuenta: el resto de vídeos
 * de PFR siguen firmados y solo los sirve la API. Cada uno, con su versión en español y en inglés.
 */
export const STREAM_HOST = "https://customer-l70mh3bn2bwnn0pj.cloudflarestream.com";

/** Teaser de 18 s al principio de «El problema» (tarjeta #138; subido el 06/11/2026). */
export const TEASER: Record<Language, string> = {
  es: "917b19da7e8259e08bf68c9e1d985f87",
  en: "be946e1752059f3f26a7cb0651f29438",
};
export const TEASER_SECONDS = 18;

/** Clip de muestra «013_02» (análisis 13; en la base de datos, el clip 735de40af0ac) en «En la
 * práctica»: original en español y versión en inglés de HeyGen. Un uid vacío = el clip sin vídeo. */
export const SAMPLE_CLIP: Record<Language, string> = {
  es: "7ddbad0ef8fb9c7c4dd3fbcae051b0a5",
  en: "4c0b7a3aa20ee4424685c64658b13cea",
};

export const streamThumbnail = (uid: string, second = 1) => `${STREAM_HOST}/${uid}/thumbnails/thumbnail.jpg?time=${second}s&height=720`;

/** HLS del vídeo, lo que reproduce StreamVideo. */
export const streamManifest = (uid: string) => `${STREAM_HOST}/${uid}/manifest/video.m3u8`;
