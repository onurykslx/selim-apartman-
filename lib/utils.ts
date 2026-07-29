export function paraFormatla(tutar: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  }).format(tutar);
}

export function bugununDonemi(): string {
  const d = new Date();
  const yil = d.getFullYear();
  const ay = String(d.getMonth() + 1).padStart(2, "0");
  return `${yil}-${ay}`;
}

const AY_ADLARI = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

export function donemEtiketi(donem: string): string {
  const [yil, ay] = donem.split("-");
  const ayIndex = parseInt(ay, 10) - 1;
  return `${AY_ADLARI[ayIndex] ?? ay} ${yil}`;
}

export function donemSecenekleri(sayiGeriye = 12): string[] {
  const secenekler: string[] = [];
  const simdi = new Date();
  for (let i = 0; i < sayiGeriye; i++) {
    const d = new Date(simdi.getFullYear(), simdi.getMonth() - i, 1);
    const yil = d.getFullYear();
    const ay = String(d.getMonth() + 1).padStart(2, "0");
    secenekler.push(`${yil}-${ay}`);
  }
  return secenekler;
}

export function tarihFormatla(tarih: string): string {
  return new Date(tarih).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
