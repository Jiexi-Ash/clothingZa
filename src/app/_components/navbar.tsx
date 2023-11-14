import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import React from "react";
import { supabase as SupabaseServer } from "@/lib/supabaseServer";
import NavMenu from "./nav-menu";
import Link from "next/link";
import { Input } from "./ui/input";
import Account from "./account";
import UserCart from "./cart";

async function Navbar() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );

  const { data } = await supabase.auth.getUser();
  console.log(data);
  return (
    <header className="container relative z-30 mx-auto flex h-[80px] w-full items-center justify-between bg-transparent py-4">
      <NavMenu />
      {/* <MobileNav /> */}

      <Link href="/" className="hidden lg:block">
        {/* <Image
          src="/images/logo-white.png"
          width={200}
          height={200}
          alt="logo"
        /> */}
        Desogned by
      </Link>
      <div className="flex items-center justify-center space-x-3">
        <div className="relative">
          <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-sky-500 to-green-500 opacity-75 blur"></div>
          <Input
            className="relative hidden w-[300px] border-none bg-black lg:block"
            placeholder="Search for products/brands"
          />
        </div>
        <Account />
        <UserCart />
        {/* <Cart /> */}
      </div>
    </header>
  );
}

export default Navbar;
