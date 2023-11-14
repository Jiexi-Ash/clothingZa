import React from "react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { ShoppingBagIcon } from "lucide-react";
import { Badge } from "./ui/badge";

function UserCart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="relative flex h-8  w-8 items-center justify-center rounded-lg  border border-white/50"
          variant="ghost"
          size="icon"
        >
          <Badge className="bg-primaryGreen absolute -top-2 left-3 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px] text-white lg:left-4">
            0
          </Badge>
          <ShoppingBagIcon className="h-5 w-5 text-white" />
        </Button>
      </SheetTrigger>
    </Sheet>
  );
}

export default UserCart;
