import { api } from "@/trpc/server";
import React from "react";

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import { AspectRatio } from "../_components/ui/aspect-ratio";
import Image from "next/image";
import { Separator } from "../_components/ui/separator";
import { Button } from "../_components/ui/button";
import Navbar from "../_components/navbar";

type RouterOutput = inferRouterOutputs<AppRouter>;
type getAllProducts = RouterOutput["product"]["getAllProducts"];

async function ProductsPage() {
  const productsData = await api.product.getAllProducts.query();

  return (
    <div className="flex min-h-screen w-full flex-col bg-darkbg bg-cover bg-no-repeat">
      <Navbar />
      <div className="container relative mx-auto my-[60px] flex h-full w-full flex-col gap-10">
        <div className="grid w-full gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;

const ProductCard = async ({
  product,
}: {
  product: getAllProducts[number];
}) => {
  const url = product.images[0]?.key
    ? await api.store.getS3Url.query({ file_key: product.images[0]?.key })
    : "";

  // map through the price and size array
  // get the lowest price

  const prices = product.priceAndsize
    .filter((item) => item.price > 0)
    .map((item) => item.price);

  const lowestPrice = Math.min(...prices);

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="rounded-md border border-[#72FFFF]/70 bg-transparent pt-4">
        <CardHeader className="flex items-center p-0 py-2">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={url}
              fill
              className="rounded-md bg-center object-contain"
              alt={product.name}
              loading="lazy"
            />
          </AspectRatio>
        </CardHeader>
        <div className="flex w-full items-center justify-center ">
          <Separator className="h-[2px] w-[95%] bg-white/50 bg-gradient-to-r from-green-500 to-sky-500" />
        </div>
        <CardContent className="py-4">
          <div className="flex w-full flex-col space-y-2">
            <CardTitle className="text-sm text-white">{product.name}</CardTitle>
            <CardDescription className="text-sm text-slate-300">
              Starting from R{lowestPrice.toFixed(2)}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
