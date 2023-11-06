import DashboardNav from "@/app/_components/dashboard/dashboard-nav";
import AddStore from "@/app/_components/forms/add-store";
import React from "react";

function StoresPage() {
  return (
    <div className="flex min-h-screen w-full gap-6 bg-white">
      <div className="fixed flex h-full w-[80px] flex-col items-center border-r bg-white  shadow-2xl shadow-black lg:w-[300px] lg:items-start">
        <DashboardNav />
      </div>
      <div className="ml-[80px] min-h-screen w-full bg-slate-100 px-10 py-10 lg:ml-[300px]">
        <div className="flex w-full justify-between">
          <h1 className="text-2xl font-medium">Stores</h1>
          <AddStore />
        </div>
      </div>
    </div>
  );
}

export default StoresPage;
