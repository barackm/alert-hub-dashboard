"use server";

import { User } from "@/types/users";
import { createClient } from "@/utils/supabase/server";

export async function fetchUsers(): Promise<User[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profiles").select("*");
  if (error) {
    throw error;
  }
  return data;
}
