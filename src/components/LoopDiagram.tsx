/** Минималистичная схема петли: триггер → тяга → просмотр → похмелье. Рисуется кодом, без стоковых картинок. */
export function LoopDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 320"
      className={className}
      role="img"
      aria-label="Схема петли: триггер, тяга, просмотр, похмелье — и обратно к триггеру"
    >
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8" fill="none" stroke="hsl(34 15% 59%)" strokeWidth="1.2" />
        </marker>
      </defs>

      {/* дуги петли */}
      {[
        "M170,78 Q280,30 390,78",
        "M452,110 Q505,160 452,210",
        "M390,242 Q280,290 170,242",
        "M108,210 Q55,160 108,110",
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="hsl(34 15% 59%)"
          strokeWidth="1.2"
          strokeDasharray="1 5"
          strokeLinecap="round"
          markerEnd="url(#arrowhead)"
        />
      ))}

      {[
        { x: 110, y: 90, t: "Триггер" },
        { x: 450, y: 90, t: "Тяга" },
        { x: 450, y: 230, t: "Просмотр" },
        { x: 110, y: 230, t: "Похмелье" },
      ].map((n) => (
        <g key={n.t}>
          <circle cx={n.x} cy={n.y} r="34" fill="hsl(43 38% 96%)" stroke="hsl(197 26% 35%)" strokeWidth="1.2" />
          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fontSize="13"
            fill="hsl(27 14% 15%)"
            fontFamily="Inter, sans-serif"
          >
            {n.t}
          </text>
        </g>
      ))}

      <text
        x="280"
        y="166"
        textAnchor="middle"
        fontSize="12"
        fill="hsl(32 12% 40%)"
        fontFamily="'PT Mono', monospace"
        letterSpacing="2"
      >
        петля
      </text>
    </svg>
  );
}
