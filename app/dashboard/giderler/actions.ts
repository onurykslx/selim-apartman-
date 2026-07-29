"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function giderEkle(formData: FormData) {
  const supabase = createClient();

  const baslik = String(formData.get("baslik") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "Genel").trim() || "Genel";
  const tutar = Number(formData.get("tutar") ?? 0);
  const tarih = String(formData.get("tarih") ?? "");
  const aciklama = String(formData.get("aciklama") ?? "").trim() || null;

  if (!baslik || !tutar || !tarih) return;

  await supabase.from("giderler").insert({ baslik, kategori, tutar, tarih, aciklama });
  revalidatePath("/dashboard/giderler");
  revalidatePath("/dashboard");
}

export async function giderSil(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase.from("giderler").delete().eq("id", id);
  revalidatePath("/dashboard/giderler");
  revalidatePath("/dashboard");
}
