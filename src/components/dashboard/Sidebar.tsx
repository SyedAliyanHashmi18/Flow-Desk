

'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";

export default function Sidebar() {
  const { data: session } = useSession();
  

  return (
    <aside className="w-64 lg:w-55 flex-col h-screen  border-r p-4  md:flex justify-between ">
      
      {/* Top Items */}
      <div className="flex flex-col space-y-2">
        
        <Link href="/" className="font-bold text-[1.4rem] text-white tracking-tight font-syne"  >
            Flow<span className="text-[#4fffb0]">Desk.</span>
          </Link>
        <Link href="/">
          <Button variant="ghost" className="w-full text-[#4fffb0] justify-start"  >Home</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full text-white justify-start">Dashboard</Button>
        </Link>
        <Link href="/projects">
          <Button variant="ghost" className="w-full text-white justify-start">Projects</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full text-white justify-start" >Analytics</Button>
        </Link>
      </div>

      {/* Bottom Logout */}
      <DropdownMenu>
        <DropdownMenuTrigger >
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
            />
            <AvatarFallback>
            {session?.user?.name.toUpperCase()}
              
              </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => signOut()}> Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </aside>
  )
}