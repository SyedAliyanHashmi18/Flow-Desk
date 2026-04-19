

'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import Sidebar from "./Sidebar"
import { useEffect, useState } from "react";



export default function Topbar() {
    const { data: session } = useSession();
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

if (!mounted) return null;
  
  return (
      <header className="flex items-center justify-between w-full h-16 px-4 bg-[rgba(8,11,20,0.85)] ">
      
        <div className="lg:hidden ">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              ☰
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0 w-64 ">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
      {/* Left side - optional, could be title/logo */}
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-bold">{session?.user?.name.toUpperCase()}</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        
        {/* Plan Badge */}
        <Badge variant="secondary">Free</Badge>

        {/* Theme toggle button (optional) */}
        {/* <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={16}/> : <Moon size={16}/>}
        </Button> */}
        {/* Avatar + Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
            /> 
             <AvatarFallback>{session?.user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{session?.user?.name}</DropdownMenuItem>
            <DropdownMenuItem disabled>Free</DropdownMenuItem>
            <DropdownMenuItem disabled>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  )
}