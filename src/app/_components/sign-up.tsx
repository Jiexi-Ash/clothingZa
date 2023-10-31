"use client";

import { Button } from "./ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useState } from "react";
import { useToast } from "@/app/_components/ui/use-toast";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

function SignUp() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    const { email, password } = data;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
      return;
    }

    setLoading(false);
    toast({
      description: "Check your email for the confirmation link",
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full flex-col space-y-2">
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading ? <Loader2Icon /> : "Sign Up"}
              </Button>
              <Link className="text-xs hover:underline" href="/sign-in">
                {"Already have an account? Sign in"}
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SignUp;
