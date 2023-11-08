import DashboardNav from "@/app/_components/dashboard/dashboard-nav";
import DashboardProducts from "@/app/_components/dashboard/products";
import AddProduct from "@/app/_components/forms/add-product";
import { api } from "@/trpc/server";
import React from "react";

async function DashboardProductsPage() {
  const data = await api.store.getUserStore.query();

  if (!data) return null;
  return (
    <div className="flex min-h-screen w-full gap-6 bg-white">
      <div className="fixed flex h-full w-[80px] flex-col items-center border-r bg-white  shadow-2xl shadow-black lg:w-[300px] lg:items-start">
        <DashboardNav />
      </div>
      <div className="ml-[80px] min-h-screen w-full space-y-6 bg-slate-100 px-10 py-10 lg:ml-[300px]">
        <div className="flex w-full flex-col justify-between space-y-2 md:flex-row lg:space-y-0">
          <h1 className="text-xl font-medium lg:text-2xl">My Products</h1>
          <AddProduct storeName={data.name} />
        </div>
        <DashboardProducts />
      </div>
    </div>
  );
}

export default DashboardProductsPage;
