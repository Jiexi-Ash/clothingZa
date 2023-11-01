import AdminNav from "@/app/_components/dashboard/admin-nav";
import Navbar from "@/app/_components/navbar";
import React from "react";

function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      <div className="fixed flex h-full w-[300px] flex-col border-r  bg-white shadow-2xl shadow-black">
        <AdminNav />
      </div>
      <div className="min-h-screen flex-1 bg-slate-100">hngjg</div>
    </div>
  );
}

export default DashboardPage;
