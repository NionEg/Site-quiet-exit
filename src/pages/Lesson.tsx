import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import { blocks, lessonById, nextLesson, prevLesson } from "@contracts/course";

export default function Lesson() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lesson = lessonId ? lessonById.get(lessonId) : undefined;
  const { user, loading: authLoading } = useAuth();
  const utils = trpc.useUtils();

  const [answer, setAnswer] = useState("");
  const [worksheet, setWorksheet] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<"idle" | "saving" | "saved">("idle");

  const entry = trpc.course.entry.useQuery(
    { lessonId: lessonId! },
    { enabled: !!user && !!lesson, retry: false },
  );
  const progress = trpc.course.progress.useQuery(undefined, {
    enabled: !!user,
    retry: false,
  });
  const saveEntry = trpc.course.saveEntry.useMutation({
    onSuccess: () => {
      setSaved("saved");
      utils.course.entry.invalidate({ lessonId: lessonId! });
      setTimeout(() => setSaved("idle"), 2500);
    },
  });
  const setCompleted = trpc.course.setCompleted.useMutation({
    onSuccess: () => utils.course.progress.invalidate(),
  });

  // Подставить сохранённые данные, когда загрузятся
  useEffect(() => {
    if (entry.data) {
      setAnswer(entry.data.answer ?? "");
      setWorksheet((entry.data.worksheet as Record<string, string>) ?? {});
    }
  }, [entry.data]);

  if (!lesson) {
    return (
      <div className="mx-auto w-full max-w-2xl px-5 py-24">
        <h1 className="font-serif text-3xl font-bold text-ink">Такого урока нет</h1>
        <p className="mt-4 text-ink-muted">Возможно, ссылка изменилась.</p>
        <Link to="/programma" className="link-quiet mt-6 inline-block min-h-[44px]">
          Вернуться к программе →
        </Link>
      </div>
    );
  }

  const block = blocks.find((b) => b.id === lesson.block)!;
  const isDone = !!progress.data?.some((r) => r.lessonId === lesson.id);
  const prev = prevLesson(lesson.id);
  const next = nextLesson(lesson.id);

  const saveAll = () => {
    if (!user) return;
    setSaved("saving");
    saveEntry.mutate({ lessonId: lesson.id, answer, worksheet });
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-12 md:py-20">
      <Reveal>
        <Link
          to="/programma"
          className="mb-8 inline-flex min-h-[44px] items-center gap-2 text-sm text-ink-faint transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} strokeWidth={1.5} /> Программа
        </Link>
        <p className="eyebrow mb-4">
          Блок {lesson.block} · {block.title} · Урок {lesson.block}.{lesson.order}
        </p>
        <h1 className="font-serif text-[1.8rem] font-bold leading-snug tracking-tight text-ink md:text-[2.4rem]">
          {lesson.title}
        </h1>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-8">
          <VideoPlaceholder
            videoUrl={lesson.videoUrl}
            label={`Урок ${lesson.block}.${lesson.order}`}
            duration="5–10 минут"
          />
        </div>
      </Reveal>

      <Reveal delay={180}>
        <p className="mt-8 text-[1.08rem] leading-relaxed text-ink-muted">{lesson.description}</p>
      </Reveal>

      {/* Задание */}
      <section className="mt-12 rounded-xl bg-sand/50 p-7 md:p-8">
        <p className="eyebrow mb-3">Задание</p>
        <p className="text-[1.05rem] leading-relaxed text-ink">{lesson.task}</p>
      </section>

      {/* Рабочий лист + вопрос */}
      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl font-bold text-ink">Рабочий лист</h2>

        {authLoading ? (
          <p className="mt-6 text-sm text-ink-faint">Проверяю вход…</p>
        ) : !user ? (
          <div className="mt-6 rounded-xl border border-dashed border-line p-7">
            <p className="text-[1.02rem] leading-relaxed text-ink-muted">
              Ты в режиме «просто смотреть» — это нормально. Рабочий лист доступен после входа:
              он сохранит твои записи, и они пойдут в исследование.
            </p>
            <Link to="/nachat" className="btn-quiet mt-5">
              Войти по имени и email
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            {lesson.worksheet.map((field) => (
              <label key={field.key} className="block">
                <span className="mb-2 block text-[1.02rem] leading-snug text-ink">
                  {field.prompt}
                </span>
                <textarea
                  rows={2}
                  value={worksheet[field.key] ?? ""}
                  onChange={(e) => {
                    setWorksheet((w) => ({ ...w, [field.key]: e.target.value }));
                    setSaved("idle");
                  }}
                  className="w-full rounded-lg border border-input bg-card px-4 py-3 text-base leading-relaxed text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none"
                  placeholder="Пиши честно. Правильных ответов нет."
                />
              </label>
            ))}

            <label className="block border-t border-line pt-8">
              <span className="eyebrow mb-3 block">Вопрос урока</span>
              <span className="mb-2 block font-serif text-[1.15rem] leading-snug text-ink">
                {lesson.question}
              </span>
              <textarea
                rows={3}
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setSaved("idle");
                }}
                className="w-full rounded-lg border border-input bg-card px-4 py-3 text-base leading-relaxed text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none"
                placeholder="Твой ответ пойдёт в исследование. Я читаю."
              />
            </label>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={saveAll}
                disabled={saveEntry.isPending}
                className="btn-primary disabled:opacity-50"
              >
                {saveEntry.isPending ? "Сохраняю…" : "Сохранить записи"}
              </button>
              {saved === "saved" && (
                <span className="text-sm text-brand">Сохранено. Ничего не потеряется.</span>
              )}
              {saveEntry.error && (
                <span className="text-sm text-destructive">
                  Не сохранилось. Попробуй ещё раз.
                </span>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Отметка о прохождении */}
      {user && (
        <section className="mt-12 border-t border-line pt-10">
          <button
            type="button"
            onClick={() =>
              setCompleted.mutate({ lessonId: lesson.id, completed: !isDone })
            }
            disabled={setCompleted.isPending}
            className={`flex min-h-[52px] w-full items-center justify-center gap-3 rounded-xl border text-[1.02rem] transition-colors duration-300 sm:w-auto sm:px-10 ${
              isDone
                ? "border-brand bg-tint text-brand-deep"
                : "border-line text-ink hover:border-ink-faint"
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                isDone ? "border-brand bg-brand" : "border-line"
              }`}
            >
              {isDone && <Check size={14} strokeWidth={2.5} className="text-paper" />}
            </span>
            {isDone ? "Урок пройден" : "Отметить урок пройденным"}
          </button>
          {isDone && (
            <p className="mt-3 text-sm text-ink-faint">
              Нажми ещё раз, если хочешь снять отметку. Срыв — не повод начинать заново.
            </p>
          )}
        </section>
      )}

      {/* Навигация между уроками */}
      <nav className="mt-14 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:justify-between">
        {prev ? (
          <Link
            to={`/urok/${prev.id}`}
            className="group flex min-h-[48px] items-center gap-2 text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
            <span className="font-serif text-[1.02rem]">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/urok/${next.id}`}
            className="group flex min-h-[48px] items-center gap-2 text-ink-muted transition-colors hover:text-ink sm:text-right"
          >
            <span className="font-serif text-[1.02rem]">{next.title}</span>
            <ArrowRight size={18} strokeWidth={1.5} />
          </Link>
        ) : (
          <Link to="/kabinet" className="btn-primary">
            Курс пройден — в кабинет
          </Link>
        )}
      </nav>
    </div>
  );
}
