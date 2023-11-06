import { dashboardNav } from "@/lib/config";
import Link from "next/link";
import React from "react";
import Icon from "../icon";
import { api } from "@/trpc/server";
import UpdateStore from "../forms/update-store";

async function DashboardNav() {
  const data = await api.store.getUserStore.query();

  if (!data) return null;
  console.log(data);
  return (
    <div className="l flex h-full w-full flex-col space-y-8 pt-10">
      <div className="lg:px-16">
        <h2 className="hidden text-2xl font-semibold tracking-widest text-black lg:block">
          DesignedBy
        </h2>
      </div>
      <div className="flex h-full flex-col justify-between">
        <nav className="flex flex-col items-center space-y-6 lg:items-start lg:px-16">
          <h3 className="hidden font-medium uppercase tracking-widest text-black lg:block">
            Quick menu
          </h3>
          <ul className="flex flex-col space-y-7">
            {dashboardNav.map((item, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 text-gray-400 transition-all duration-300 ease-out hover:text-black"
              >
                <Icon name={item.icon} size={24} />
                <Link className="capitaliz hidden lg:block" href={item.href}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <StoreCard name={data?.name} banner={data?.banner_key} />
      </div>
    </div>
  );
}

export default DashboardNav;

interface StoreCardProps {
  name: string;
  banner?: string | null;
}
const StoreCard = ({ name, banner }: StoreCardProps) => {
  return (
    <div className="my-10 flex flex-col space-y-4">
      <div className="hiddem px-6 lg:block">
        <h3 className="font-medium uppercase tracking-widest text-black">
          My Store
        </h3>
        <p className="text-sm text-gray-400">{name}</p>
      </div>
      <div className="my-10 h-[200px] w-full  px-6">
        <div className="relative h-full w-full rounded-lg bg-gray-200">
          <UpdateStore storeName={name} banner_key={banner} />
        </div>
      </div>
    </div>
  );
};
