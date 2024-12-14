"use server";

import { createClient } from "@/utils/supabase/server";
import { CommunityAgentRequestBody } from "@/types/community-agents";
import { revalidatePath } from "next/cache";

export const fetchCommunityAgents = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("community_agents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
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
