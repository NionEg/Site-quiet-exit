import { useState } from "react";
import { Link } from "react-router";
import { Reveal } from "@/components/Reveal";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";
import { trpc } from "@/providers/trpc";

export default function ZeroLesson() {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const utils = trpc.useUtils();

  const stats = trpc.course.triggerStats.useQuery(undefined, { retry: false });
  const submit = trpc.course.submitTrigger.useMutation({
    onSuccess: () => {
      setSent(true);
      setText("");
      utils.course.triggerStats.invalidate();
    },
  });

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-14 md:py-24">
      <Reveal>
        <p className="eyebrow mb-6">Нулевой урок · 3–5 минут · без регистрации</p>
        <h1 className="font-serif text-[1.9rem] font-bold leading-snug tracking-tight text-ink md:text-[2.6rem]">
          Сначала просто послушай
        </h1>
        <p className="mt-5 max-w-xl text-[1.08rem] leading-relaxed text-ink-muted">
          Кто я, почему делаю этот курс, сколько раз срывался и что хочу изменить.
          Нажми и посмотри — ничего больше не нужно.
        </p>
      </Reveal>

      <Reveal delay={150}>
        <div className="mt-10">
          <VideoPlaceholder label="Нулевой урок" duration="3–5 минут" />
        </div>
      </Reveal>

      {/* Первый вопрос исследования */}
      <section className="mt-16 border-t border-line pt-14 md:mt-24 md:pt-20">
        <Reveal>
          <h2 className="font-serif text-2xl font-bold leading-snug text-ink md:text-3xl">
            Один вопрос
          </h2>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-ink-muted">
            Если ты узнал себя — напиши, какой у тебя главный триггер. Я читаю.
            Это анонимно и без регистрации.
          </p>
        </Reveal>

        <Reveal delay={120}>
          {sent ? (
            <div className="mt-8 rounded-xl border border-line bg-paper-deep/60 p-7">
              <p className="font-serif text-lg text-ink">Спасибо. Записал.</p>
              <p className="mt-2 text-[0.98rem] text-ink-muted">
                Твой триггер — часть исследования. Ты не один: ниже — что пишут другие.
              </p>
            </div>
          ) : (
            <form
              className="mt-8"
              onSubmit={(e) => {
                e.preventDefault();
                if (text.trim().length >= 2 && !submit.isPending) {
                  submit.mutate({ text: text.trim() });
                }
              }}
            >
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Например: скука в очереди, тревога перед дедлайном, «все смотрят»…"
                className="w-full rounded-lg border border-input bg-card px-4 py-3 text-base leading-relaxed text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none"
              />
              {submit.error && (
                <p className="mt-2 text-sm text-destructive">
                  {submit.error.message || "Не получилось отправить. Попробуй ещё раз."}
                </p>
              )}
              <button
                type="submit"
                disabled={text.trim().length < 2 || submit.isPending}
                className="btn-primary mt-4 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submit.isPending ? "Отправляю…" : "Отправить"}
              </button>
            </form>
          )}
        </Reveal>

        {/* Что пишут другие */}
        <Reveal delay={200}>
          <div className="mt-12">
            {stats.isLoading ? (
              <p className="text-sm text-ink-faint">Загружаю, что пишут другие…</p>
            ) : stats.data && stats.data.total > 0 ? (
              <>
                <p className="eyebrow mb-5">
                  Ты не один · {stats.data.total}{" "}
                  {plural(stats.data.total)} уже поделились
                </p>
                <div className="space-y-3">
                  {stats.data.recent.map((t, i) => (
                    <p
                      key={i}
                      className="rounded-lg border border-line bg-card px-5 py-4 font-serif text-[1.05rem] leading-relaxed text-ink"
                    >
                      «{t}»
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-[0.98rem] leading-relaxed text-ink-muted">
                Пока здесь тихо. Твой ответ может стать первым — для следующего человека
                это будет значить: «я не один».
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-14 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center">
            <Link to="/nachat" className="btn-primary">
              Начать курс
            </Link>
            <Link to="/programma" className="link-quiet min-h-[44px]">
              Или сначала посмотреть программу →
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function plural(n: number): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return "человек";
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return "человека";
  return "человек";
}
