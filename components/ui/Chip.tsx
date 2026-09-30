export function Chip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-pill border border-hairline px-3.5 py-[7px] type-small leading-none">
      {children}
    </span>
  );
}
