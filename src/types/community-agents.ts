export type CommunityAgent = {
  id: number;
  created_at: string;
  phone: string;
  first_name: string;
  last_name: string;
  village: string;
  status: CommunityAgentStatus;
};

export enum CommunityAgentStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export type CommunityAgentFormValues = {
  first_name: string;
  last_name: string;
  phone: string;
  village: string;
  status: CommunityAgentStatus;
};
