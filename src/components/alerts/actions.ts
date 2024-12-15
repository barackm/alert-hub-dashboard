"use server";

import { Alert, AlertStatus } from "@/types/alerts";
import { FetchRequestParams, FetchResponse } from "@/types/fetch";
import { createClient } from "@/utils/supabase/server";

interface FetchAlertConfig extends FetchRequestParams {
  village?: string;
  status?: AlertStatus[];
}

export const getAlerts = async (
  config?: FetchAlertConfig
): Promise<FetchResponse<Alert[]>> => {
  const { limit = 10, page = 1, village, status } = config || {};
  const offset = (page - 1) * limit;

  const supabase = await createClient();

  let query = supabase.from("alerts").select("*", { count: "exact" });

  if (village) {
    query = query.eq("village", village);
  }

  if (status && status.length > 0) {
    query = query.in("status", status);
  }

  const { data, error, count } = await query
    .range(offset, offset + limit - 1)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: data || [],
    total: count || 0,
  };
};
