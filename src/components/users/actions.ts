"use server";

import { User } from "@/types/users";
import { createClient } from "@/utils/supabase/server";
import { FetchRequestParams, FetchResponse } from "@/types/fetch";

interface FetchUsersConfig extends FetchRequestParams {
  status?: string[];
}

export async function fetchUsers(
  config?: FetchUsersConfig
): Promise<FetchResponse<User>> {
  const { limit = 10, page = 1, status } = config || {};
  const offset = (page - 1) * limit;

  const supabase = await createClient();
  let query = supabase.from("profiles").select("*", { count: "exact" });

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
}
