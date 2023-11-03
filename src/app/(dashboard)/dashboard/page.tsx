import AdminNav from "@/app/_components/dashboard/admin-nav";
import AddProduct from "@/app/_components/forms/add-product";
import Navbar from "@/app/_components/navbar";
import React from "react";

function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full gap-6 bg-white">
      <div className="fixed flex h-full w-[80px] flex-col items-center border-r bg-white  shadow-2xl shadow-black lg:w-[300px] lg:items-start">
        <AdminNav />
      </div>
      <div className="ml-[300px] min-h-screen w-full bg-slate-100 px-10 py-10">
        <div className="flex w-full justify-between">
          <AddProduct />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
