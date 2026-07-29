import { login } from "./actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { hata?: string };
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-ink-faint mb-2">
            Apartman Defteri
          </p>
          <h1 className="font-display italic text-3xl text-ink">
            Yönetici Girişi
          </h1>
        </div>

        <form
          action={login}
          className="ledger-card rounded-md p-6 space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1"
            >
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded border border-paperline bg-paper px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-brass"
              placeholder="yonetici@ornek.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1"
            >
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded border border-paperline bg-paper px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-brass"
              placeholder="••••••••"
            />
          </div>

          {searchParams?.hata && (
            <p className="text-sm text-stampred">
              E-posta veya şifre hatalı. Lütfen tekrar deneyin.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded bg-ink text-paper font-semibold py-2.5 hover:bg-ink-light transition-colors"
          >
            Giriş yap
          </button>
        </form>

        <p className="text-xs text-ink-faint text-center mt-6">
          Hesabınız Supabase üzerinden yönetici tarafından oluşturulur.
        </p>
      </div>
    </main>
  );
}
