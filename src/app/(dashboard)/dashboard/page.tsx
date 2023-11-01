import AdminNav from "@/app/_components/dashboard/admin-nav";
import Navbar from "@/app/_components/navbar";
import React from "react";

function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      <div className="fixed flex h-full w-[80px] flex-col items-center border-r bg-white  shadow-2xl shadow-black lg:w-[300px] lg:items-start">
        <AdminNav />
      </div>
      <div className="min-h-screen flex-1 bg-slate-100">hngjg</div>
    </div>
  );
}

export default DashboardPage;
