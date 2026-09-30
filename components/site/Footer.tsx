export function Footer({ name, note }: { name: string; note?: string }) {
  return (
    <footer className="container-page relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-hairline py-8">
      <p className="type-small">
        {name}, {new Date().getFullYear()}
      </p>
      {note ? <p className="type-small">{note}</p> : null}
    </footer>
  );
}
