import Link from "next/link";
import { logout } from "@/app/login/actions";

const LINKLER = [
  { href: "/dashboard", label: "Özet" },
  { href: "/dashboard/daireler", label: "Daireler" },
  { href: "/dashboard/odemeler", label: "Ödemeler" },
  { href: "/dashboard/giderler", label: "Giderler" },
];

export default function Nav() {
  return (
    <header className="border-b border-paperline bg-paper/95 backdrop-blur sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-ink-faint">
            Apartman
          </p>
          <p className="font-display italic text-xl leading-none text-ink -mt-0.5">
            Defter
          </p>
        </div>

        <nav className="flex items-center gap-1 flex-wrap">
          {LINKLER.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm px-3 py-1.5 rounded text-ink-light hover:bg-ink hover:text-paper transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <form action={logout}>
          <button
            type="submit"
            className="text-sm px-3 py-1.5 rounded border border-paperline text-ink-faint hover:text-stampred hover:border-stampred transition-colors"
          >
            Çıkış
          </button>
        </form>
      </div>
    </header>
  );
}
