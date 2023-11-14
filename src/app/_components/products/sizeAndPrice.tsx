"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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
  const [selectedSize, setSelectedSize] = useState<string>("");
  console.log(productSizeAndPrice);

  const handleSelectSize = (size: string) => {
    setSelectedSize((prev) => (prev === size ? "" : size));
  };

  //   update the url with the selected size

  return (
    <div className="flex flex-col space-y-4">
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
        <div className="flex flex-col space-y-1">
          {selectedSize && <h2 className="text-sm text-white">Price</h2>}

          {selectedSize ? (
            <p className="text-sm font-medium text-white">
              R{getPrice(selectedSize, productSizeAndPrice)?.toFixed(2)}
            </p>
          ) : (
            <p className="text-sm text-red-500">Select size to view price</p>
          )}
        </div>
      </div>
      {selectedSize && <AddToCartBtn />}
    </div>
  );
}

export default SizeAndPrice;

const AddToCartBtn = () => {
  return (
    <div className="flex w-full space-x-3">
      <div className="flex">
        <Button
          variant="outline"
          className="border-slate-400 bg-transparent  text-white"
        >
          -
        </Button>
        <Input
          className="w-[80px] border-none bg-transparent text-center text-white"
          disabled
          value={1}
        />
        <Button
          variant="outline"
          className="border-slate-400 bg-transparent  text-white"
        >
          +
        </Button>
      </div>
      <Button className="bg-white text-black transition-all duration-100 ease-in-out hover:bg-white/70">
        Add to cart
      </Button>
    </div>
  );
};
