import { Link } from "react-router";
import { Reveal } from "@/components/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Остановись. Без «ну всё, опять»",
    text: "Первый час решает всё. Заметь, что ты в ленте, и просто остановись. Не объясняй, не оценивай, не приговаривай. Срыв — это событие, а не приговор.",
  },
  {
    n: "02",
    title: "Запиши: триггер, время, длительность",
    text: "Три строки. Когда, после чего, сколько длилось. Это не самокопание — это данные. Записанный срыв становится точкой на карте, а не провалом.",
  },
  {
    n: "03",
    title: "Смени физическое состояние",
    text: "Встань. Выйди из комнаты. Умойся, пройдись до угла, сделай десять приседаний. Тяга живёт в теле — и из тела же выходит.",
  },
  {
    n: "04",
    title: "Возвращайся к тому уроку, где остановился",
    text: "Не к первому. Не «с понедельника». Твой прогресс здесь не сгорает. Открой кабинет и продолжи с того места, где был. Это и есть навык возвращения.",
  },
];

export default function Relapse() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-14 md:py-24">
      <Reveal>
        <p className="eyebrow mb-6">Эта страница открыта всегда</p>
        <h1 className="font-serif text-[1.9rem] font-bold leading-snug tracking-tight text-ink md:text-[2.6rem]">
          Сорвался?{" "}
          <em className="italic text-brand">Это часть курса,</em> а не конец
        </h1>
        <p className="mt-5 max-w-xl text-[1.08rem] leading-relaxed text-ink-muted">
          Сейчас твоя голова, скорее всего, говорит: «с тобой всё ясно». Не слушай.
          Сделай четыре шага — медленно, по порядку.
        </p>
      </Reveal>

      <div className="mt-14">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 80}>
            <div className="border-t border-line py-8 md:py-9">
              <p className="eyebrow mb-3">{s.n}</p>
              <h2 className="font-serif text-[1.4rem] font-bold leading-snug text-ink md:text-2xl">
                {s.title}
              </h2>
              <p className="mt-3 max-w-xl text-[1.05rem] leading-relaxed text-ink-muted">
                {s.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="mt-8 rounded-xl bg-sand/60 p-7 md:p-10">
          <p className="font-serif text-[1.2rem] leading-relaxed text-ink md:text-[1.3rem]">
            Помни: цель не «никогда не смотреть». Цель — возвращаться за день,
            а не за месяц. Ты уже возвращаешься. Прямо сейчас, читая это.
          </p>
        </div>
      </Reveal>

      <Reveal delay={280}>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link to="/kabinet" className="btn-primary">
            Продолжить с того места, где был
          </Link>
          <Link to="/urok/b2-3" className="link-quiet min-h-[44px]">
            Перечитать урок «Протокол срыва» →
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
