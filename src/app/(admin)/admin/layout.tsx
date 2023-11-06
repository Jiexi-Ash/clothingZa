import { db } from "@/server/db";
import { createServerClient } from "@supabase/ssr";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  if (user) {
    const getUser = await db.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        role: true,
      },
    });

    if (getUser?.role !== "ADMIN") {
      redirect("/");
    }
  }

  if (!user) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}
