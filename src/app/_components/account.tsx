import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import React from "react";
import { supabase as SupabaseServer } from "@/lib/supabaseServer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { User2Icon } from "lucide-react";

async function Account() {
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className={`relative flex h-8  w-8 items-center justify-center rounded-lg  border border-white/50 ${
            user ? "bg-[#72FFFF]/50" : "bg-transparent"
          }`}
        >
          <User2Icon
            className={`h-5 w-5 ${user ? "text-white" : "text-[#72FFFF]/80"}`}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user ? <DropdownMenuItem>Sign out</DropdownMenuItem> : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Account;
