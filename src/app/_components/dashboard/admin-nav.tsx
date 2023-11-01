import { adminNavData } from "@/lib/config";
import Link from "next/link";
import React from "react";
import Icon from "../icon";

function AdminNav() {
  return (
    <div className="flex w-full flex-col space-y-8 pt-10 lg:px-16">
      <div className="">
        <h2 className="hidden text-2xl font-semibold tracking-widest text-black lg:block">
          DesignedBy
        </h2>
      </div>
      <nav className="flex flex-col items-center space-y-6 lg:items-start">
        <h3 className="hidden font-medium uppercase tracking-widest text-black lg:block">
          Quick menu
        </h3>
        <ul className="flex flex-col space-y-7">
          {adminNavData.map((item, index) => (
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
    </div>
  );
}

export default AdminNav;
