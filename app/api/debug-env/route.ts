import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  let urlGecerliMi = false;
  try {
    if (url) {
      new URL(url);
      urlGecerliMi = true;
    }
  } catch {
    urlGecerliMi = false;
  }

  return NextResponse.json({
    NEXT_PUBLIC_SUPABASE_URL: {
      tanimli: Boolean(url),
      uzunluk: url.length,
      baslangic: url.slice(0, 24),
      gecerliUrlFormati: urlGecerliMi,
    },
    NEXT_PUBLIC_SUPABASE_ANON_KEY: {
      tanimli: Boolean(key),
      uzunluk: key.length,
      baslangic: key.slice(0, 12),
      jwtGibiMi: key.startsWith("eyJ"),
    },
  });
}
