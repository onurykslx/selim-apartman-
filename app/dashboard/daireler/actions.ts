"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function daireEkle(formData: FormData) {
  const supabase = createClient();

  const no = String(formData.get("no") ?? "").trim();
  const sakin_adi = String(formData.get("sakin_adi") ?? "").trim();
  const telefon = String(formData.get("telefon") ?? "").trim() || null;
  const aylik_aidat = Number(formData.get("aylik_aidat") ?? 0);

  if (!no || !sakin_adi) return;

  await supabase.from("daireler").insert({ no, sakin_adi, telefon, aylik_aidat });
  revalidatePath("/dashboard/daireler");
  revalidatePath("/dashboard");
}

export async function daireSil(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase.from("daireler").delete().eq("id", id);
  revalidatePath("/dashboard/daireler");
  revalidatePath("/dashboard");
}

export async function daireGuncelle(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get("id") ?? "");
  const no = String(formData.get("no") ?? "").trim();
  const sakin_adi = String(formData.get("sakin_adi") ?? "").trim();
  const telefon = String(formData.get("telefon") ?? "").trim() || null;
  const aylik_aidat = Number(formData.get("aylik_aidat") ?? 0);

  if (!id || !no || !sakin_adi) return;

  await supabase
    .from("daireler")
    .update({ no, sakin_adi, telefon, aylik_aidat })
    .eq("id", id);

  revalidatePath("/dashboard/daireler");
  revalidatePath("/dashboard");
}
