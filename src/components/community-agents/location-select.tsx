"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocations } from "@/hooks/use-location";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { CommunityAgentFormValues } from "./schema";

export function LocationSelect() {
  const { control, watch, setValue } =
    useFormContext<CommunityAgentFormValues>();
  const { provinces, districts, sectors, cells, villages, loadingState } =
    useLocations({
      selectedCell: watch("cell"),
      selectedDistrict: watch("district"),
      selectedProvince: watch("province"),
      selectedSector: watch("sector"),
    });

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="province"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Province</FormLabel>
            <Select
              value={field.value}
              onValueChange={(value) => {
                setValue("village", "");
                setValue("cell", "");
                setValue("sector", "");
                setValue("district", "");
                setValue("province", value);
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
            <FormMessage />
          </FormItem>
        )}
      />

      {watch("province") && (
        <FormField
          control={control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  setValue("village", "");
                  setValue("cell", "");
                  setValue("sector", "");
                  setValue("district", value);
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
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {watch("district") && (
        <FormField
          control={control}
          name="sector"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sector</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  setValue("village", "");
                  setValue("cell", "");
                  setValue("sector", value);
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
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {watch("sector") && (
        <FormField
          control={control}
          name="cell"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cell</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  setValue("village", "");
                  setValue("cell", value);
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
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {watch("cell") && (
        <FormField
          control={control}
          name="village"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Village</FormLabel>
              <Select
                value={field.value}
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
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
