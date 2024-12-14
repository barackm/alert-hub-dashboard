export type CommunityAgent = {
  id: number;
  created_at: string;
  phone: string;
  first_name: string;
  last_name: string;
  village: string;
  status: CommunityAgentStatus;
  location: string;
};

export enum CommunityAgentStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export type CommunityAgentRequestBody = {
  first_name: string;
  last_name: string;
  phone: string;
  location: string;
  status: CommunityAgentStatus;
};
