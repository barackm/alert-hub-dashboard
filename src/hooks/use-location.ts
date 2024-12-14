import { useState } from "react";
import useSWR from "swr";
import { fetchLocation } from "@/actions/location";

export function useLocations() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedCell, setSelectedCell] = useState("");

  const { data: provinces = [], isLoading: loadingProvinces } = useSWR(
    "/provinces",
    () => fetchLocation({})
  );

  const { data: districts = [], isLoading: loadingDistricts } = useSWR(
    selectedProvince ? `/provinces/${selectedProvince}/districts` : null,
    () =>
      fetchLocation({
        province: selectedProvince,
      })
  );

  const { data: sectors = [], isLoading: loadingSectors } = useSWR(
    selectedDistrict ? `/districts/${selectedDistrict}/sectors` : null,
    () =>
      fetchLocation({ district: selectedDistrict, province: selectedProvince })
  );

  const { data: cells = [], isLoading: loadingCells } = useSWR(
    selectedSector ? `/sectors/${selectedSector}/cells` : null,
    () =>
      fetchLocation({
        sector: selectedSector,
        district: selectedDistrict,
        province: selectedProvince,
      })
  );

  const { data: villages = [], isLoading: loadingVillages } = useSWR(
    selectedCell ? `/cells/${selectedCell}/villages` : null,
    () =>
      fetchLocation({
        cell: selectedCell,
        sector: selectedSector,
        district: selectedDistrict,
        province: selectedProvince,
      })
  );

  return {
    provinces,
    districts,
    sectors,
    cells,
    villages,
    selectedProvince,
    selectedDistrict,
    selectedSector,
    selectedCell,
    setSelectedProvince,
    setSelectedDistrict,
    setSelectedSector,
    setSelectedCell,
    loadingState: {
      loadingProvinces,
      loadingDistricts,
      loadingSectors,
      loadingCells,
      loadingVillages,
    },
  };
}
