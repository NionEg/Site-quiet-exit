import { Play } from "lucide-react";

type Props = {
  /** Ссылка на видео (YouTube/Vimeo embed). Если пусто — спокойная заглушка. */
  videoUrl?: string;
  label?: string;
  duration?: string;
};

/** Вертикально-дружелюбный плеер-заглушка: место, куда автор позже вставит ссылку. */
export function VideoPlaceholder({ videoUrl, label = "Видео скоро появится", duration }: Props) {
  if (videoUrl) {
    return (
      <div className="overflow-hidden rounded-xl border border-line">
        <div className="aspect-video w-full">
          <iframe
            src={videoUrl}
            title={label}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex aspect-video w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-line bg-paper-deep px-6 text-center"
      role="img"
      aria-label={`${label}. Место для видео.`}
    >
      {/* Тихая « breathing » точка вместо агрессивной кнопки play */}
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ink-faint/40 bg-paper">
        <Play size={22} strokeWidth={1.5} className="ml-0.5 text-ink-muted" aria-hidden />
      </span>
      <div>
        <p className="font-serif text-lg text-ink">{label}</p>
        {duration && <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">{duration}</p>}
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Здесь будет видео. Его можно посмотреть без регистрации — просто нажми.
        </p>
      </div>
    </div>
  );
}
