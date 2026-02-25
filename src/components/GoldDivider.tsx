export function GoldDivider() {
  return (
    <div className="w-full flex items-center justify-center py-1">
      <svg width="100%" height="2" className="max-w-6xl">
        <defs>
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="var(--gold)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="var(--gold)" stopOpacity="1" />
            <stop offset="80%" stopColor="var(--gold)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <line x1="0" y1="1" x2="100%" y2="1" stroke="url(#gold-gradient)" strokeWidth="1" />
      </svg>
    </div>
  );
}
