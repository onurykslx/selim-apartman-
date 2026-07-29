import { createClient } from "@/lib/supabase/server";
import { Gider } from "@/lib/types";
import { paraFormatla, tarihFormatla } from "@/lib/utils";
import { giderEkle, giderSil } from "./actions";

const KATEGORILER = [
  "Genel", "Temizlik", "Elektrik", "Su", "Doğalgaz", "Asansör",
  "Bahçe", "Güvenlik", "Bakım-Onarım", "Sigorta", "Diğer",
];

export default async function GiderlerPage() {
  const supabase = createClient();
  const { data: giderler } = await supabase
    .from("giderler")
    .select("*")
    .order("tarih", { ascending: false })
    .limit(100);

  const giderListesi = (giderler ?? []) as Gider[];
  const bugun = new Date().toISOString().slice(0, 10);
  const toplam = giderListesi.reduce((acc, g) => acc + Number(g.tutar), 0);

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-ink-faint">
            Giderler
          </p>
          <h1 className="font-display italic text-3xl text-ink">Giderler</h1>
        </div>
        <p className="text-sm text-ink-faint">
          Son 100 kayıt toplamı:{" "}
          <span className="tabular font-semibold text-stampred">
            {paraFormatla(toplam)}
          </span>
        </p>
      </div>

      <form
        action={giderEkle}
        className="ledger-card rounded-md p-5 grid sm:grid-cols-5 gap-3 items-end"
      >
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">
            Başlık
          </label>
          <input
            name="baslik"
            required
            placeholder="Ortak alan elektrik faturası"
            className="w-full rounded border border-paperline bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">
            Kategori
          </label>
          <select
            name="kategori"
            defaultValue="Genel"
            className="w-full rounded border border-paperline bg-paper px-3 py-2 text-sm"
          >
            {KATEGORILER.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
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
            placeholder="850"
            className="w-full rounded border border-paperline bg-paper px-3 py-2 text-sm tabular"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">
            Tarih
          </label>
          <input
            name="tarih"
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
            placeholder="Fatura no, tedarikçi vb."
            className="w-full rounded border border-paperline bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full rounded bg-ink text-paper text-sm font-semibold px-4 py-2 hover:bg-ink-light transition-colors"
          >
            Gider ekle
          </button>
        </div>
      </form>

      <div className="ledger-card rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-paperline text-left text-ink-faint text-xs uppercase tracking-wide">
              <th className="px-4 py-3 font-semibold">Tarih</th>
              <th className="px-4 py-3 font-semibold">Başlık</th>
              <th className="px-4 py-3 font-semibold">Kategori</th>
              <th className="px-4 py-3 font-semibold">Açıklama</th>
              <th className="px-4 py-3 font-semibold text-right">Tutar</th>
              <th className="px-4 py-3 font-semibold text-right">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {giderListesi.map((g) => (
              <tr key={g.id} className="border-b border-paperline/60 last:border-0">
                <td className="px-4 py-2.5 tabular">{tarihFormatla(g.tarih)}</td>
                <td className="px-4 py-2.5">{g.baslik}</td>
                <td className="px-4 py-2.5">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-ink/5 text-ink-light">
                    {g.kategori}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-ink-faint">{g.aciklama ?? "—"}</td>
                <td className="px-4 py-2.5 text-right tabular font-semibold text-stampred">
                  {paraFormatla(Number(g.tutar))}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <form action={giderSil}>
                    <input type="hidden" name="id" value={g.id} />
                    <button
                      type="submit"
                      className="text-xs px-2.5 py-1 rounded border border-stampred/50 text-stampred hover:bg-stampred hover:text-paper transition-colors"
                    >
                      Sil
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {giderListesi.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-ink-faint">
                  Henüz gider kaydı yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
