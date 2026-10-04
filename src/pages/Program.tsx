import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { blocks } from "@contracts/course";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Program() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-14 md:py-24">
      <Reveal>
        <p className="eyebrow mb-6">Программа · 30 уроков · 3 блока</p>
        <h1 className="font-serif text-[1.9rem] font-bold leading-snug tracking-tight text-ink md:text-[2.6rem]">
          Объём виден сразу. Тонуть не придётся
        </h1>
        <p className="mt-5 max-w-xl text-[1.08rem] leading-relaxed text-ink-muted">
          Каждый урок — короткое видео и одна страница рабочего листа.
          Раскрой любой урок, чтобы увидеть описание и задание.
        </p>
      </Reveal>

      {blocks.map((block, bi) => (
        <section key={block.id} className="mt-14 border-t border-line pt-12 md:mt-20 md:pt-16">
          <SectionHead
            number={`0${block.id}`}
            eyebrow={`Блок ${block.id} · ${block.lessons.length} уроков`}
            title={block.title}
            lead={block.subtitle}
          />
          <Reveal>
            <Accordion type="single" collapsible className="w-full">
              {block.lessons.map((lesson) => (
                <AccordionItem key={lesson.id} value={lesson.id} className="border-line">
                  <AccordionTrigger className="group min-h-[56px] py-4 text-left hover:no-underline [&>svg]:hidden">
                    <span className="flex w-full items-baseline gap-4">
                      <span className="font-mono text-sm text-ink-faint">
                        {block.id}.{lesson.order}
                      </span>
                      <span className="flex-1 font-serif text-[1.1rem] leading-snug text-ink transition-colors duration-300 group-hover:text-brand md:text-[1.15rem]">
                        {lesson.title}
                      </span>
                      <ChevronDown
                        size={18}
                        strokeWidth={1.5}
                        className="mt-1 shrink-0 self-center text-ink-faint transition-transform duration-300 group-data-[state=open]:rotate-180"
                      />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-0 md:pl-9">
                    <p className="max-w-xl text-[1rem] leading-relaxed text-ink-muted">
                      {lesson.description}
                    </p>
                    <div className="mt-4 rounded-lg bg-sand/50 p-5">
                      <p className="eyebrow mb-2">Задание</p>
                      <p className="text-[1rem] leading-relaxed text-ink">{lesson.task}</p>
                    </div>
                    <Link
                      to={`/urok/${lesson.id}`}
                      className="link-quiet mt-4 inline-block min-h-[44px] text-[0.98rem]"
                    >
                      Открыть урок →
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
          {bi === blocks.length - 1 && null}
        </section>
      ))}

      {/* Что нужно от тебя */}
      <section className="mt-16 border-t border-line pt-14 md:mt-24 md:pt-20">
        <SectionHead number="04" eyebrow="Условия" title="Что нужно от тебя" />
        <div className="space-y-0">
          {[
            ["15–20 минут в день", "Не час. Не «пересмотреть жизнь». Пятнадцать минут и одна страница."],
            ["Готовность записывать свои срывы", "Срыв, который записан, — это данные. Срыв, который спрятан, — это ловушка."],
            ["Никаких «правильных ответов»", "Только честность. Здесь некому ставить оценки."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 80}>
              <div className="border-b border-line py-6">
                <h3 className="font-serif text-xl font-bold text-ink">{t}</h3>
                <p className="mt-2 text-[1.02rem] leading-relaxed text-ink-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150}>
          <div className="mt-12">
            <Link to="/nachat" className="btn-primary">
              Начать курс
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
