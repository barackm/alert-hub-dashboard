"use server";

const BASE_URL = process.env.BACKEND_URL;

type LocationQuery = {
  province?: string;
  district?: string;
  sector?: string;
  cell?: string;
};

export const fetchLocation = async (query: LocationQuery) => {
  const queryObj = {
    province: query.province || "",
    district: query.district || "",
    sector: query.sector || "",
    cell: query.cell || "",
  };
  const searchParams = new URLSearchParams(queryObj);
  const response = await fetch(
    `${BASE_URL}/location?${searchParams.toString()}`
  );
  const data = await response.json();
  return data;
};
