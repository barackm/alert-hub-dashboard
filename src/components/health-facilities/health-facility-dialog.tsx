"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { healthFacilitySchema, type HealthFacilityFormValues } from "./schema";
import { useEffect } from "react";
import { useHealthFacilities } from "../../hooks/use-health-facilities";
import { isEqual } from "lodash";
import { toast } from "sonner";
import { LocationSelect } from "../community-agents/location-select";
import { parseLocation } from "@/utils/location";

export function HealthFacilityDialog() {
  const selectedFacility = useHealthFacilities(
    (state) => state.selectedFacility
  );
  const isDialogOpen = useHealthFacilities((state) => state.isDialogOpen);
  const isLoading = useHealthFacilities((state) => state.isLoading);
  const closeDialog = useHealthFacilities((state) => state.closeDialog);
  const createFacility = useHealthFacilities((state) => state.createFacility);
  const updateFacility = useHealthFacilities((state) => state.updateFacility);

  const form = useForm<HealthFacilityFormValues>({
    resolver: zodResolver(healthFacilitySchema),
    defaultValues: selectedFacility ?? {
      name: "",
      phone: "",
      province: "",
      district: "",
      sector: "",
      cell: "",
      village: "",
    },
  });

  useEffect(() => {
    const currentValues = form.getValues();
    const locationData = parseLocation(selectedFacility?.location);

    const newValues = selectedFacility
      ? {
          name: selectedFacility.name,
          phone: selectedFacility.phone,
          ...locationData,
        }
      : {
          name: "",
          phone: "",
          ...locationData,
        };

    if (!isEqual(currentValues, newValues)) {
      form.reset(newValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFacility]);

  const handleSubmit = async (values: HealthFacilityFormValues) => {
    try {
      const body = {
        name: values.name,
        phone: values.phone,
        location: JSON.stringify({
          province: values.province,
          district: values.district,
          sector: values.sector,
          cell: values.cell,
          village: values.village,
        }),
      };

      if (selectedFacility) {
        await updateFacility(selectedFacility.id, body);
        toast.success("Facility updated successfully");
      } else {
        await createFacility(body);
        toast.success("Facility created successfully");
      }
      form.reset();
      closeDialog();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedFacility ? "Edit Facility" : "Add New Facility"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facility Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LocationSelect />
            <DialogFooter>
              <div className="flex justify-end space-x-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={isLoading}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" loading={isLoading}>
                  {selectedFacility ? "Save" : "Create"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
