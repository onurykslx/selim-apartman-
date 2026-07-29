export default function StatCard({
  etiket,
  deger,
  vurgu = "normal",
}: {
  etiket: string;
  deger: string;
  vurgu?: "normal" | "iyi" | "kotu";
}) {
  const renk =
    vurgu === "iyi"
      ? "text-stampgreen"
      : vurgu === "kotu"
      ? "text-stampred"
      : "text-ink";

  return (
    <div className="ledger-card rounded-md px-5 py-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1.5">
        {etiket}
      </p>
      <p className={`tabular text-2xl font-semibold ${renk}`}>{deger}</p>
    </div>
  );
}
