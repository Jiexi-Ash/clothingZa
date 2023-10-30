"use client";
import React from "react";
import { supabase } from "@/lib/supabaseClient";
import SignUp from "../_components/sign-up";

function SignUpPage() {
  return (
    <div className="flex h-screen w-full  bg-white">
      <div className="h-full flex-1 border-r"></div>
      <div className="flex h-full w-[500px] items-center justify-center">
        <SignUp />
      </div>
    </div>
  );
}

export default SignUpPage;
