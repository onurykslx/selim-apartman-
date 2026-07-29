"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function odemeEkle(formData: FormData) {
  const supabase = createClient();

  const daire_id = String(formData.get("daire_id") ?? "");
  const donem = String(formData.get("donem") ?? "");
  const tutar = Number(formData.get("tutar") ?? 0);
  const odeme_tarihi = String(formData.get("odeme_tarihi") ?? "");
  const aciklama = String(formData.get("aciklama") ?? "").trim() || null;

  if (!daire_id || !donem || !tutar || !odeme_tarihi) return;

  await supabase
    .from("odemeler")
    .insert({ daire_id, donem, tutar, odeme_tarihi, aciklama });

  revalidatePath("/dashboard/odemeler");
  revalidatePath("/dashboard");
}

export async function odemeSil(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase.from("odemeler").delete().eq("id", id);
  revalidatePath("/dashboard/odemeler");
  revalidatePath("/dashboard");
}
