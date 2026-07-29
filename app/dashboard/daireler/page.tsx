import { createClient } from "@/lib/supabase/server";
import { Daire } from "@/lib/types";
import { daireEkle, daireSil, daireGuncelle } from "./actions";

export default async function DairelerPage() {
  const supabase = createClient();
  const { data: daireler } = await supabase.from("daireler").select("*").order("no");
  const daireListesi = (daireler ?? []) as Daire[];

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-ink-faint">
          Yönetim
        </p>
        <h1 className="font-display italic text-3xl text-ink">Daireler</h1>
      </div>

      <form
        action={daireEkle}
        className="ledger-card rounded-md p-5 grid sm:grid-cols-5 gap-3 items-end"
      >
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">
            Daire No
          </label>
          <input
            name="no"
            required
            placeholder="12"
            className="w-full rounded border border-paperline bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">
            Sakin Adı
          </label>
          <input
            name="sakin_adi"
            required
            placeholder="Ahmet Yılmaz"
            className="w-full rounded border border-paperline bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">
            Telefon
          </label>
          <input
            name="telefon"
            placeholder="0555 000 00 00"
            className="w-full rounded border border-paperline bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">
            Aylık Aidat
          </label>
          <input
            name="aylik_aidat"
            type="number"
            step="0.01"
            required
            placeholder="1500"
            className="w-full rounded border border-paperline bg-paper px-3 py-2 text-sm tabular"
          />
        </div>
        <div className="sm:col-span-5">
          <button
            type="submit"
            className="rounded bg-ink text-paper text-sm font-semibold px-4 py-2 hover:bg-ink-light transition-colors"
          >
            Daire ekle
          </button>
        </div>
      </form>

      <div className="ledger-card rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-paperline text-left text-ink-faint text-xs uppercase tracking-wide">
              <th className="px-4 py-3 font-semibold">No</th>
              <th className="px-4 py-3 font-semibold">Sakin</th>
              <th className="px-4 py-3 font-semibold">Telefon</th>
              <th className="px-4 py-3 font-semibold text-right">Aylık Aidat</th>
              <th className="px-4 py-3 font-semibold text-right">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {daireListesi.map((d) => (
              <tr key={d.id} className="border-b border-paperline/60 last:border-0">
                <form action={daireGuncelle} id={`form-${d.id}`}>
                  <input type="hidden" name="id" value={d.id} />
                </form>
                <td className="px-4 py-2.5">
                  <input
                    form={`form-${d.id}`}
                    name="no"
                    defaultValue={d.no}
                    className="w-16 tabular font-semibold rounded border border-transparent hover:border-paperline focus:border-brass bg-transparent px-2 py-1"
                  />
                </td>
                <td className="px-4 py-2.5">
                  <input
                    form={`form-${d.id}`}
                    name="sakin_adi"
                    defaultValue={d.sakin_adi}
                    className="w-full rounded border border-transparent hover:border-paperline focus:border-brass bg-transparent px-2 py-1"
                  />
                </td>
                <td className="px-4 py-2.5">
                  <input
                    form={`form-${d.id}`}
                    name="telefon"
                    defaultValue={d.telefon ?? ""}
                    className="w-full rounded border border-transparent hover:border-paperline focus:border-brass bg-transparent px-2 py-1"
                  />
                </td>
                <td className="px-4 py-2.5 text-right">
                  <input
                    form={`form-${d.id}`}
                    name="aylik_aidat"
                    type="number"
                    step="0.01"
                    defaultValue={d.aylik_aidat}
                    className="w-28 tabular text-right rounded border border-transparent hover:border-paperline focus:border-brass bg-transparent px-2 py-1"
                  />
                </td>
                <td className="px-4 py-2.5 text-right whitespace-nowrap">
                  <button
                    form={`form-${d.id}`}
                    type="submit"
                    className="text-xs px-2.5 py-1 rounded border border-brass text-brass-dark hover:bg-brass hover:text-paper transition-colors mr-1.5"
                  >
                    Kaydet
                  </button>
                  <form action={daireSil} className="inline">
                    <input type="hidden" name="id" value={d.id} />
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
            {daireListesi.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-faint">
                  Henüz daire eklenmedi. Yukarıdaki formdan ilk daireyi ekleyin.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
