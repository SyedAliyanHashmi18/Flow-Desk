'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signInSchema } from '@/schemas/signInSchema';

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
  const result = await signIn("credentials", {
    redirect: false,
    identifier: data.identifier,
    password: data.password,
  });

  if (result?.error) {
    if (result.error === "CredentialsSignin") {
      toast.error("Incorrect username or password");
    } else {
      toast.error(result.error);
    }
    return;
  }

  if (result?.ok) {
    toast.success("Login successful");

    // small delay ensures session is set
    setTimeout(() => {
      router.push("/dashboard");
    }, 300);
  }
};  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8  rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            <Link href="/" className="font-bold text-[4rem] tracking-tight font-syne">
            Welcome Back to Flow<span className="text-[#4fffb0]">Desk.</span>
          </Link>
          </h1>
          <span className="block text-[#4fffb0] font-bold">Sign-in to continue...</span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
                className="hidden md:inline-block bg-[#4fffb0] text-[#050a10] px-[1.4rem] py-[0.55rem] rounded-xl font-bold text-[0.9rem] hover:opacity-90 transition-all hover:-translate-y-px"
             type="submit">Sign In</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/register" className="text-[#4fffb0] hover:text-[#08b065]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
