import { adminNavData } from "@/lib/config";
import Link from "next/link";
import React from "react";
import Icon from "../icon";

function AdminNav() {
  return (
    <div className="flex w-full flex-col space-y-8 px-16 pt-10">
      <div className="">
        <h2 className="text-2xl font-semibold tracking-widest text-black">
          DesignedBy
        </h2>
      </div>
      <nav className="flex flex-col space-y-6">
        <h3 className="font-medium uppercase tracking-widest text-black">
          Quick menu
        </h3>
        <ul className="flex flex-col space-y-7">
          {adminNavData.map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-2 text-gray-400 transition-all duration-300 ease-out hover:text-black"
            >
              <Icon name={item.icon} size={20} />
              <Link className="capitaliz" href={item.href}>
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
