# Apartman Defteri

Tek bina için aidat/gelir-gider takip uygulaması. Yönetici giriş yapar, daireleri
ve aylık aidat tutarlarını tanımlar, ödemeleri ve giderleri kaydeder. Panelde
seçilen ay için hangi dairelerin ödemediği kırmızı bir uyarı kutusunda listelenir
(uygulama içi bildirim — e-posta/SMS gönderilmez).

## Teknolojiler
- **Next.js 14** (App Router) + TypeScript + Tailwind CSS
- **Supabase** — veritabanı (Postgres) + kimlik doğrulama (yönetici girişi)
- **Vercel** — yayına alma
- **GitHub** — kod deposu

## 1) Supabase kurulumu
1. https://supabase.com üzerinde yeni bir proje oluşturun.
2. Proje panelinde **SQL Editor** açın, bu depodaki `supabase/schema.sql`
   dosyasının tamamını yapıştırıp **Run** deyin. Bu, `daireler`, `odemeler`,
   `giderler` tablolarını ve güvenlik kurallarını (RLS) oluşturur.
3. **Authentication → Users** kısmından kendinize (yöneticiye) e-posta/şifre ile
   bir kullanıcı oluşturun. Bu uygulamada kayıt (sign-up) ekranı yoktur; giriş
   yalnızca burada oluşturduğunuz hesapla yapılır.
4. **Project Settings → API** kısmından `Project URL` ve `anon public` anahtarını
   not edin — bir sonraki adımda kullanılacak.

## 2) Yerel geliştirme
```bash
npm install
cp .env.local.example .env.local
# .env.local dosyasını Supabase URL ve anon key ile doldurun
npm run dev
```
Tarayıcıda `http://localhost:3000` adresine gidin, Supabase'te oluşturduğunuz
e-posta/şifre ile giriş yapın.

## 3) GitHub'a yükleme
```bash
git init
git add .
git commit -m "İlk sürüm: apartman defteri"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/apartman-defteri.git
git push -u origin main
```

## 4) Vercel'e yayınlama
1. https://vercel.com üzerinde **New Project** ile GitHub deponuzu içe aktarın.
2. **Environment Variables** kısmına şunları ekleyin:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Deploy** butonuna basın. Birkaç dakika içinde uygulamanız canlıya alınır.

## Kullanım
- **Daireler** sayfasından tüm daireleri, sakin adlarını ve aylık aidat
  tutarlarını girin.
- **Ödemeler** sayfasından bir daire için hangi ay ödeme yaptığını kaydedin.
- **Giderler** sayfasından bina giderlerini (elektrik, temizlik, bakım vb.)
  kaydedin.
- **Özet** sayfası seçilen ay için kim ödedi/ödemedi gösterir; ödemeyenler
  kırmızı bir uyarı kutusunda listelenir ve oradan doğrudan ödeme eklenebilir.

## Notlar
- Bu sürümde bildirimler yalnızca panel içindedir (e-posta/SMS gönderilmez).
  İleride e-posta bildirimi eklemek isterseniz Resend/Supabase Edge Functions
  ile genişletilebilir.
- Uygulama tek yönetici hesabı için tasarlanmıştır; daire sakinlerinin kendi
  girişi yoktur.
