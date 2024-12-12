export type User = {
  id: string;
  email: string;
  username: string;
  created_at: string;
  updated_at: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};
