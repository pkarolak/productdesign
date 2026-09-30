/** Renders "*word*" as the single emphasised word of a heading. */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/);
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part))}
    </>
  );
}

export const plain = (text: string) => text.replace(/\*/g, "");
