"use client";
import type { images } from "@prisma/client";
import Image from "next/image";
import React from "react";
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
  userQuantity: number;
  productQuantity: number;
}

function CartItem({
  id,
  images,
  price,
  name,
  size,
  itemId,
  productQuantity,
  userQuantity,
}: CartItemProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const utils = api.useContext();

  const { mutate: removeItem } = api.cart.removeItemFromCart.useMutation({
    onSuccess: async () => {
      await utils.cart.getUserCart.invalidate();
      setIsLoading(false);
    },
    onError: (error) => {
      console.log(error);
      setIsLoading(false);
    },
  });

  const { mutate: increaseItemQuantity } =
    api.cart.increaseItemQuantity.useMutation({
      onSuccess: async () => {
        await utils.cart.getUserCart.invalidate();
        setIsLoading(false);
      },
      onError: (error) => {
        console.log(error);
        setIsLoading(false);
      },
    });

  const { mutate: decreaseItemQuantity } =
    api.cart.decreaseItemQuantity.useMutation({
      onSuccess: async () => {
        await utils.cart.getUserCart.invalidate();
        setIsLoading(false);
      },
      onError: (error) => {
        console.log(error);
        setIsLoading(false);
      },
    });

  let url;

  const { data } = api.store.getS3Url.useQuery({
    file_key: images[0]?.key ? images[0]?.key : "",
  });

  if (data) {
    url = data;
  }

  const handleIncreaseQuantity = () => {
    setIsLoading(true);
    if (userQuantity + 1 > productQuantity) {
      return;
    }
    increaseItemQuantity({ itemId });
  };

  const handleDecreaseQuantity = () => {
    if (userQuantity === 1) {
      return;
    }
    decreaseItemQuantity({ itemId });
  };

  const handleRemoveItem = () => {
    setIsLoading(true);
    removeItem({ itemId });
  };

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
              className={`h-8 w-8 border-white/80 bg-transparent text-white ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              variant="outline"
              size="icon"
              disabled={isLoading}
              onClick={handleDecreaseQuantity}
            >
              <MinusCircle className="h-3 w-3" />
            </Button>
            <Input
              type="number"
              value={userQuantity}
              disabled
              className="focus:visible:ring-0 h-[30px] w-[60px] text-center text-[12px] text-black focus:outline-none focus:ring-0"
              readOnly
            />
            <Button
              className={`h-8 w-8 border-white/80 bg-transparent text-white ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              variant="outline"
              size="icon"
              disabled={isLoading}
              onClick={handleIncreaseQuantity}
            >
              <PlusCircle className="h-3 w-3" />
            </Button>
          </div>
          <button
            className="h-w-full text-left text-[10px] text-white hover:underline"
            onClick={handleRemoveItem}
          >
            remove from cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
