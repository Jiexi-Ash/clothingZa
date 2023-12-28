import React from "react";
import Navbar from "../_components/navbar";
import AddAddressForm from "../_components/forms/add-address";
import { api } from "@/trpc/server";
import { Button } from "../_components/ui/button";
import { Separator } from "../_components/ui/separator";
import Footer from "../_components/footer";

export const metadata = {
  title: "Checkout",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

async function CheckOutPage() {
  const shipping = await api.cart.getUserShippingDetails.query();
  console.log(shipping);
  const products = await api.cart.getUserCart.query();
  console.log(products);

  const SubTotal = products?.items.reduce((acc, item) => {
    return acc + item.priceAndsize.price * item.quantity;
  }, 0);

  const vat = SubTotal ? (SubTotal * 0.15) | 0 : 0;

  const total = SubTotal && SubTotal + vat;

  const delivery = 100;

  return (
    <div className="flex max-h-screen w-full flex-col">
      <Navbar />
      <div className="mt-10 flex max-h-full w-full overflow-auto px-20">
        <div className="h-full w-full  overflow-auto">
          <h1 className="mb-10 text-2xl font-medium text-white">Delivery</h1>
          <AddAddressForm />
        </div>
        <div className="h-full w-full px-6">
          <h2 className="mb-10 text-2xl font-medium text-white">Your Order</h2>
          <div className="flex flex-col space-y-4 border p-6">
            <div className="flex w-full justify-between text-white">
              <span>Items</span>
              <span>{products?.items.length}</span>
            </div>
            <div className="flex w-full justify-between text-white">
              <span>Delivery</span>
              <span>R100.00</span>
            </div>
            <div className="flex w-full justify-between text-white">
              <span>SubTotal</span>
              <span>R{SubTotal?.toFixed(2)}</span>
            </div>
            <div className="flex w-full justify-between text-white">
              <p>
                TotalPrice{" "}
                <span className="text-xs font-light">
                  {`incl R${vat.toFixed(2)} vat`}
                </span>
              </p>
              <span>R{total?.toFixed(2)}</span>
            </div>
            <Separator className="h-[2px] w-full bg-gradient-to-r from-green-500 to-sky-500" />
            {shipping && (
              <Button className="w-full bg-white py-8 font-bold tracking-wide text-black hover:bg-white/60">
                PROCEED TO PAYMENT
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutPage;
