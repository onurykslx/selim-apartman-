import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Daire, Odeme, Gider } from "@/lib/types";
import {
  paraFormatla,
  bugununDonemi,
  donemEtiketi,
  donemSecenekleri,
} from "@/lib/utils";
import StatCard from "@/components/StatCard";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { donem?: string };
}) {
  const supabase = createClient();
  const donem = searchParams.donem ?? bugununDonemi();

  const [{ data: daireler }, { data: donemOdemeleri }, { data: tumOdemeler }, { data: tumGiderler }] =
    await Promise.all([
      supabase.from("daireler").select("*").order("no"),
      supabase.from("odemeler").select("*").eq("donem", donem),
      supabase.from("odemeler").select("tutar"),
      supabase.from("giderler").select("tutar"),
    ]);

  const daireListesi = (daireler ?? []) as Daire[];
  const donemOdemeListesi = (donemOdemeleri ?? []) as Odeme[];

  const odeyenDaireIdSet = new Set(donemOdemeListesi.map((o) => o.daire_id));
  const odemeyenDaireler = daireListesi.filter((d) => !odeyenDaireIdSet.has(d.id));

  const toplamGelir = ((tumOdemeler ?? []) as Pick<Odeme, "tutar">[]).reduce(
    (acc, o) => acc + Number(o.tutar),
    0
  );
  const toplamGider = ((tumGiderler ?? []) as Pick<Gider, "tutar">[]).reduce(
    (acc, g) => acc + Number(g.tutar),
    0
  );
  const bakiye = toplamGelir - toplamGider;

  const buAyToplananAidat = donemOdemeListesi.reduce(
    (acc, o) => acc + Number(o.tutar),
    0
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-ink-faint">
            Özet
          </p>
          <h1 className="font-display italic text-3xl text-ink">
            {donemEtiketi(donem)}
          </h1>
        </div>

        <form method="get" className="flex items-center gap-2">
          <label htmlFor="donem" className="text-sm text-ink-faint">
            Dönem
          </label>
          <select
            id="donem"
            name="donem"
            defaultValue={donem}
            className="rounded border border-paperline bg-paper px-3 py-1.5 text-sm text-ink"
          >
            {donemSecenekleri(18).map((d) => (
              <option key={d} value={d}>
                {donemEtiketi(d)}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="text-sm px-3 py-1.5 rounded bg-ink text-paper hover:bg-ink-light transition-colors"
          >
            Göster
          </button>
        </form>
      </div>

      {odemeyenDaireler.length > 0 && (
        <div className="rounded-md border-2 border-stampred/40 bg-stampred/5 px-5 py-4">
          <div className="flex items-start gap-3">
            <span className="stamp stamp-unpaid mt-0.5 shrink-0">Uyarı</span>
            <div className="flex-1">
              <p className="font-semibold text-ink mb-2">
                {donemEtiketi(donem)} için {odemeyenDaireler.length} daire aidatını ödemedi
              </p>
              <ul className="space-y-1">
                {odemeyenDaireler.map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between text-sm text-ink-light border-b border-stampred/10 last:border-0 py-1.5"
                  >
                    <span>
                      <span className="tabular font-semibold">Daire {d.no}</span>{" "}
                      — {d.sakin_adi}
                      {d.telefon && (
                        <span className="text-ink-faint"> · {d.telefon}</span>
                      )}
                    </span>
                    <Link
                      href={`/dashboard/odemeler?daire=${d.id}&donem=${donem}`}
                      className="text-xs px-2.5 py-1 rounded border border-stampred/40 text-stampred hover:bg-stampred hover:text-paper transition-colors shrink-0"
                    >
                      Ödeme ekle
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {odemeyenDaireler.length === 0 && daireListesi.length > 0 && (
        <div className="rounded-md border-2 border-stampgreen/30 bg-stampgreen/5 px-5 py-4 flex items-center gap-3">
          <span className="stamp stamp-paid shrink-0">Tamam</span>
          <p className="text-sm text-ink-light">
            {donemEtiketi(donem)} için tüm daireler aidatını ödedi.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard etiket="Toplam Gelir" deger={paraFormatla(toplamGelir)} vurgu="iyi" />
        <StatCard etiket="Toplam Gider" deger={paraFormatla(toplamGider)} vurgu="kotu" />
        <StatCard
          etiket="Bakiye"
          deger={paraFormatla(bakiye)}
          vurgu={bakiye >= 0 ? "iyi" : "kotu"}
        />
        <StatCard
          etiket={`${donemEtiketi(donem)} Toplanan`}
          deger={paraFormatla(buAyToplananAidat)}
        />
      </div>

      <div className="ledger-card rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-paperline text-left text-ink-faint text-xs uppercase tracking-wide">
              <th className="px-4 py-3 font-semibold">Daire</th>
              <th className="px-4 py-3 font-semibold">Sakin</th>
              <th className="px-4 py-3 font-semibold text-right">Aylık Aidat</th>
              <th className="px-4 py-3 font-semibold text-right">Durum</th>
            </tr>
          </thead>
          <tbody>
            {daireListesi.map((d) => {
              const odedi = odeyenDaireIdSet.has(d.id);
              return (
                <tr key={d.id} className="border-b border-paperline/60 last:border-0">
                  <td className="px-4 py-3 tabular font-semibold">{d.no}</td>
                  <td className="px-4 py-3">{d.sakin_adi}</td>
                  <td className="px-4 py-3 tabular text-right">
                    {paraFormatla(Number(d.aylik_aidat))}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`stamp ${odedi ? "stamp-paid" : "stamp-unpaid"}`}>
                      {odedi ? "Ödendi" : "Ödenmedi"}
                    </span>
                  </td>
                </tr>
              );
            })}
            {daireListesi.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink-faint">
                  Henüz daire eklenmedi.{" "}
                  <Link href="/dashboard/daireler" className="underline text-brass-dark">
                    Daire ekleyin
                  </Link>
                  .
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
