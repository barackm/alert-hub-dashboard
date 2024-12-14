"use server";

import { createClient } from "@/utils/supabase/server";

type Config = {
  village?: string;
};

export const getAlerts = async (config?: Config) => {
  console.log({ config });

  const supabase = await createClient();
  const { data, error } = await supabase.from("alerts").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
