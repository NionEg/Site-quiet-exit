import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Reveal } from "@/components/Reveal";
import { useAuth } from "@/hooks/useAuth";

export default function Start() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const canSubmit = name.trim().length > 0 && email.trim().includes("@") && !login.isPending;

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-14 md:py-24">
      <Reveal>
        <p className="eyebrow mb-6">Начать</p>
        <h1 className="font-serif text-[1.9rem] font-bold leading-snug tracking-tight text-ink md:text-[2.6rem]">
          Два способа. Оба — нормальные
        </h1>
        <p className="mt-5 max-w-xl text-[1.08rem] leading-relaxed text-ink-muted">
          Никто не будет тебя подгонять. Выбери то, что подходит сейчас, —
          передумать можно в любой момент.
        </p>
      </Reveal>

      {/* Вариант 1 — с заданиями */}
      <Reveal delay={120}>
        <section className="mt-12 rounded-xl border border-line bg-card p-7 md:p-10">
          <p className="eyebrow mb-3">Вариант 1</p>
          <h2 className="font-serif text-2xl font-bold text-ink">Пройти курс с заданиями</h2>
          <ul className="mt-4 space-y-2 text-[1.02rem] leading-relaxed text-ink-muted">
            <li>— Доступ ко всем 30 урокам и рабочим листам</li>
            <li>— Ответы сохраняются и идут в исследование</li>
            <li>— Личный кабинет с прогрессом</li>
          </ul>

          {loading ? (
            <p className="mt-8 text-sm text-ink-faint">Проверяю вход…</p>
          ) : user ? (
            <div className="mt-8">
              <p className="text-[1.02rem] text-ink">
                Ты уже вошёл как <span className="font-medium">{user.name}</span>.
              </p>
              <Link to="/kabinet" className="btn-primary mt-4">
                Перейти в кабинет
              </Link>
            </div>
          ) : (
            <form
              className="mt-8"
              onSubmit={(e) => {
                e.preventDefault();
                if (!canSubmit) return;
                login.mutate(
                  { name: name.trim(), email: email.trim() },
                  { onSuccess: () => navigate("/kabinet") },
                );
              }}
            >
              <label className="block">
                <span className="mb-2 block text-sm text-ink-muted">Имя</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как к тебе обращаться"
                  autoComplete="name"
                  className="min-h-[48px] w-full rounded-lg border border-input bg-paper px-4 text-base text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none"
                />
              </label>
              <label className="mt-4 block">
                <span className="mb-2 block text-sm text-ink-muted">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Чтобы не потерять прогресс"
                  autoComplete="email"
                  className="min-h-[48px] w-full rounded-lg border border-input bg-paper px-4 text-base text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none"
                />
              </label>
              {login.error && (
                <p className="mt-3 text-sm text-destructive">
                  {login.error.message || "Не получилось войти. Попробуй ещё раз."}
                </p>
              )}
              <button
                type="submit"
                disabled={!canSubmit}
                className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {login.isPending ? "Захожу…" : "Войти и начать"}
              </button>
              <p className="mt-4 text-sm leading-relaxed text-ink-faint">
                Только имя и email — без пароля, без рассылок, без «мы скучаем».
                Если email уже есть в базе, ты просто войдёшь в свой прогресс.
              </p>
            </form>
          )}
        </section>
      </Reveal>

      {/* Вариант 2 — просто смотреть */}
      <Reveal delay={220}>
        <section className="mt-8 rounded-xl border border-dashed border-line p-7 md:p-10">
          <p className="eyebrow mb-3">Вариант 2</p>
          <h2 className="font-serif text-2xl font-bold text-ink">Просто смотреть</h2>
          <ul className="mt-4 space-y-2 text-[1.02rem] leading-relaxed text-ink-muted">
            <li>— Без регистрации вообще</li>
            <li>— Только видео, без рабочих листов</li>
            <li>— Без обратной связи и прогресса</li>
          </ul>
          <Link to="/programma" className="btn-quiet mt-8">
            Открыть программу без регистрации
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-ink-faint">
            Человек, который боится давления, должен иметь возможность просто смотреть.
            Если захочешь задания — вернёшься сюда.
          </p>
        </section>
      </Reveal>
    </div>
  );
}
