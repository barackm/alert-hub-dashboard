import * as z from "zod";

export const communityAgentSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  village: z.string().min(2, "Village is required"),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export type CommunityAgentFormValues = z.infer<typeof communityAgentSchema>;
