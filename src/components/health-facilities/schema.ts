import * as z from "zod";

export const healthFacilitySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  province: z.string().min(2, "Province is required"),
  district: z.string().min(2, "District is required"),
  sector: z.string().min(2, "Sector is required"),
  cell: z.string().optional(),
  village: z.string().optional(),
});

export type HealthFacilityFormValues = z.infer<typeof healthFacilitySchema>;
