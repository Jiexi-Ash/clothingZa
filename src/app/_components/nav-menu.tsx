"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/app/_components/ui/navigation-menu";

import { navData } from "@/lib/config";
import Link from "next/link";

function NavMenu() {
  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        {navData.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuTrigger className="bg-transparent text-white/80 hover:bg-transparent hover:text-[#72FFFF]/80">
              {item.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="border">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-green-500"></div>
              <ul className="relative grid gap-3 bg-black p-7  md:w-[400px] md:grid-cols-2 lg:w-[600px]">
                {item.items?.map((subitem) => (
                  <li
                    key={subitem.title}
                    className="group cursor-pointer p-4 text-white hover:bg-none"
                  >
                    <NavigationMenuLink
                      className="transiton relative border-none bg-transparent duration-200 group-hover:border"
                      asChild
                    >
                      <div className="relative">
                        <div className="transiton  absolute -inset-[1px] blur duration-200 group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-green-500"></div>
                        <div className="relative flex flex-col space-y-2 rounded-lg bg-black p-2">
                          <Link href={subitem.href}>{subitem.title}</Link>
                          <p className="line-clamp-2 text-xs text-gray-400">
                            {subitem.description}
                          </p>
                        </div>
                      </div>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavMenu;
