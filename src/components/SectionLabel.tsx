export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-label text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gold dark:text-gold-light">
      {children}
    </span>
  );
}
