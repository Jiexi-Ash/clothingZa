"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { ShoppingBagIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import CartItem from "./cart/cart-item";
import Link from "next/link";
import { api } from "@/trpc/react";

function UserCart() {
  const { data } = api.cart.getUserCart.useQuery();
  console.log(data);

  const itemsLength = data?.items.length ?? 0;
  console.log(itemsLength);

  const subTotal = data?.items.reduce((acc, item) => {
    return acc + item.priceAndsize.price;
  }, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          // className="relative flex h-8  w-8 items-center justify-center rounded-lg  border border-white/50"

          className={`relative flex h-8  w-8 items-center justify-center rounded-lg  border border-white/50 ${
            data ? "bg-[#72FFFF]/50" : "bg-transparent"
          }`}
          variant="ghost"
          size="icon"
        >
          <Badge className="absolute -top-2 left-3 flex h-4 w-4 items-center justify-center rounded-full bg-black p-0 text-[10px] text-white lg:left-4">
            {data?.items.length}
          </Badge>
          <ShoppingBagIcon className="h-5 w-5 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex h-full w-full flex-col bg-slate-800 lg:w-[400px]"
        side="right"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl text-white">My Cart</SheetTitle>
          <SheetDescription className="text-white">
            {itemsLength} items
          </SheetDescription>
        </SheetHeader>
        <Separator className="h-[2px] w-full bg-gradient-to-r from-green-500 to-sky-500" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <ScrollArea className="h-full">
            <div className="flex flex-col space-y-4">
              {data?.items.map((item) => (
                <CartItem
                  itemId={item.id}
                  id={item.priceAndsize.product.id}
                  name={item.priceAndsize.product.name}
                  images={item.priceAndsize.product.images}
                  price={item.priceAndsize.price}
                  size={item.priceAndsize.size}
                  key={item.id}
                  productQuantity={item.priceAndsize.quantity}
                  userQuantity={item.quantity}
                />
              ))}
            </div>
          </ScrollArea>

          <Separator className="h-[2px] w-full bg-gradient-to-r from-green-500 to-sky-500" />
          <div className="mt-4 flex w-full flex-col space-y-2">
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-bold text-white">Shipping fee</p>
              <p className="text-[12px] text-white">calculated on next step</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-bold text-white">Subtotal</p>
              <p className="text-sm font-bold text-white">
                R{subTotal?.toFixed(2)}
              </p>
            </div>
            <Separator className="my-2" />

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-[1px]">
                <p className="text-sm font-bold text-white">Total Price</p>
                <p className="text-[10px] text-slate-400">
                  {`incl. R${0} in taxes`}
                </p>
              </div>
              <p className="text-sm font-bold text-white">
                R{subTotal?.toFixed(2)}
              </p>
            </div>
            <Link
              href="/checkout"
              className="bg-primaryGreen hover:bg-primaryGreen/80 mt-4 w-full rounded-md py-4 text-center text-white"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default UserCart;
