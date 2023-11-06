import AdminNav from "@/app/_components/admin/admin-nav";
import React from "react";

function AdminPage() {
  return (
    <div className="flex min-h-screen w-full gap-6 bg-white">
      <div className="fixed flex h-full w-[80px] flex-col items-center border-r bg-white  shadow-2xl shadow-black lg:w-[300px] lg:items-start">
        <AdminNav />
      </div>
      <div className="ml-[80px] min-h-screen w-full bg-slate-100 px-10 py-10 lg:ml-[300px]">
        <div className="flex w-full justify-between">
          {/* <AddProduct /> */}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
