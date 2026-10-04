import { Link } from "react-router";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";

const POINTS = [
  {
    n: "01",
    title: "Короткие видео",
    text: "5–10 минут. Не 30. Потому что человек, который не может удержать внимание, не будет смотреть длинное. Это не баг — это точка старта.",
  },
  {
    n: "02",
    title: "Рабочий лист к каждому уроку",
    text: "Одна страница. Не текст для чтения — таблица для заполнения. Можно заполнить прямо на сайте с телефона, всё сохранится.",
  },
  {
    n: "03",
    title: "Никакого давления",
    text: "Нет дедлайнов. Нет «ты должен». Нет «успевай». Если сорвался — это часть курса, а не провал. Страница «Что делать, если сорвался» открыта всегда.",
  },
  {
    n: "04",
    title: "Твой опыт — часть исследования",
    text: "Ответы и комментарии идут в групповое исследование. Ты не просто проходишь курс — ты помогаешь понять, почему люди срываются.",
  },
];

export default function HowItWorks() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-14 md:py-24">
      <Reveal>
        <p className="eyebrow mb-6">Как это работает</p>
        <h1 className="font-serif text-[1.9rem] font-bold leading-snug tracking-tight text-ink md:text-[2.6rem]">
          Это не очередной курс,{" "}
          <em className="italic text-brand">который ты не досмотришь</em>
        </h1>
        <p className="mt-5 max-w-xl text-[1.08rem] leading-relaxed text-ink-muted">
          Я знаю этот страх: «начну и брошу, как всегда». Поэтому всё здесь устроено
          для человека, который срывается. А не для человека идеального.
        </p>
      </Reveal>

      <div className="mt-14 md:mt-20">
        {POINTS.map((p, i) => (
          <Reveal key={p.n} delay={i * 70}>
            <div className="border-t border-line py-8 md:py-10">
              <p className="eyebrow mb-3">{p.n}</p>
              <h2 className="font-serif text-[1.45rem] font-bold leading-snug text-ink md:text-2xl">
                {p.title}
              </h2>
              <p className="mt-3 max-w-xl text-[1.05rem] leading-relaxed text-ink-muted">
                {p.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="mt-8 border-t border-line pt-14 md:pt-20">
        <SectionHead
          eyebrow="Если сорвёшься"
          title="Срыв — не повод начинать заново"
          lead="Прогресс не сгорает. Уроки не блокируются. Ты можешь вернуться к любому уроку в любой момент — и продолжить с того места, где остановился."
        />
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link to="/esli-sorvalsya" className="btn-quiet">
              Что делать, если сорвался
            </Link>
            <Link to="/nachat" className="link-quiet min-h-[44px]">
              Или сразу начать →
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
