"use client";
import React from "react";

import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";

import {
  Dialog,
  DialogContent,
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
import { api } from "@/trpc/react";
import { PencilIcon } from "lucide-react";
import ImagePrev from "../ImagePrev";
import { deleteFromS3, uploadToS3 } from "@/lib/s3";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  address: z.string().min(3, "Address must be at least 3 characters"),
});

interface UpdateStoreProps {
  storeName: string;
  address?: string;
  banner_key?: string | null;
}
function UpdateStore({ storeName, address, banner_key }: UpdateStoreProps) {
  const [image, setImage] = React.useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: storeName,
      address: address,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { name, address } = data;

    await handleUpload();
  };

  const handleUpload = async () => {
    if (!image) return;
    if (image.size > 1024 * 1024 * 10) {
      alert("Image size is too large.");
      return;
    }

    try {
      if (banner_key) {
        await deleteFromS3(banner_key);
      }
      const data = await uploadToS3(image, storeName);
      console.log(data);
    } catch (error) {}
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute right-4 top-5 z-10 h-8 w-8" size="icon">
          <PencilIcon className="h-4 w-4 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Store</DialogTitle>
        </DialogHeader>
        <ImagePrev setImage={setImage} />
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store</FormLabel>
                  <FormControl>
                    <Input placeholder="Store name" {...field} />
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
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Store Address"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateStore;
