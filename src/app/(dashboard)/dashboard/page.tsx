import DashboardNav from "@/app/_components/dashboard/dashboard-nav";
import AddProduct from "@/app/_components/forms/add-product";
import Navbar from "@/app/_components/navbar";
import { api } from "@/trpc/server";
import React from "react";

async function DashboardPage() {
  const data = await api.store.getUserStore.query();

  if (!data) return null;
  return (
    <div className="flex min-h-screen w-full gap-6 bg-white">
      <div className="fixed flex h-full w-[80px] flex-col items-center border-r bg-white  lg:w-[300px] lg:items-start">
        <DashboardNav />
      </div>
      <div className="ml-[80px] min-h-screen w-full bg-slate-100 px-10 py-10 lg:ml-[300px]">
        <div className="flex w-full justify-between">
          <AddProduct storeName={data.name} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
