"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SignInFormData, signInSchema } from "@/schemas/auth";
import { useAuth } from "@/hooks/api/use-auth";

export default function SignInPage() {
  const { login, isLoginLoading, loginError } = useAuth();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignInFormData) {
    console.log(values);
  }

  // const getErrorMessage = (error: unknown) => {
  //   if (error instanceof AxiosError) {
  //     return error.response?.data?.message || "An error occurred during login";
  //   }
  //   return "An unexpected error occurred";
  // };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      type="email"
                      {...field}
                    />
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
                  <FormLabel>Passowrd</FormLabel>
                  <FormControl>
                    <Input placeholder="*********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoginLoading}>
              {isLoginLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>

        <Separator className="my-3" />

        <Link
          href="/auth/sign-up"
          className={cn("w-full", buttonVariants({ variant: "outline" }))}
        >
          Sign Up
        </Link>
      </CardContent>
    </Card>
  );
}
