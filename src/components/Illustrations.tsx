// Hand-drawn SVG illustrations and icons. They use the theme colour tokens, so
// they follow light and dark mode. All are decorative (aria-hidden).

type IconProps = { className?: string };

function Icon({ children, className = "" }: IconProps & { children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </span>
  );
}

const envelope = (
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </>
);

// One icon per item in dict.problem.items, in the same order.
const problemIcons = [
  // Slow replies
  <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  // Manual data entry
  <><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" /></>,
  // Costly mistakes
  <><path d="M12 3.5 21.5 20h-19z" /><path d="M12 10v4M12 17h.01" /></>,
  // Missed enquiries
  <>{envelope}<circle cx="20" cy="5" r="3" fill="currentColor" stroke="none" /></>,
];

// One icon per item in dict.integrations.items, in the same order.
const integrationIcons = [
  // Email
  envelope,
  // Chat
  <><path d="M20.5 12a8.5 8.5 0 0 1-12.3 7.6L3.5 20.5l1-4.4A8.5 8.5 0 1 1 20.5 12z" /><path d="M8.5 12h.01M12 12h.01M15.5 12h.01" /></>,
  // ERP and accounting
  <><ellipse cx="12" cy="5.5" rx="8" ry="3" /><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
  // CRM
  <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><circle cx="17" cy="9" r="2.5" /><path d="M16.5 14.6A5 5 0 0 1 21.5 20" /></>,
  // Documents
  <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>,
];

export const ProblemIcon = ({ index, className }: IconProps & { index: number }) =>
  problemIcons[index] ? <Icon className={className}>{problemIcons[index]}</Icon> : null;

export const IntegrationIcon = ({ index, className }: IconProps & { index: number }) =>
  integrationIcons[index] ? <Icon className={className}>{integrationIcons[index]}</Icon> : null;

// Incoming channels (email, chat, PDF or photo) flow into the agent, which checks
// the catalogue/ERP and produces a draft quote ready for approval.
export function FlowIllustration({ className = "" }: IconProps) {
  const tile = "fill-surface stroke-muted/60";
  const bar = "fill-muted/45";
  return (
    <svg viewBox="0 0 960 220" className={`h-auto w-full ${className}`} aria-hidden="true" fill="none">
      {/* Connectors */}
      <g className="stroke-muted/70" strokeWidth="2" strokeDasharray="6 6">
        <path d="M170 54C270 54 270 110 366 110" />
        <path d="M170 114H366" />
        <path d="M170 174C270 174 270 110 366 110" />
      </g>
      <g className="stroke-accent" strokeWidth="2.5" strokeLinecap="round">
        <path d="M474 110H566M556 102l10 8-10 8" />
        <path d="M664 110H752M742 102l10 8-10 8" />
      </g>

      {/* Email */}
      <rect x="40" y="28" width="130" height="52" rx="12" className={tile} strokeWidth="2" />
      <g className="stroke-accent" strokeWidth="2" strokeLinejoin="round">
        <rect x="56" y="42" width="30" height="22" rx="3" />
        <path d="m57 44 14 10 14-10" />
      </g>
      <rect x="98" y="45" width="56" height="6" rx="3" className={bar} />
      <rect x="98" y="57" width="36" height="6" rx="3" className={bar} />

      {/* Chat */}
      <rect x="40" y="88" width="130" height="52" rx="12" className={tile} strokeWidth="2" />
      <path d="M56 104a6 6 0 0 1 6-6h18a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H67l-7 6v-6.5a6 6 0 0 1-4-5.5z" className="stroke-accent" strokeWidth="2" strokeLinejoin="round" />
      <rect x="98" y="105" width="50" height="6" rx="3" className={bar} />
      <rect x="98" y="117" width="30" height="6" rx="3" className={bar} />

      {/* PDF or photo of a handwritten list */}
      <rect x="40" y="148" width="130" height="52" rx="12" className={tile} strokeWidth="2" />
      <g className="stroke-accent" strokeWidth="2" strokeLinejoin="round">
        <path d="M60 160h14l8 8v20H60z" />
        <path d="M74 160v8h8" />
        <path d="M64 176h12M64 182h8" />
      </g>
      <rect x="98" y="165" width="56" height="6" rx="3" className={bar} />
      <rect x="98" y="177" width="44" height="6" rx="3" className={bar} />

      {/* Agent */}
      <circle cx="420" cy="110" r="70" className="fill-accent-soft" />
      <circle cx="420" cy="110" r="54" className="fill-accent" />
      <circle cx="420" cy="110" r="40" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 5" />
      <path d="M420 84c3 15 11 23 26 26-15 3-23 11-26 26-3-15-11-23-26-26 15-3 23-11 26-26z" fill="white" />

      {/* Catalogue / ERP */}
      <g className={tile} strokeWidth="2">
        <path d="M576 78v64c0 6.6 19.7 12 44 12s44-5.4 44-12V78" />
        <ellipse cx="620" cy="78" rx="44" ry="12" />
      </g>
      <g className="stroke-muted/60" strokeWidth="1.5">
        <path d="M576 100c0 6.6 19.7 12 44 12s44-5.4 44-12" />
        <path d="M576 121c0 6.6 19.7 12 44 12s44-5.4 44-12" />
      </g>

      {/* Draft quote, approved */}
      <rect x="760" y="36" width="160" height="148" rx="14" className={tile} strokeWidth="2" />
      <rect x="760.75" y="36.75" width="158.5" height="30" rx="13.5" className="fill-accent-soft" />
      <rect x="776" y="47" width="60" height="8" rx="4" className="fill-accent" />
      {[84, 106, 128].map((y) => (
        <g key={y}>
          <rect x="776" y={y} width="72" height="6" rx="3" className={bar} />
          <rect x="872" y={y} width="32" height="6" rx="3" className={bar} />
        </g>
      ))}
      <rect x="776" y="154" width="54" height="16" rx="8" className="fill-accent" />
      <circle cx="904" cy="176" r="22" className="fill-positive stroke-bg" strokeWidth="4" />
      <path d="m894 176 7 7 13-14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// A stocked warehouse rack: boxes, a gear, pipes, parts bins and a cable reel.
export function WarehouseIllustration({ className = "" }: IconProps) {
  const box = "fill-accent-soft stroke-accent";
  const part = "fill-surface stroke-muted";
  return (
    <svg viewBox="0 0 480 210" className={`h-auto w-full ${className}`} aria-hidden="true" fill="none" strokeWidth="1.5">
      {/* Rack */}
      <g className="fill-muted/40">
        <rect x="24" y="12" width="8" height="186" rx="2" />
        <rect x="448" y="12" width="8" height="186" rx="2" />
        <rect x="24" y="72" width="432" height="6" rx="2" />
        <rect x="24" y="134" width="432" height="6" rx="2" />
        <rect x="24" y="196" width="432" height="6" rx="2" />
      </g>

      {/* Top shelf: boxes, gear, pipes */}
      <rect x="48" y="28" width="72" height="44" rx="3" className={box} />
      <path d="M84 28v14" className="stroke-accent" />
      <rect x="128" y="42" width="52" height="30" rx="3" className={box} />
      <path d="M154 42v10" className="stroke-accent" />
      <circle cx="232" cy="50" r="17" className="stroke-muted" strokeWidth="8" strokeDasharray="5.3 3.6" />
      <circle cx="232" cy="50" r="12" className={part} />
      <circle cx="232" cy="50" r="4.5" className="fill-muted" stroke="none" />
      {[
        [320, 59], [346, 59], [372, 59], [398, 59], [424, 59],
        [333, 36], [359, 36], [385, 36], [411, 36],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="12" className={part} />
          <circle cx={cx} cy={cy} r="5.5" className="stroke-muted" />
        </g>
      ))}

      {/* Middle shelf: parts bins with bolts, cable reel */}
      {[48, 136, 224].map((x) => (
        <g key={x}>
          <circle cx={x + 22} cy="98" r="4" className="fill-muted" stroke="none" />
          <circle cx={x + 36} cy="95" r="4" className="fill-muted" stroke="none" />
          <circle cx={x + 50} cy="99" r="4" className="fill-muted" stroke="none" />
          <path d={`M${x} 100h76l-6 34H${x + 6}z`} className={part} />
          <rect x={x + 24} y="110" width="28" height="12" rx="2" className="fill-accent" stroke="none" />
        </g>
      ))}
      <circle cx="372" cy="106" r="26" className={box} />
      <circle cx="372" cy="106" r="17" className="stroke-accent" strokeDasharray="2 3" />
      <circle cx="372" cy="106" r="7" className="fill-surface stroke-accent" />
      <path d="M398 106c18 0 22 12 30 28" className="stroke-accent" strokeWidth="2.5" strokeLinecap="round" />

      {/* Bottom shelf: pallet of boxes, pipe lengths */}
      <rect x="48" y="150" width="58" height="46" rx="3" className={box} />
      <rect x="110" y="150" width="58" height="46" rx="3" className={box} />
      <rect x="79" y="160" width="20" height="10" rx="1.5" className="fill-surface stroke-accent" />
      {[184, 172, 160].map((y, i) => (
        <rect key={y} x={196 + i * 8} y={y} width={236 - i * 16} height="12" rx="6" className={part} />
      ))}
    </svg>
  );
}
