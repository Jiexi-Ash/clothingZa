"use client";
import type { images } from "@prisma/client";
import Image from "next/image";
import React from "react";
import CartActions from "./cart-actions";
import { api } from "@/trpc/react";

interface CartItemProps {
  id: number;
  images: images[];
  price: number;
  name: string;
  size: string;
}

function CartItem({ id, images, price, name, size }: CartItemProps) {
  let url;
  const { data } = api.store.getS3Url.useQuery({
    file_key: images[0]?.key ? images[0]?.key : "",
  });

  if (data) {
    url = data;
  }

  //   const url = images[0]?.key
  //     ? api.store.getS3Url.query({ file_key: images[0]?.key })
  //     : "";

  return (
    <div className="flex items-center space-x-3">
      <div className="relative h-24 w-24 rounded-lg">
        <Image
          // TODO create image placeholder
          src={url}
          fill
          className="object-contain"
          alt="product"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <h3 className="text-[12px] font-medium text-white">
          {name} ({size})
        </h3>
        <p className="text-[12px] font-medium text-white">
          R{price.toFixed(2)}
        </p>
        <CartActions />
      </div>
    </div>
  );
}

export default CartItem;
