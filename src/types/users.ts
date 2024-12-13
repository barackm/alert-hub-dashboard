export type User = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
};

export enum UserStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
