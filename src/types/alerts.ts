export type Alert = {
  id: number;
  created_at: string;
  incident_type: IncidentType;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  identifier: string;
  affected_count: string;
  details: string;
  status: AlertStatus;
  reporter_phone: string;
  updated_at: string;
};

export enum AlertStatus {
  PENDING = "PENDING",
  FALSE_ALERT = "FALSE_ALERT",
  IMPROVED = "IMPROVED",
  WORSENED = "WORSENED",
  CONTAINED = "CONTAINED",
  EXAMINATION_CONTINUES = "EXAMINATION_CONTINUES",
}

export enum IncidentType {
  HumanDisease = "Human Disease",
  Death = "Human Death",
  Pandemic = "Pandemic",
  AnimalDiseaseDeath = "Animal Disease/Death",
  EbolaLikeSymptoms = "Ebola-like Symptoms",
  DogBites = "Dog Bites",
}
