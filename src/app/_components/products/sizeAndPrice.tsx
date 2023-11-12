"use client";
import React from "react";
import { Button } from "../ui/button";
type priceAndsize = {
  id: number;
  price: number;
  size: string;
  quantity: number;
};

interface Props {
  productSizeAndPrice: priceAndsize[];
}

const getSizeInInitials = (size: string) => {
  switch (size) {
    case "small":
      return "S";
    case "medium":
      return "M";
    case "large":
      return "L";
    case "extra large":
      return "XL";
    case "extra extra large":
      return "XXL";
    default:
      return "";
  }
};

const getPrice = (size: string, priceAndsize: priceAndsize[]) => {
  const price = priceAndsize.find((item) => item.size === size)?.price;
  return price;
};
function SizeAndPrice({ productSizeAndPrice }: Props) {
  const [selectedSize, setSelectedSize] = React.useState<string>("");
  console.log(productSizeAndPrice);

  const handleSelectSize = (size: string) => {
    setSelectedSize((prev) => (prev === size ? "" : size));
  };

  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-sm text-white">Size</h2>
      <div className="grid w-[150px] grid-cols-5 gap-6">
        {productSizeAndPrice.map((item) => (
          <Button
            className={`h-[30px] w-[30px] border border-gray-400 bg-transparent p-2 text-xs text-gray-400 ${
              selectedSize === item.size
                ? "border-[#72FFFF] text-[#72FFFF]"
                : ""
            }`}
            key={item.id}
            variant="secondary"
            size="icon"
            onClick={() => handleSelectSize(item.size)}
          >
            {getSizeInInitials(item.size)}
          </Button>
        ))}
      </div>
      <div className="flex flex-col space-y-2">
        <h2 className="text-sm text-white">Price</h2>
        <p className="text-white">
          R{getPrice(selectedSize, productSizeAndPrice)?.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default SizeAndPrice;
