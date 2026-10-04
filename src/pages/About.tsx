import { Link } from "react-router";
import { Reveal } from "@/components/Reveal";

export default function About() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-14 md:py-24">
      <Reveal>
        <p className="eyebrow mb-6">Об авторе</p>
        <h1 className="font-serif text-[1.9rem] font-bold leading-snug tracking-tight text-ink md:text-[2.6rem]">
          Человек, а не эксперт
        </h1>
      </Reveal>

      <Reveal delay={140}>
        <div className="mt-10 space-y-6 font-serif text-[1.15rem] leading-relaxed text-ink md:text-[1.25rem]">
          <p>Я не психолог. Не коуч. Не эксперт по продуктивности.</p>
          <p>
            Я человек, который два года пытался бросить TikTok и{" "}
            <em className="italic text-brand">срывался десятки раз</em>.
          </p>
          <p>
            Я прошёл через дофаминовую яму, туман в голове, раздражение на близких
            и ненависть к себе.
          </p>
          <p>Сейчас я возвращаюсь за день, а не за месяц.</p>
          <p className="border-l-2 border-brand pl-6">
            Этот курс — то, что я хотел бы услышать два года назад.
          </p>
        </div>
      </Reveal>

      <Reveal delay={240}>
        <div className="mt-14 rounded-xl bg-paper-deep/70 p-7 md:p-10">
          <p className="eyebrow mb-4">Почему без регалий</p>
          <p className="text-[1.05rem] leading-relaxed text-ink-muted">
            Потому что дипломы не помогали мне возвращаться после срыва. Помогала карта —
            где я падаю, что меня вытаскивает, что делать в первый час. Эту карту я и отдаю.
            Всё, что есть в курсе, — проверено на моих собственных срывах, десятки раз.
          </p>
        </div>
      </Reveal>

      <Reveal delay={320}>
        <div className="mt-14 border-t border-line pt-10">
          <Link to="/nulevoy-urok" className="btn-primary">
            Послушать нулевой урок
          </Link>
          <p className="mt-4 text-sm text-ink-faint">
            Там я рассказываю всё это своим голосом. Без регистрации.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
