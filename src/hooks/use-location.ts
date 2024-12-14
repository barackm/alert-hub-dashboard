import useSWR from "swr";
import { fetchLocation } from "@/actions/location";
type DataState = {
  selectedProvince?: string;
  selectedDistrict?: string;
  selectedSector?: string;
  selectedCell?: string;
};
export function useLocations(state: DataState) {
  const { selectedProvince, selectedDistrict, selectedSector, selectedCell } =
    state;

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
    loadingState: {
      loadingProvinces,
      loadingDistricts,
      loadingSectors,
      loadingCells,
      loadingVillages,
    },
  };
}
