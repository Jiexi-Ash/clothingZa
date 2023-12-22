import Footer from "@/app/_components/footer";
import Navbar from "@/app/_components/navbar";
import SizeAndPrice from "@/app/_components/products/sizeAndPrice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { Separator } from "@/app/_components/ui/separator";
import { api } from "@/trpc/server";
import Image from "next/image";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

async function ProductPage({ params }: Props) {
  const { id } = params;
  const productData = id
    ? await api.product.getProduct.query({ id: parseInt(id) })
    : null;

  if (!productData) return null;
  console.log(productData);
  const url = productData.images[0]?.key
    ? await api.store.getS3Url.query({ file_key: productData.images[0]?.key })
    : "";
  const prices = productData.priceAndsize
    .filter((item) => item.price > 0)
    .map((item) => item.price);

  const lowestPrice = Math.min(...prices);

  return (
    <div className="flex min-h-screen w-full flex-col bg-darkbg bg-cover bg-no-repeat">
      <Navbar />
      <div className="my-[60px] flex h-full w-full flex-col gap-10 px-10 lg:flex-row">
        <div className="h-full w-full flex-1">
          <div className="relative h-[400px] w-full">
            <Image
              src={url}
              fill
              className="object-contain"
              alt={productData.name}
              loading="lazy"
            />
          </div>
        </div>
        <div className="h-full w-full flex-1">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-3">
              <h1 className="text-3xl font-bold text-white">
                {productData?.name}
              </h1>
              <SizeAndPrice
                productSizeAndPrice={productData?.priceAndsize}
                productId={productData.id}
              />
            </div>
            {/* <AddToCartBtn productId={productData.id} productQuantity={0} /> */}
            <Separator className="h-[2px] w-full bg-gradient-to-r from-green-500 to-sky-500" />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="Description" className="text-white">
                <AccordionTrigger className="text-white">
                  Description
                </AccordionTrigger>
                <AccordionContent>{productData?.description}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductPage;
