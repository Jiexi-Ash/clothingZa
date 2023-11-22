"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { api } from "@/trpc/react";
import { useToast } from "../ui/use-toast";

type priceAndsize = {
  id: number;
  price: number;
  size: string;
  quantity: number;
};

interface Props {
  productSizeAndPrice: priceAndsize[];
  productId: number;
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

type Size = {
  id: number;
  size: string;
};

function SizeAndPrice({ productSizeAndPrice, productId }: Props) {
  const [selectedSize, setSelectedSize] = useState<Size>();

  const handleSelectSize = (size: string, id: number) => {
    setSelectedSize((prev) => ({ ...prev, size: size, id: id }));
  };

  const currentProductQuantity = productSizeAndPrice.find(
    (item) => item.size === selectedSize?.size,
  )?.quantity;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <h2 className="text-sm text-white">Size</h2>
        <div className="grid w-[150px] grid-cols-5 gap-6">
          {productSizeAndPrice.map((item) => (
            <Button
              className={`h-[30px] w-[30px] border border-gray-400 bg-transparent p-2 text-xs text-gray-400 ${
                selectedSize?.size === item.size
                  ? "border-[#72FFFF] text-[#72FFFF]"
                  : ""
              }`}
              key={item.id}
              variant="secondary"
              size="icon"
              onClick={() => handleSelectSize(item.size, item.id)}
            >
              {getSizeInInitials(item.size)}
            </Button>
          ))}
        </div>
        <div className="flex flex-col space-y-1">
          {selectedSize && <h2 className="text-sm text-white">Price</h2>}

          {selectedSize ? (
            <p className="text-sm font-medium text-white">
              R{getPrice(selectedSize.size, productSizeAndPrice)?.toFixed(2)}
            </p>
          ) : (
            <p className="text-sm text-red-500">Select size to view price</p>
          )}
        </div>
      </div>
      {selectedSize && (
        <AddToCartBtn
          producQuantity={currentProductQuantity}
          productId={productId}
          sizeId={selectedSize.id}
        />
      )}
    </div>
  );
}

export default SizeAndPrice;

interface AddToCartBtnProps {
  producQuantity: number | undefined;
  productId: number;
  sizeId: number;
}

const AddToCartBtn = ({
  producQuantity,
  productId,
  sizeId,
}: AddToCartBtnProps) => {
  const { toast } = useToast();
  const [maxQuantity] = useState<number>(producQuantity ?? 0);
  const [quantity, setQuantity] = useState<number>(1);
  const utils = api.useContext();
  const { mutate: addToCart } = api.cart.addToCart.useMutation({
    onSuccess: async () => {
      await utils.cart.getUserCart.invalidate();

      toast({
        title: "Item added to cart",
      });
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: err.message,
      });
    },
  });

  if (producQuantity === 0) {
    return (
      <Button
        disabled
        className="bg-white text-black transition-all duration-100 ease-in-out hover:bg-white/70"
      >
        Out of stock
      </Button>
    );
  }

  const handleAddToCart = () => {
    addToCart({ productId, size: sizeId, quantity });
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => (prev === maxQuantity ? prev : prev + 1));
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };
  return (
    <div className="flex w-full space-x-3">
      <div className="flex">
        <Button
          variant="outline"
          className="border-slate-400 bg-transparent  text-white"
          onClick={handleDecreaseQuantity}
        >
          -
        </Button>
        <Input
          className="w-[80px] border-none bg-transparent text-center text-white"
          disabled
          value={quantity}
        />
        <Button
          variant="outline"
          className="border-slate-400 bg-transparent  text-white"
          onClick={handleIncreaseQuantity}
        >
          +
        </Button>
      </div>
      <Button
        className="bg-white text-black transition-all duration-100 ease-in-out hover:bg-white/70"
        onClick={handleAddToCart}
      >
        Add to cart
      </Button>
    </div>
  );
};
