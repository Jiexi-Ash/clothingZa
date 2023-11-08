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
import UplaodProductImage from "../ImagePrev";
import { uploadToS3 } from "@/lib/s3";
import { api } from "@/trpc/react";

const formData = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(3, "Description must be at least 3 characters"),
    smallPrice: z.coerce.number().optional(),
    mediumPrice: z.coerce.number().optional(),
    largePrice: z.coerce.number().optional(),
    extraLargePrice: z.coerce.number().optional(),
    extraExtraLargePrice: z.coerce.number().optional(),
    smallSize: z.coerce.number().optional(),
    mediumSize: z.coerce.number().optional(),
    largeSize: z.coerce.number().optional(),
    extraLargeSize: z.coerce.number().optional(),
    extraExtraLargeSize: z.coerce.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.smallSize === 0 &&
      data.mediumSize === 0 &&
      data.largeSize === 0 &&
      data.extraLargeSize === 0 &&
      data.extraExtraLargeSize === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one size is required",
        path: ["smallSize", "mediumSize", "largeSize", "extraLargeSize"],
      });
    }
    if (
      data.smallPrice === 0 &&
      data.mediumPrice === 0 &&
      data.largePrice === 0 &&
      data.extraLargePrice === 0 &&
      data.extraExtraLargePrice === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "fghfghfgh",
        path: [
          "smallPrice",
          "mediumPrice",
          "largePrice",
          "extraLargePrice",
          "extraExtraLargePrice",
        ],
      });
    }
  });

interface AddProductProps {
  storeName: string;
}

function AddProduct({ storeName }: AddProductProps) {
  const [image, setImage] = React.useState<File | null>(null);
  const utils = api.useContext();
  const form = useForm<z.infer<typeof formData>>({
    resolver: zodResolver(formData),
    defaultValues: {
      name: "",
      description: "",
      smallPrice: 0,
      mediumPrice: 0,
      largePrice: 0,
      extraLargePrice: 0,
      extraExtraLargePrice: 0,
      smallSize: 0,
      mediumSize: 0,
      largeSize: 0,
      extraLargeSize: 0,
      extraExtraLargeSize: 0,
    },
  });

  const { mutate: createProduct } = api.product.addProduct.useMutation({
    onSuccess: async (data) => {
      console.log("success");
      await utils.store.getAllStoreProducts.invalidate();
      console.log(data);
      form.reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (data: z.infer<typeof formData>) => {
    const {
      name,
      description,
      smallSize,
      smallPrice,
      mediumPrice,
      largePrice,
      extraLargePrice,
      extraExtraLargePrice,
      mediumSize,
      largeSize,
      extraLargeSize,
      extraExtraLargeSize,
    } = data;

    const uploadData = await handleUplaod();

    if (uploadData?.file_key) {
      createProduct({
        name,
        description,
        smallSize,
        mediumSize,
        largeSize,
        extraLargeSize,
        extraExtraLargeSize,
        smallPrice,
        mediumPrice,
        largePrice,
        extraLargePrice,
        extraExtraLargePrice,
        image_key: uploadData.file_key,
      });
    }
  };

  const handleUplaod = async () => {
    if (!image) return;

    if (image.size > 1024 * 1024 * 10) {
      alert("Image size is too large.");
      return;
    }
    try {
      const data = await uploadToS3(image, storeName);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[700px] overflow-auto">
        <DialogHeader className="text-left">
          <DialogTitle>Add Product</DialogTitle>
          <UplaodProductImage setImage={setImage} />
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product anme" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium">Prices based on sizes</p>
              <p className="text-sm text-slate-300">
                At least one price for a size is required
              </p>
              <div className="grid grid-cols-5 gap-3">
                <FormField
                  control={form.control}
                  name="smallPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>S</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mediumPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>M</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="largePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>L</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="extraLargePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>XL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="extraExtraLargePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>2XL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium">Quantity in sizes</p>
              <p className="text-sm text-slate-300">
                At least one size quantity is required
              </p>
              <div className="grid grid-cols-5 gap-3">
                <FormField
                  control={form.control}
                  name="smallSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>S</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mediumSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>M</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="largeSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>L</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="extraLargeSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>XL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="extraExtraLargeSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>2XL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Product</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddProduct;
