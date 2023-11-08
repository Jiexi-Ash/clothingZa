import { api } from "@/trpc/server";
import React from "react";

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Separator } from "../ui/separator";

type RouterOutput = inferRouterOutputs<AppRouter>;
type ProductGetAll = RouterOutput["store"]["getAllStoreProducts"];

async function DashboardProducts() {
  const productData = await api.store.getAllStoreProducts.query();

  console.log(productData);
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {productData?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default DashboardProducts;

const ProductCard = async ({ product }: { product: ProductGetAll[number] }) => {
  const url = product.images[0]?.key
    ? await api.store.getS3Url.query({ file_key: product.images[0]?.key })
    : "";
  return (
    <Card className="h-full rounded-lg border bg-gray-200">
      <CardContent className="items-center p-0 py-6">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={url}
            fill
            className="object-contain"
            alt={product.name as string}
          />
        </AspectRatio>
      </CardContent>
      <CardFooter>
        <p className="flex w-full items-center justify-center font-bold">
          {product.name}
        </p>
      </CardFooter>
    </Card>
  );
};
