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

import { Input } from "@/app/_components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PencilIcon } from "lucide-react";

const formData = z.object({
  firstName: z.string(),
  lastName: z.string(),
  emailAddress: z.string().email("Invalid Email Address"),
  phoneNumber: z.string().min(10, "Invalid Phone Number"),
  streetAddress: z.string(),
  complexOrBuilding: z.string(),
  city: z.string(),
  suburb: z.string(),
  province: z.string(),
  country: z.string(),
});

function AddAddressForm() {
  const [addNewAddress, setAddNewAddress] = React.useState(false);
  const form = useForm<z.infer<typeof formData>>({
    resolver: zodResolver(formData),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      streetAddress: "",
      complexOrBuilding: "",
      city: "",
      suburb: "",
      province: "",
      country: "South Africa",
    },
  });

  const userShippingData = api.cart.getUserShippingDetails.useQuery();

  const { mutate: addShippingDetails } =
    api.cart.addShippingDetails.useMutation({
      onSuccess: () => {
        form.reset();
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const onSubmit = (data: z.infer<typeof formData>) => {
    const {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      streetAddress,
      complexOrBuilding,
      city,
      suburb,
      province,
      country,
    } = data;

    console.log(data);

    // check if inputs are not empty
    if (
      firstName === "" ||
      lastName === "" ||
      emailAddress === "" ||
      phoneNumber === "" ||
      streetAddress === "" ||
      complexOrBuilding === "" ||
      city === "" ||
      suburb === "" ||
      province === "" ||
      country === ""
    ) {
      return;
    }

    addShippingDetails({
      firstName,
      lastName,
      email: emailAddress,
      phoneNumber,
      streetAddress,
      unitOrBuildingNumber: complexOrBuilding,
      city,
      suburb,
      province,
      country,
      zip: "0000",
    });
  };
  return (
    <div className="flex flex-col">
      <Card className="w-full bg-transparent text-white">
        <CardHeader className="flex w-full flex-row items-center justify-between">
          <CardTitle>Ship To</CardTitle>
          <PencilIcon className="h-4 w-4 cursor-pointer" />
        </CardHeader>
        <CardContent className="text-sm">
          <div className="flex flex-col">
            <p>{userShippingData.data?.StreetAddress}</p>
            <p>
              <span className="mr-2">Building/unit/Apartment no:</span>
              {userShippingData.data?.unitOrBldgNo}
            </p>
            <p>{userShippingData.data?.province}</p>
            <p>{userShippingData.data?.city}</p>
            <p>{userShippingData.data?.suburb}</p>
            <p>{userShippingData.data?.country}</p>
            <p>{userShippingData.data?.zip}</p>
          </div>
        </CardContent>
      </Card>
      {addNewAddress && (
        <Form {...form}>
          <form
            className="flex flex-col space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white" htmlFor="firstName">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="firstName"
                      className="relative hidden w-full border border-white/60  bg-transparent text-white lg:block"
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white" htmlFor="lastName">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="lastName"
                      className="relative hidden w-full border border-white/60  bg-transparent text-white lg:block"
                      placeholder="Last Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white" htmlFor="emailAddress">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="emailAddress"
                      className="relative hidden w-full border border-white/60  bg-transparent text-white lg:block"
                      placeholder="Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white" htmlFor="phoneNumber">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="phoneNumber"
                      className="relative hidden w-full border border-white/60  bg-transparent text-white lg:block"
                      placeholder="Phone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white" htmlFor="province">
                    Province
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="province"
                      className="relative hidden w-full border border-white/60  bg-transparent text-white lg:block"
                      placeholder="Province"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white" htmlFor="streetAddress">
                    Street Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="streetAddress"
                      className="relative hidden w-full border border-white/60  bg-transparent text-white lg:block"
                      placeholder="Street Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="complexOrBuilding"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white" htmlFor="complexOrBuilding">
                    Complex / Building / Unit Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="complexOrBuilding"
                      className="relative hidden w-full border border-white/60  bg-transparent text-white lg:block"
                      placeholder="Complex / Building / Unit Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="suburb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white" htmlFor="suburb">
                    Suburb
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="suburb"
                      className="relative hidden w-full border border-white/60  bg-transparent text-white lg:block"
                      placeholder="Suburb"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white" htmlFor="city">
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="city"
                      className="relative hidden w-full border border-white/60  bg-transparent text-white lg:block"
                      placeholder="City"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white" htmlFor="country">
                    Country
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="country"
                      className="relative hidden w-full border border-white/60  bg-transparent text-white lg:block"
                      placeholder="Country"
                      {...field}
                      value={"South Africa"}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full justify-between space-x-4">
              <Button
                variant="outline"
                className="w-full border border-white/60 bg-transparent py-8 text-white transition-all duration-100 ease-in-out"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full  bg-white py-8 text-black transition-all duration-100 ease-in-out hover:bg-white/70"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default AddAddressForm;
