-- Apartman Yönetimi - Supabase şeması
-- Bu dosyayı Supabase projenizde SQL Editor'a yapıştırıp çalıştırın.

create extension if not exists "pgcrypto";

-- 1) Daireler
create table if not exists daireler (
  id uuid primary key default gen_random_uuid(),
  no text not null,
  sakin_adi text not null,
  telefon text,
  aylik_aidat numeric(10,2) not null default 0,
  created_at timestamptz not null default now()
);

-- 2) Ödemeler (gelirler)
create table if not exists odemeler (
  id uuid primary key default gen_random_uuid(),
  daire_id uuid not null references daireler(id) on delete cascade,
  donem text not null, -- 'YYYY-MM' formatında, örn: 2026-07
  tutar numeric(10,2) not null,
  odeme_tarihi date not null default current_date,
  aciklama text,
  created_at timestamptz not null default now()
);

create index if not exists odemeler_donem_idx on odemeler (donem);
create index if not exists odemeler_daire_idx on odemeler (daire_id);

-- 3) Giderler
create table if not exists giderler (
  id uuid primary key default gen_random_uuid(),
  baslik text not null,
  kategori text not null default 'Genel',
  tutar numeric(10,2) not null,
  tarih date not null default current_date,
  aciklama text,
  created_at timestamptz not null default now()
);

create index if not exists giderler_tarih_idx on giderler (tarih);

-- Row Level Security: yalnızca giriş yapmış yönetici erişebilir
alter table daireler enable row level security;
alter table odemeler enable row level security;
alter table giderler enable row level security;

drop policy if exists "daireler_all_authenticated" on daireler;
create policy "daireler_all_authenticated" on daireler
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "odemeler_all_authenticated" on odemeler;
create policy "odemeler_all_authenticated" on odemeler
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "giderler_all_authenticated" on giderler;
create policy "giderler_all_authenticated" on giderler
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
