import { Reveal } from "./Reveal";

type Props = {
  number?: string;
  eyebrow?: string;
  title: string;
  /** Курсивное слово/фраза в заголовке — подсвечивается акцентом (приём из редакционной типографики) */
  accent?: string;
  lead?: string;
};

export function SectionHead({ number, eyebrow, title, accent, lead }: Props) {
  let titleNode: React.ReactNode = title;
  if (accent && title.includes(accent)) {
    const [before, after] = title.split(accent);
    titleNode = (
      <>
        {before}
        <em className="font-serif italic text-brand">{accent}</em>
        {after}
      </>
    );
  }

  return (
    <Reveal>
      <div className="mb-8 md:mb-12">
        {(number || eyebrow) && (
          <p className="eyebrow mb-4">
            {number && <span className="mr-3 inline-block rounded border border-line bg-paper-deep px-2 py-0.5">{number}</span>}
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-[1.75rem] font-bold leading-snug tracking-tight text-ink md:text-4xl md:leading-tight">
          {titleNode}
        </h2>
        {lead && (
          <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-ink-muted">{lead}</p>
        )}
      </div>
    </Reveal>
  );
}
