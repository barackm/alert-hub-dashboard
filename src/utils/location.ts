import { LocationData } from "@/types/location";

export const defaultLocation: LocationData = {
  province: "",
  district: "",
  sector: "",
  cell: "",
  village: "",
};

export function parseLocation(locationString?: string | null): LocationData {
  if (!locationString) return defaultLocation;

  try {
    const parsed = JSON.parse(locationString);
    return {
      province: parsed.province || "",
      district: parsed.district || "",
      sector: parsed.sector || "",
      cell: parsed.cell || "",
      village: parsed.village || "",
    };
  } catch {
    return defaultLocation;
  }
}
