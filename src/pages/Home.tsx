import { Link } from "react-router";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { LoopDiagram } from "@/components/LoopDiagram";
import { blocks } from "@contracts/course";

const MIRROR = [
  "Открываю TikTok от скуки — закрываю через два часа",
  "Вижу, что другие смотрят, и думаю: а я чем хуже?",
  "После просмотра — пустота, туман, раздражение на близких",
  "Срываюсь, ругаю себя, потом снова смотрю",
];

export default function Home() {
  return (
    <>
      {/* Первый экран — голос, а не продажа */}
      <section className="mx-auto w-full max-w-2xl px-5 pb-20 pt-16 md:pb-28 md:pt-28">
        <Reveal>
          <p className="eyebrow mb-8">Курс о выходе из TikTok-петли</p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="font-serif text-[2rem] font-bold leading-snug tracking-tight text-ink md:text-[2.9rem] md:leading-[1.25]">
            Я два года пытался бросить TikTok.{" "}
            <em className="italic text-brand">Срывался десятки раз.</em>
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted md:text-[1.2rem]">
            Срыв длился от дня до месяца. Сейчас я возвращаюсь за день, а не за месяц.
            Этот курс — карта того, где я падал и что меня вытащило.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-10">
            <Link to="/nulevoy-urok" className="btn-primary">
              Посмотреть нулевой урок
            </Link>
            <p className="mt-4 text-sm text-ink-faint">
              Без регистрации. Просто нажми и послушай.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Зеркало */}
      <section className="hairline">
        <div className="mx-auto w-full max-w-2xl px-5 py-20 md:py-28">
          <SectionHead number="01" eyebrow="Зеркало" title="Узнаёшь себя?" />
          <div>
            {MIRROR.map((line, i) => (
              <Reveal key={line} delay={i * 90}>
                <p className="border-b border-line py-5 font-serif text-[1.2rem] leading-relaxed text-ink md:text-[1.35rem]">
                  «{line}»
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-8 text-[1.05rem] leading-relaxed text-ink-muted">
              Это не лень и не слабая воля. Это петля. Её можно разорвать — но не силой воли.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Что будет в курсе */}
      <section className="hairline bg-paper-deep/50">
        <div className="mx-auto w-full max-w-2xl px-5 py-20 md:py-28">
          <SectionHead
            number="02"
            eyebrow="Программа"
            title="Что будет в курсе"
            lead="Три блока по десять коротких уроков. Сначала — увидеть. Потом — возвращаться. Затем — жить дальше."
          />
          <Reveal>
            <LoopDiagram className="mx-auto mb-4 w-full max-w-md" />
          </Reveal>
          <div>
            {blocks.map((b, i) => (
              <Reveal key={b.id} delay={i * 90}>
                <div className="border-b border-line py-6">
                  <p className="eyebrow mb-2">Блок {b.id}</p>
                  <h3 className="font-serif text-xl font-bold text-ink md:text-2xl">{b.title}</h3>
                  <p className="mt-2 text-[1.02rem] leading-relaxed text-ink-muted">{b.subtitle}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <div className="mt-10">
              <Link to="/programma" className="link-quiet">
                Посмотреть всю программу →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Кому не подойдёт */}
      <section className="hairline">
        <div className="mx-auto w-full max-w-2xl px-5 py-20 md:py-28">
          <SectionHead number="03" eyebrow="Честно" title="Кому это не подойдёт" />
          <Reveal>
            <div className="rounded-xl bg-sand/60 p-7 md:p-10">
              <p className="font-serif text-[1.15rem] leading-relaxed text-ink md:text-[1.3rem]">
                Этот курс не для тех, кто хочет «просто меньше сидеть в телефоне». Не для тех,
                кто ищет волшебную таблетку. Не для тех, кто не готов записывать свои срывы.
              </p>
              <p className="mt-5 font-serif text-[1.15rem] leading-relaxed text-ink md:text-[1.3rem]">
                Если ты не готов смотреть на себя честно — курс не сработает.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Тихий следующий шаг */}
      <section className="hairline">
        <div className="mx-auto w-full max-w-2xl px-5 py-24 text-center md:py-32">
          <Reveal>
            <p className="font-serif text-[1.6rem] font-bold leading-snug text-ink md:text-4xl">
              Никаких «успей» и «последний шанс».
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink-muted">
              Курс никуда не денется. Приходи, когда будешь готов. Начни с нулевого урока —
              просто послушай голос.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-10">
              <Link to="/nulevoy-urok" className="btn-primary">
                Начать с нулевого урока
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
