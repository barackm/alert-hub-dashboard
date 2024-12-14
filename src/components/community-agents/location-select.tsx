"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocations } from "@/hooks/use-location";
import { UseFormSetValue } from "react-hook-form";
import { CommunityAgentFormValues } from "./schema";
import { FormLabel } from "../ui/form";
import { Label } from "../ui/label";

interface LocationSelectProps {
  setValue: UseFormSetValue<CommunityAgentFormValues>;
}

export function LocationSelect({ setValue }: LocationSelectProps) {
  const {
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
    loadingState,
  } = useLocations();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Province</Label>
        <Select
          value={selectedProvince}
          onValueChange={(value) => {
            setSelectedProvince(value);
            setSelectedDistrict("");
            setSelectedSector("");
            setSelectedCell("");
            setValue("village", "");
          }}
          disabled={loadingState.loadingProvinces}
        >
          <SelectTrigger loading={loadingState.loadingProvinces}>
            <SelectValue placeholder="Select province" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province} value={province}>
                {province}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedProvince && (
        <div className="space-y-2">
          <Label>District</Label>
          <Select
            value={selectedDistrict}
            onValueChange={(value) => {
              setSelectedDistrict(value);
              setSelectedSector("");
              setSelectedCell("");
              setValue("village", "");
            }}
            disabled={loadingState.loadingDistricts}
          >
            <SelectTrigger loading={loadingState.loadingDistricts}>
              <SelectValue placeholder="Select district" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedDistrict && (
        <div className="space-y-2">
          <Label>Sector</Label>
          <Select
            value={selectedSector}
            onValueChange={(value) => {
              setSelectedSector(value);
              setSelectedCell("");
              setValue("village", "");
            }}
            disabled={loadingState.loadingSectors}
          >
            <SelectTrigger loading={loadingState.loadingSectors}>
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedSector && (
        <div className="space-y-2">
          <Label>Cell</Label>
          <Select
            value={selectedCell}
            onValueChange={(value) => {
              setSelectedCell(value);
              setValue("village", "");
            }}
            disabled={loadingState.loadingCells}
          >
            <SelectTrigger loading={loadingState.loadingCells}>
              <SelectValue placeholder="Select cell" />
            </SelectTrigger>
            <SelectContent>
              {cells.map((cell) => (
                <SelectItem key={cell} value={cell}>
                  {cell}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedCell && (
        <div className="space-y-2">
          <FormLabel>Village</FormLabel>
          <Select
            onValueChange={(value) => setValue("village", value)}
            disabled={loadingState.loadingVillages}
          >
            <SelectTrigger loading={loadingState.loadingVillages}>
              <SelectValue placeholder="Select village" />
            </SelectTrigger>
            <SelectContent>
              {villages.map((village) => (
                <SelectItem key={village} value={village}>
                  {village}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
