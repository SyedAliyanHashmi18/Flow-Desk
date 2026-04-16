"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { registerSchema } from "@/schemas/register"
import { useState,useEffect } from "react"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDebounceCallback } from 'usehooks-ts'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { sendOtp } from "@/lib/sendOtp"


type RegisterResponse = {
  success?: boolean
  message?: string
  redirect?: string
}

export function page() {

    const [username, setUsername] = useState("")
    const [usernameMessage,setUsernameMessage]= useState("")
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const debounced = useDebounceCallback(setUsername ,300)
    const router = useRouter()
    useEffect(() =>{

        const checkUsername = async() =>{
            if(!username) return

            setIsCheckingUsername(true)
            setUsernameMessage("")

            try {
                const response = await axios.get<{
                    success: boolean,
                    message: string
                }>(`/api/check-username-unique?username=${username}`)

                setUsernameMessage(response.data.message)
            } catch (error) {
                console.log("username check error", error)
                
            }finally{
                setIsCheckingUsername(false)
            }
        }
        checkUsername()

    },[username])

    const form = useForm<z.infer <typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password:"",
            confirmPassword:""
        }
    })

  const onSubmit = async (data: z.infer<typeof registerSchema>)=> {

    setIsSubmitting(true)

    try {
        const response = await axios.post("/api/register", data)
        toast.success(response.data.message, {
        description: "Success",
      })
      
      const { email, otp, redirect } = response.data

      // send email from frontend
      const result = await sendOtp(email, otp)

      if (!result.success) {
        toast.error("Failed to send OTP")
        return
      }

      toast.success("OTP sent to your email")

      router.push(redirect)
    } catch (error : any) {
        const errorMessage = error?.response?.data?.message || "something went wrong"

        toast.error(errorMessage)
        
    }finally{
        setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8  rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            <Link href="/" className="font-bold text-[4rem] tracking-tight font-syne">
            Welcome to Flow<span className="text-[#4fffb0]">Desk.</span>
          </Link>
          </h1>
          <span className="block text-[#4fffb0] font-bold">Register to continue...</span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='username'  {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setUsername(e.target.value); 
                      debounced(e.target.value);   
                    }}

                  />
                  </FormControl>
                  {isCheckingUsername && <Loader2 className=' animate-spin'/>}
                  
                          <p className={`text-sm ${usernameMessage === "Username is available" ? 'text-green-500' :'text-red-500'}`}>  {usernameMessage}</p>
                  

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                  <Input  placeholder='Email' type="email" {...field}
                  
                  />
                    </FormControl>
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
                  <FormControl>
                  <Input  placeholder='Password' type="password" {...field}
                  
                  />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Confirm password" {...field}/>
                    </FormControl>
                    <FormMessage/>
                    </FormItem>
                )}
            />
            <Button type="submit" 
                className="hidden md:inline-block bg-[#4fffb0] text-[#050a10] px-[1.4rem] py-[0.55rem] rounded-xl font-bold text-[0.9rem] hover:opacity-90 transition-all hover:-translate-y-px"
            
            disabled={isSubmitting }>
              {
              isSubmitting ? (
              <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
              Creating account...</>
              ): ('Create account')
              }</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/signin" className="text-blue-600 hover:text-blue-800">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
