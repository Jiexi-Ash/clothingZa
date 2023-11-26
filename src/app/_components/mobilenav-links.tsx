"use client";
import React from "react";
import { Accordion } from "./ui/accordion";
import { navData } from "@/lib/config";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Link from "next/link";

function MobileNavLinks() {
  return (
    <Accordion className="mt-6" type="single" collapsible>
      {navData.map((item, index) => (
        <AccordionItem value={item.title} key={index}>
          <AccordionTrigger className="text-sm capitalize">
            {item.title}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2">
              {item.items?.map((subItem, index) => (
                <Link
                  className="text-[12px] capitalize"
                  href={subItem.href}
                  key={index}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default MobileNavLinks;
