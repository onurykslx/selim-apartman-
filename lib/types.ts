export type Daire = {
  id: string;
  no: string;
  sakin_adi: string;
  telefon: string | null;
  aylik_aidat: number;
  created_at: string;
};

export type Odeme = {
  id: string;
  daire_id: string;
  donem: string; // YYYY-MM
  tutar: number;
  odeme_tarihi: string;
  aciklama: string | null;
  created_at: string;
};

export type Gider = {
  id: string;
  baslik: string;
  kategori: string;
  tutar: number;
  tarih: string;
  aciklama: string | null;
  created_at: string;
};
