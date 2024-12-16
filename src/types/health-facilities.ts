export interface HealthFacility {
  id: number;
  created_at: string;
  name: string;
  phone: string;
  location: string;
}

export interface HealthFacilityRequestBody {
  name: string;
  phone: string;
  location: string;
}
