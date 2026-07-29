import { createClient } from "@/lib/supabase/server";
import { Daire, Odeme } from "@/lib/types";
import { paraFormatla, bugununDonemi, donemEtiketi, tarihFormatla } from "@/lib/utils";
import { odemeEkle, odemeSil } from "./actions";

export default async function OdemelerPage({
  searchParams,
}: {
  searchParams: { daire?: string; donem?: string };
}) {
  const supabase = createClient();

  const [{ data: daireler }, { data: odemeler }] = await Promise.all([
    supabase.from("daireler").select("*").order("no"),
    supabase
      .from("odemeler")
      .select("*")
      .order("odeme_tarihi", { ascending: false })
      .limit(100),
  ]);

  const daireListesi = (daireler ?? []) as Daire[];
  const odemeListesi = (odemeler ?? []) as Odeme[];
  const daireMap = new Map(daireListesi.map((d) => [d.id, d]));

  const bugun = new Date().toISOString().slice(0, 10);
  const onSecilenDaire = searchParams.daire ?? "";
  const onSecilenDonem = searchParams.donem ?? bugununDonemi();

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-ink-faint">
          Gelirler
        </p>
        <h1 className="font-display italic text-3xl text-ink">Ödemeler</h1>
      </div>

      <form
        action={odemeEkle}
        className="ledger-card rounded-md p-5 grid sm:grid-cols-5 gap-3 items-end"
      >
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">
            Daire
          </label>
          <select
            name="daire_id"
            required
            defaultValue={onSecilenDaire}
            className="w-full rounded border border-paperline bg-paper px-3 py-2 text-sm"
          >
            <option value="" disabled>
              Daire seçin
            </option>
            {daireListesi.map((d) => (
              <option key={d.id} value={d.id}>
                Daire {d.no} — {d.sakin_adi}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">
            Dönem
          </label>
          <input
            name="donem"
            type="month"
            required
            defaultValue={onSecilenDonem}
            className="w-full rounded border border-paperline bg-paper px-3 py-2 text-sm tabular"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">
            Tutar
          </label>
          <input
            name="tutar"
            type="number"
            step="0.01"
            required
            placeholder="1500"
            className="w-full rounded border border-paperline bg-paper px-3 py-2 text-sm tabular"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">
            Ödeme Tarihi
          </label>
          <input
            name="odeme_tarihi"
            type="date"
            required
            defaultValue={bugun}
            className="w-full rounded border border-paperline bg-paper px-3 py-2 text-sm tabular"
          />
        </div>
        <div className="sm:col-span-4">
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">
            Açıklama (opsiyonel)
          </label>
          <input
            name="aciklama"
            placeholder="Elden nakit, havale vb."
            className="w-full rounded border border-paperline bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full rounded bg-ink text-paper text-sm font-semibold px-4 py-2 hover:bg-ink-light transition-colors"
          >
            Ödeme ekle
          </button>
        </div>
      </form>

      <div className="ledger-card rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-paperline text-left text-ink-faint text-xs uppercase tracking-wide">
              <th className="px-4 py-3 font-semibold">Tarih</th>
              <th className="px-4 py-3 font-semibold">Daire</th>
              <th className="px-4 py-3 font-semibold">Dönem</th>
              <th className="px-4 py-3 font-semibold">Açıklama</th>
              <th className="px-4 py-3 font-semibold text-right">Tutar</th>
              <th className="px-4 py-3 font-semibold text-right">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {odemeListesi.map((o) => {
              const daire = daireMap.get(o.daire_id);
              return (
                <tr key={o.id} className="border-b border-paperline/60 last:border-0">
                  <td className="px-4 py-2.5 tabular">{tarihFormatla(o.odeme_tarihi)}</td>
                  <td className="px-4 py-2.5">
                    {daire ? `Daire ${daire.no} — ${daire.sakin_adi}` : "—"}
                  </td>
                  <td className="px-4 py-2.5 tabular">{donemEtiketi(o.donem)}</td>
                  <td className="px-4 py-2.5 text-ink-faint">{o.aciklama ?? "—"}</td>
                  <td className="px-4 py-2.5 text-right tabular font-semibold text-stampgreen">
                    {paraFormatla(Number(o.tutar))}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <form action={odemeSil}>
                      <input type="hidden" name="id" value={o.id} />
                      <button
                        type="submit"
                        className="text-xs px-2.5 py-1 rounded border border-stampred/50 text-stampred hover:bg-stampred hover:text-paper transition-colors"
                      >
                        Sil
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
            {odemeListesi.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-ink-faint">
                  Henüz ödeme kaydı yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
