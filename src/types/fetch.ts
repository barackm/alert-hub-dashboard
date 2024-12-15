export type FetchRequestParams = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
};

export type FetchResponse<TData> = {
  data: TData[];
  total: number;
};
