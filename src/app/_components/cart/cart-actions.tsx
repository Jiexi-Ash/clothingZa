"use client";
import React from "react";
import { Button } from "../ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Input } from "../ui/input";

function CartActions() {
  return (
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
      <button className="h-w-full text-left text-[10px] text-white hover:underline">
        remove from cart
      </button>
    </div>
  );
}

export default CartActions;
