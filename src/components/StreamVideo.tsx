import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { streamManifest, streamThumbnail } from "../lib/media";
import { trackEvent } from "../lib/analytics";

// Analítica del clip de muestra: qué parte del clip se llega a ver (una vez cada tramo).
const PROGRESS_STEPS = [25, 50, 75, 100];

/**
 * Reproductor de los vídeos de la portada (Cloudflare Stream, ver lib/media.ts) con el aspecto
 * del de la app: barra de progreso cian, play, saltos de 5 s, sonido, subtítulos, tiempo y
 * pantalla completa (06/11/2026: el de Cloudflare no gustaba). Como en la app, hls.js primero y
 * el HLS propio de Safari si no se puede; hls.js se carga solo al empezar a reproducir, para no
 * pesar en la carga de la página. Los subtítulos van dentro del vídeo de Cloudflare (una pista):
 * el navegador los carga en modo "hidden" y se pintan aquí, con el estilo de la app.
 *
 * - "teaser": arranca solo y sin sonido cuando se ve en pantalla, en bucle, con un único botón
 *   para el sonido. Se pausa al salir de la pantalla.
 * - "clip": portada con el botón de play; los controles completos al reproducir.
 */
type Variant = "teaser" | "clip";

const SKIP_SECONDS = 5;

const formatTime = (s: number) => {
  const total = Math.max(0, Math.floor(s));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

export function StreamVideo({ uid, title, variant, className = "" }: { uid: string; title: string; variant: Variant; className?: string }) {
  const { lang } = useLanguage();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<{ destroy: () => void; subtitleTrack: number; subtitleDisplay: boolean } | null>(null);
  const attachedRef = useRef(false);
  const hideTimer = useRef<number | undefined>(undefined);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(variant === "teaser");
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [hasSubtitles, setHasSubtitles] = useState(false);
  const [subtitlesOn, setSubtitlesOn] = useState(false);
  const subtitlesOnRef = useRef(false);
  subtitlesOnRef.current = subtitlesOn;
  const [cueLines, setCueLines] = useState<string[]>([]);

  const label = (es: string, en: string) => (lang === "en" ? en : es);

  /** Conecta el vídeo con su HLS la primera vez que hace falta. */
  const attach = useCallback(async () => {
    const video = videoRef.current;
    if (!video || attachedRef.current) return;
    attachedRef.current = true;
    const src = streamManifest(uid);
    const { default: Hls } = await import("hls.js");
    if (!Hls.isSupported()) {
      video.src = src; // HLS propio de Safari: las pistas de subtítulos las ve el efecto de abajo
      return;
    }
    const hls = new Hls({ capLevelToPlayerSize: true });
    // hls.js conoce las pistas de subtítulos en este evento, no al leer el manifiesto.
    hls.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, () => setHasSubtitles(hls.subtitleTracks.length > 0));
    hls.loadSource(src);
    hls.attachMedia(video);
    hlsRef.current = hls;
  }, [uid]);

  // Al cambiar de vídeo (de idioma), se vuelve a empezar.
  useEffect(() => {
    attachedRef.current = false;
    setHasSubtitles(false);
    setSubtitlesOn(false);
    setCueLines([]);
    setStarted(false);
    setPlaying(false);
    setCurrent(0);
    setDuration(0);
    return () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
      const video = videoRef.current;
      if (video) {
        video.removeAttribute("src");
        video.load();
      }
    };
  }, [uid]);

  // Subtítulos: las pistas del <video> (las crea hls.js o el HLS de Safari) avisan con
  // "cuechange" y aquí se leen las frases activas para pintarlas encima del vídeo.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || variant !== "clip") return;
    const tracks = video.textTracks;
    const isSubtitle = (tr: TextTrack) => tr.kind === "subtitles" || tr.kind === "captions";
    const syncCues = () => {
      const lines: string[] = [];
      for (const tr of Array.from(tracks)) {
        if (!isSubtitle(tr) || tr.mode === "disabled") continue;
        for (const cue of Array.from(tr.activeCues ?? [])) {
          lines.push(...(cue as VTTCue).text.replace(/<[^>]+>/g, "").split("\n").map((l) => l.trim()).filter(Boolean));
        }
      }
      setCueLines((prev) => (prev.join("\n") === lines.join("\n") ? prev : lines));
    };
    const watchTracks = () => {
      for (const tr of Array.from(tracks)) {
        tr.removeEventListener("cuechange", syncCues);
        tr.addEventListener("cuechange", syncCues);
        // HLS de Safari: nadie más avisa de que hay subtítulos, y si no se desactivan los pinta él.
        if (!hlsRef.current && isSubtitle(tr)) {
          setHasSubtitles(true);
          tr.mode = subtitlesOnRef.current ? "hidden" : "disabled";
        }
      }
    };
    tracks.addEventListener("addtrack", watchTracks);
    tracks.addEventListener("change", syncCues);
    watchTracks();
    return () => {
      tracks.removeEventListener("addtrack", watchTracks);
      tracks.removeEventListener("change", syncCues);
      for (const tr of Array.from(tracks)) tr.removeEventListener("cuechange", syncCues);
    };
  }, [uid, variant]);

  // iPhone: en su pantalla completa no se ve nada pintado por la página, así que ahí los
  // subtítulos los pinta el propio reproductor de iOS y, al salir, se vuelven a pintar aquí.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || variant !== "clip") return;
    const setNative = (native: boolean) => {
      if (!subtitlesOnRef.current) return;
      if (hlsRef.current) hlsRef.current.subtitleDisplay = native;
      else for (const tr of Array.from(video.textTracks)) if (tr.kind === "subtitles" || tr.kind === "captions") tr.mode = native ? "showing" : "hidden";
    };
    const onBegin = () => setNative(true);
    const onEnd = () => setNative(false);
    video.addEventListener("webkitbeginfullscreen", onBegin);
    video.addEventListener("webkitendfullscreen", onEnd);
    return () => {
      video.removeEventListener("webkitbeginfullscreen", onBegin);
      video.removeEventListener("webkitendfullscreen", onEnd);
    };
  }, [variant]);

  // Teaser: reproduce mientras se ve en pantalla y se pausa al salir.
  useEffect(() => {
    if (variant !== "teaser") return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          void attach().then(() => video.play().catch(() => {}));
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [variant, attach, uid]);

  const showControls = () => {
    setControlsVisible(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (!videoRef.current?.paused) setControlsVisible(false);
    }, 2500);
  };

  // Analítica (GA4 vía GTM): una vez por visita cada cosa.
  const tracked = useRef(new Set<string>());
  const trackOnce = (key: string, event: string, payload?: Record<string, string | number>) => {
    if (tracked.current.has(key)) return;
    tracked.current.add(key);
    trackEvent(event, payload);
  };

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      if (variant === "clip") trackOnce("play", "sample_clip_play");
      await attach();
      setStarted(true);
      video.play().catch(() => {});
    } else {
      video.pause();
    }
    showControls();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (variant === "teaser" && !video.muted) trackOnce("unmute", "teaser_unmute");
    showControls();
  };

  // Una sola pista (inglés) en los vídeos de la portada: el botón la enciende y la apaga.
  const toggleSubtitles = () => {
    const video = videoRef.current;
    if (!video || !hasSubtitles) return;
    const on = !subtitlesOn;
    const hls = hlsRef.current;
    if (hls) {
      hls.subtitleTrack = on ? 0 : -1;
      hls.subtitleDisplay = false; // pista en "hidden": las frases se pintan aquí
    } else {
      for (const tr of Array.from(video.textTracks)) if (tr.kind === "subtitles" || tr.kind === "captions") tr.mode = on ? "hidden" : "disabled";
    }
    if (!on) setCueLines([]);
    setSubtitlesOn(on);
    showControls();
  };

  const skipBy = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(Math.max(0, video.currentTime + seconds), video.duration || 0);
    showControls();
  };

  const fullscreen = () => {
    const video = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else if (wrap.requestFullscreen) void wrap.requestFullscreen();
    else video.webkitEnterFullscreen?.(); // iPhone: solo el vídeo puede ir a pantalla completa
  };

  const seekFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    video.currentTime = Math.min(Math.max(0, (event.clientX - rect.left) / rect.width), 1) * video.duration;
    showControls();
  };

  const pct = duration > 0 ? (current / duration) * 100 : 0;
  const iconBtn = "flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:text-accent-cyan focus-ring";

  return (
    <div
      ref={wrapRef}
      className={`group relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-black ${className}`}
      onPointerMove={variant === "clip" && started ? showControls : undefined}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-contain"
        poster={streamThumbnail(uid)}
        playsInline
        preload="none"
        muted={muted}
        loop={variant === "teaser"}
        aria-label={title}
        onClick={variant === "clip" ? togglePlay : undefined}
        onPlay={() => setPlaying(true)}
        onPause={() => {
          setPlaying(false);
          setControlsVisible(true);
        }}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          setCurrent(v.currentTime);
          if (variant === "clip" && v.duration) {
            const pct = (v.currentTime / v.duration) * 100;
            // 100 %: a dos segundos del final cuenta como visto entero.
            for (const step of PROGRESS_STEPS)
              if (pct >= step || (step === 100 && v.duration - v.currentTime <= 2)) trackOnce(`p${step}`, "sample_clip_progress", { percent: step });
          }
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
      />

      {/* Subtítulos: suben por encima de la barra de controles mientras está visible. */}
      {variant === "clip" && subtitlesOn && cueLines.length > 0 && (
        <div
          className={`pointer-events-none absolute inset-x-0 z-10 flex justify-center px-3 transition-[bottom] duration-200 ${
            controlsVisible || !playing ? "bottom-[4.25rem]" : "bottom-3 sm:bottom-5"
          }`}
        >
          <p className="max-w-[94%] rounded-md bg-black/75 px-2.5 py-1 text-center text-xs font-medium leading-snug text-white [text-wrap:balance] sm:px-3 sm:py-1.5 sm:text-lg">
            {cueLines.join(" ")}
          </p>
        </div>
      )}

      {variant === "teaser" ? (
        <button
          type="button"
          onClick={toggleMute}
          className="focus-ring absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-black/75"
        >
          {muted ? <VolumeOffIcon /> : <VolumeIcon />}
          {muted ? label("Activar sonido", "Turn sound on") : label("Silenciar", "Mute")}
        </button>
      ) : !started ? (
        // Portada: botón de play grande en el centro, como la miniatura de la app.
        <button
          type="button"
          onClick={togglePlay}
          className="focus-ring absolute inset-0 flex items-center justify-center bg-black/20 transition hover:bg-black/10"
          aria-label={label("Reproducir el clip", "Play the clip")}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-cyan text-bg shadow-glow">
            <PlayIcon className="ml-1 h-7 w-7" />
          </span>
        </button>
      ) : (
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-10 transition sm:px-4 ${
            controlsVisible || !playing ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div
            className="relative -mt-2 mb-1 flex h-5 w-full cursor-pointer touch-none items-center"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              seekFromPointer(e);
            }}
            onPointerMove={(e) => e.currentTarget.hasPointerCapture(e.pointerId) && seekFromPointer(e)}
            role="slider"
            aria-label={label("Progreso", "Progress")}
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(current)}
          >
            <div className="relative h-1.5 w-full rounded-full bg-white/20">
              <div className="h-full rounded-full bg-accent-cyan" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button type="button" onClick={togglePlay} className={iconBtn} aria-label={playing ? label("Pausar", "Pause") : label("Reproducir", "Play")}>
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button type="button" onClick={() => skipBy(-SKIP_SECONDS)} className={iconBtn} aria-label={label("Retroceder 5 segundos", "Back 5 seconds")}>
              <SkipIcon />
            </button>
            <button type="button" onClick={() => skipBy(SKIP_SECONDS)} className={iconBtn} aria-label={label("Avanzar 5 segundos", "Forward 5 seconds")}>
              <SkipIcon forward />
            </button>
            <button type="button" onClick={toggleMute} className={iconBtn} aria-label={muted ? label("Activar sonido", "Turn sound on") : label("Silenciar", "Mute")}>
              {muted ? <VolumeOffIcon /> : <VolumeIcon />}
            </button>
            <span className="ml-1 whitespace-nowrap text-xs font-medium tabular-nums text-white/90">
              {formatTime(current)} / {formatTime(duration)}
            </span>
            <button
              type="button"
              onClick={toggleSubtitles}
              disabled={!hasSubtitles}
              className={`${iconBtn.replace("text-white ", subtitlesOn ? "text-accent-cyan " : "text-white ")} ml-auto disabled:cursor-default disabled:text-white/30`}
              aria-label={subtitlesOn ? label("Quitar subtítulos", "Turn subtitles off") : label("Activar subtítulos", "Turn subtitles on")}
              aria-pressed={subtitlesOn}
            >
              <CaptionsIcon />
            </button>
            <button type="button" onClick={fullscreen} className={iconBtn} aria-label={label("Pantalla completa", "Full screen")}>
              <FullscreenIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Iconos (los mismos dibujos que lucide en la app, sin añadir la librería a la landing).
const svg = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

function PlayIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...svg} fill="currentColor">
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" {...svg}>
      <rect x="14" y="4" width="4" height="16" rx="1" />
      <rect x="6" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function SkipIcon({ forward = false }: { forward?: boolean }) {
  return (
    <span className="relative flex items-center justify-center">
      <svg viewBox="0 0 24 24" className={`h-5 w-5 ${forward ? "-scale-x-100" : ""}`} {...svg}>
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
      <span className="absolute text-[7px] font-bold">{SKIP_SECONDS}</span>
    </span>
  );
}

function VolumeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" {...svg}>
      <path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6A1.4 1.4 0 0 1 5.4 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4a.7.7 0 0 0 1.2-.5z" />
      <path d="M16 9a5 5 0 0 1 0 6" />
      <path d="M19.4 18.4a9 9 0 0 0 0-12.7" />
    </svg>
  );
}

function VolumeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" {...svg}>
      <path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6A1.4 1.4 0 0 1 5.4 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4a.7.7 0 0 0 1.2-.5z" />
      <line x1="22" x2="16" y1="9" y2="15" />
      <line x1="16" x2="22" y1="9" y2="15" />
    </svg>
  );
}

function CaptionsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" {...svg}>
      <rect width="18" height="14" x="3" y="5" rx="2" ry="2" />
      <path d="M7 15h4M15 15h2M7 11h2M13 11h4" />
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" {...svg}>
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}
