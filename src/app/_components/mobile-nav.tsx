"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import MobileNavLinks from "./mobilenav-links";

function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="border-none focus-visible:bg-transparent focus-visible:ring-0 lg:hidden"
          variant="ghost"
        >
          <MenuIcon className="border-none text-white focus-visible:bg-transparent focus-visible:ring-0 lg:hidden" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        {/* change to logo */}
        <Link className="mt-4 text-sm" href="/">
          Home
        </Link>
        <MobileNavLinks />
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
