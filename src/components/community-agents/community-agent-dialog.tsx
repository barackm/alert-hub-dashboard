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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { communityAgentSchema, type CommunityAgentFormValues } from "./schema";
import { CommunityAgentStatus } from "@/types/community-agents";
import { useEffect } from "react";
import { useCommunityAgents } from "../../hooks/use-community-agents";
import { isEqual } from "lodash";
import { toast } from "sonner";
import { LocationSelect } from "./location-select";
import { parseLocation } from "@/utils/location";

export function CommunityAgentDialog() {
  const selectedAgent = useCommunityAgents((state) => state.selectedAgent);
  const isDialogOpen = useCommunityAgents((state) => state.isDialogOpen);
  const isLoading = useCommunityAgents((state) => state.isLoading);
  const closeDialog = useCommunityAgents((state) => state.closeDialog);
  const createAgent = useCommunityAgents((state) => state.createAgent);
  const updateAgent = useCommunityAgents((state) => state.updateAgent);

  const form = useForm<CommunityAgentFormValues>({
    resolver: zodResolver(communityAgentSchema),
    defaultValues: selectedAgent ?? {
      first_name: "",
      last_name: "",
      phone: "",
      status: CommunityAgentStatus.ACTIVE,
      province: "",
      district: "",
      sector: "",
      cell: "",
      village: "",
    },
  });

  useEffect(() => {
    const currentValues = form.getValues();
    const locationData = parseLocation(selectedAgent?.location);

    const newValues = selectedAgent
      ? {
          first_name: selectedAgent.first_name,
          last_name: selectedAgent.last_name,
          phone: selectedAgent.phone,
          status: selectedAgent.status,
          ...locationData,
        }
      : {
          first_name: "",
          last_name: "",
          phone: "",
          status: CommunityAgentStatus.ACTIVE,
          ...locationData,
        };

    if (!isEqual(currentValues, newValues)) {
      form.reset(newValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAgent]);

  const handleSubmit = async (values: CommunityAgentFormValues) => {
    try {
      const body = {
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        location: JSON.stringify({
          province: values.province,
          district: values.district,
          sector: values.sector,
          cell: values.cell,
          village: values.village,
        }),
        status: values.status as CommunityAgentStatus,
      };
      if (selectedAgent) {
        await updateAgent(selectedAgent.id, body);
        toast.success("Agent updated successfully");
      } else {
        await createAgent(body);
        toast.success("Agent created successfully");
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
            {selectedAgent ? "Edit Agent" : "Add New Agent"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
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
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      {Object.keys(CommunityAgentStatus).map((status) => (
                        <FormItem
                          key={status}
                          className="flex items-center space-x-2"
                        >
                          <div className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem
                                value={
                                  CommunityAgentStatus[
                                    status as keyof typeof CommunityAgentStatus
                                  ]
                                }
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {status.charAt(0).toUpperCase() +
                                status.slice(1).toLowerCase()}
                            </FormLabel>
                          </div>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <div className="flex justify-end space-x-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={isLoading}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" loading={isLoading}>
                  {selectedAgent ? "Save" : "Create"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
