"use client";
import React from "react";

import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Textarea } from "@/app/_components/ui/textarea";

import { Input } from "@/app/_components/ui/input";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UplaodProductImage from "../uploadImage";
import { api } from "@/trpc/react";
import { Loader } from "lucide-react";

const formData = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  address: z.string().min(3, "Address must be at least 3 characters"),
});

function AddStore() {
  const [image, setImage] = React.useState<File | null>(null);

  const { mutate: createStore, isLoading } = api.store.createStore.useMutation({
    onSuccess: (data) => {
      setImage(null);
      console.log("Successfully created store");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const form = useForm<z.infer<typeof formData>>({
    resolver: zodResolver(formData),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formData>) => {
    const { name, address } = data;

    createStore({
      name,
      address,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Stores</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[700px] overflow-auto">
        <DialogHeader className="text-left">
          <DialogTitle>Add Store</DialogTitle>
          <UplaodProductImage setImage={setImage} />
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product anme" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">{isLoading ? <Loader /> : "Submit"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddStore;
