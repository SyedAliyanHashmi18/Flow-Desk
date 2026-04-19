'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyOtpSchema } from "@/schemas/veriftOtp";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

type VerifyOtpForm = {
  email: string;
  otp: string;
};

export default function VerifyOtpPage() {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VerifyOtpForm>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: emailFromQuery,
      otp: "",
    },
  });

  const onSubmit = async (data: VerifyOtpForm) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/verify-otp", data);
      toast.success(response.data.message);
      if (response.data.redirect) {
        router.push(response.data.redirect);
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Verify Your Email</h1>
          <p>Enter the 6-digit OTP sent to your email.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="otp"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter OTP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit"
                className=" w-full  md:inline-block bg-[#4fffb0] text-[#050a10] px-[1.4rem] py-[0.55rem] rounded-xl font-bold text-[0.9rem] hover:opacity-90 transition-all hover:-translate-y-px"
            
            disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </form>
        </Form>

        {/* <div className="text-center mt-4">
          <p>
            Didn't receive the OTP?{' '}
            <Button
              variant="link"
              onClick={async () => {
                try {
                  await axios.post("/api/send-otp", { email: emailFromQuery, otp: Math.floor(100000 + Math.random() * 900000) });
                  toast.success("OTP resent to your email");
                } catch (err) {
                  toast.error("Failed to resend OTP");
                }
              }}
            >
              Resend OTP
            </Button>
          </p>
        </div> */}
      </div>
    </div>
  );
}