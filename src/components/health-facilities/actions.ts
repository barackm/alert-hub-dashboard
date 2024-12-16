"use server";

import {
  HealthFacility,
  HealthFacilityRequestBody,
} from "@/types/health-facilities";
import { FetchRequestParams, FetchResponse } from "@/types/fetch";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function fetchHealthFacilities(
  config?: FetchRequestParams
): Promise<FetchResponse<HealthFacility>> {
  const { limit = 10, page = 1 } = config || {};
  const offset = (page - 1) * limit;

  const supabase = await createClient();
  const { data, error, count } = await supabase
    .from("health_facilities")
    .select("*", { count: "exact" })
    .range(offset, offset + limit - 1)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return {
    data: data || [],
    total: count || 0,
  };
}

export async function createHealthFacility(
  data: HealthFacilityRequestBody
): Promise<HealthFacility> {
  const supabase = await createClient();
  const { data: facility, error } = await supabase
    .from("health_facilities")
    .insert([data])
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/health-facilities");
  return facility;
}

export async function updateHealthFacility(
  id: number,
  data: HealthFacilityRequestBody
): Promise<HealthFacility> {
  const supabase = await createClient();
  const { data: facility, error } = await supabase
    .from("health_facilities")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/health-facilities");
  return facility;
}

export async function deleteHealthFacility(id: number): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("health_facilities")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/health-facilities");
  return true;
}
