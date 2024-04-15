"use client";

import { UseStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StoreSchema } from "@/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

export const StoreModal = () => {
  const storemodal = UseStoreModal();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof StoreSchema>>({
    resolver: zodResolver(StoreSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof StoreSchema>) => {
    try {
      setIsLoading(true);

      const response = await axios.post("/api/stores", value);
      window.location.assign(`/${response.data.id}`); // This is a better option to router.refresh
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Create store"
      description="Add a new store"
      isOpen={storemodal.isOpen}
      onClose={storemodal.onClose}
    >
      <div>
        <div className=" space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E-commerce"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  onClick={storemodal.onClose}
                  variant={"outline"}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
