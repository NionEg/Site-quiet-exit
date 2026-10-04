import { Link, useNavigate } from "react-router";
import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import { blocks, TOTAL_LESSONS } from "@contracts/course";

export default function Cabinet() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const progress = trpc.course.progress.useQuery(undefined, {
    enabled: !!user,
    retry: false,
  });
  const done = new Set((progress.data ?? []).map((r) => r.lessonId));

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-2xl px-5 py-24">
        <p className="text-ink-faint">Загружаю кабинет…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-2xl px-5 py-24">
        <h1 className="font-serif text-3xl font-bold text-ink">Здесь будет твой прогресс</h1>
        <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-ink-muted">
          Войди по имени и email — и кабинет покажет, какие уроки пройдены,
          а твои ответы перестанут теряться.
        </p>
        <Link to="/nachat" className="btn-primary mt-8">
          Войти
        </Link>
      </div>
    );
  }

  const doneCount = done.size;

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-14 md:py-20">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">Личный кабинет</p>
            <h1 className="font-serif text-[1.8rem] font-bold leading-snug text-ink md:text-[2.4rem]">
              Здравствуй, {user.name}
            </h1>
          </div>
          <button
            type="button"
            onClick={() => logout.mutate(undefined, { onSuccess: () => navigate("/") })}
            className="min-h-[44px] text-sm text-ink-faint underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            Выйти
          </button>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-10 rounded-xl border border-line bg-card p-7 md:p-8">
          {progress.isLoading ? (
            <p className="text-sm text-ink-faint">Считаю прогресс…</p>
          ) : (
            <>
              <p className="font-serif text-[1.3rem] text-ink">
                {doneCount === 0 && "Пока ни одного урока. Это нормально — начни с первого."}
                {doneCount > 0 &&
                  doneCount < TOTAL_LESSONS &&
                  `Пройдено ${doneCount} из ${TOTAL_LESSONS}. Без спешки.`}
                {doneCount === TOTAL_LESSONS && "Все 30 уроков пройдены. Карта у тебя."}
              </p>
              <div
                className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-paper-deep"
                role="progressbar"
                aria-valuenow={doneCount}
                aria-valuemin={0}
                aria-valuemax={TOTAL_LESSONS}
              >
                <div
                  className="h-full rounded-full bg-brand transition-all duration-700"
                  style={{ width: `${(doneCount / TOTAL_LESSONS) * 100}%` }}
                />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-faint">
                Срыв — не повод начинать заново. Прогресс не сгорает никогда.
              </p>
            </>
          )}
        </div>
      </Reveal>

      {blocks.map((block) => (
        <section key={block.id} className="mt-12">
          <Reveal>
            <p className="eyebrow mb-2">Блок {block.id}</p>
            <h2 className="font-serif text-2xl font-bold text-ink">{block.title}</h2>
          </Reveal>
          <div className="mt-5 divide-y divide-line border-t border-line">
            {block.lessons.map((lesson) => {
              const isDone = done.has(lesson.id);
              return (
                <Link
                  key={lesson.id}
                  to={`/urok/${lesson.id}`}
                  className="group flex min-h-[56px] items-center gap-4 py-4"
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                      isDone ? "border-brand bg-brand" : "border-line group-hover:border-ink-faint"
                    }`}
                    aria-label={isDone ? "Пройден" : "Не пройден"}
                  >
                    {isDone && <Check size={14} strokeWidth={2.5} className="text-paper" />}
                  </span>
                  <span className="font-mono text-sm text-ink-faint">
                    {block.id}.{lesson.order}
                  </span>
                  <span
                    className={`flex-1 font-serif text-[1.05rem] leading-snug transition-colors duration-300 ${
                      isDone ? "text-ink-muted" : "text-ink group-hover:text-brand"
                    }`}
                  >
                    {lesson.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <div className="mt-14 border-t border-line pt-10">
        <Link to="/esli-sorvalsya" className="link-quiet min-h-[44px]">
          Что делать, если сорвался →
        </Link>
      </div>
    </div>
  );
}
