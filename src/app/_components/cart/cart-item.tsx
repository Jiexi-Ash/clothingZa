"use client";
import type { images } from "@prisma/client";
import Image from "next/image";
import React from "react";
import CartActions from "./cart-actions";
import { api } from "@/trpc/react";
import { Button } from "../ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Input } from "../ui/input";

interface CartItemProps {
  id: number;
  images: images[];
  price: number;
  name: string;
  size: string;
  itemId: string;
}

function CartItem({ id, images, price, name, size, itemId }: CartItemProps) {
  const utils = api.useContext();
  const { mutate: removeItem } = api.cart.removeItemFromCart.useMutation({
    onSuccess: async () => {
      await utils.cart.getUserCart.invalidate();
      console.log("removed item from cart");
    },
    onError: (error) => {
      console.log(error);
    },
  });
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
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <Button
              className="h-8 w-8 border-white/80 bg-transparent text-white"
              variant="outline"
              size="icon"
            >
              <MinusCircle className="h-3 w-3" />
            </Button>
            <Input
              type="number"
              value={1}
              disabled
              className="focus:visible:ring-0 h-[30px] w-[60px] text-center text-[12px] text-black focus:outline-none focus:ring-0"
              readOnly
            />
            <Button
              className="h-8 w-8 border-white/80 bg-transparent text-white"
              variant="outline"
              size="icon"
            >
              <PlusCircle className="h-3 w-3" />
            </Button>
          </div>
          <button
            className="h-w-full text-left text-[10px] text-white hover:underline"
            onClick={() => removeItem({ itemId })}
          >
            remove from cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
