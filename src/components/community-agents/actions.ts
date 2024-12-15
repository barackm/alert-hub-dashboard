"use server";

import { createClient } from "@/utils/supabase/server";
import {
  CommunityAgent,
  CommunityAgentRequestBody,
} from "@/types/community-agents";
import { revalidatePath } from "next/cache";
import { FetchRequestParams, FetchResponse } from "@/types/fetch";

interface FetchCommunityAgentsConfig extends FetchRequestParams {
  province?: string;
  district?: string;
  sector?: string;
  cell?: string;
  village?: string;
}

export const fetchCommunityAgents = async (
  config?: FetchCommunityAgentsConfig
): Promise<FetchResponse<CommunityAgent>> => {
  const {
    limit = 10,
    page = 1,
    province,
    district,
    sector,
    cell,
    village,
  } = config || {};
  const offset = (page - 1) * limit;

  const supabase = await createClient();
  let query = supabase.from("community_agents").select("*", { count: "exact" });

  if (province) query = query.eq("province", province);
  if (district) query = query.eq("district", district);
  if (sector) query = query.eq("sector", sector);
  if (cell) query = query.eq("cell", cell);
  if (village) query = query.eq("village", village);

  const { data, error, count } = await query
    .range(offset, offset + limit - 1)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return {
    data: data || [],
    total: count || 0,
  };
};

export const createCommunityAgent = async (data: CommunityAgentRequestBody) => {
  const supabase = await createClient();
  const { data: newAgent, error } = await supabase
    .from("community_agents")
    .insert([data])
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/community-agents");
  return newAgent;
};

export const updateCommunityAgent = async (
  id: number,
  data: CommunityAgentRequestBody
) => {
  const supabase = await createClient();
  const { data: updatedAgent, error } = await supabase
    .from("community_agents")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/community-agents");
  return updatedAgent;
};

export const deleteCommunityAgent = async (id: number) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("community_agents")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/community-agents");
  return true;
};
