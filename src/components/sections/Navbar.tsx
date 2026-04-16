"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
   const { data: session } = useSession();
    const user = session?.user;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] py-[1.1rem] bg-[rgba(8,11,20,0.85)] backdrop-blur-lg border-b border-white/[0.07]">
      <Link href="/" className="font-bold text-[1.4rem] tracking-tight font-syne">
        Flow<span className="text-[#4fffb0]">Desk</span>
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[#8892a4] text-[0.92rem] font-medium hover:text-[#f0f4ff] transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* <Link
        href="#cta"
        className="hidden md:inline-block bg-[#4fffb0] text-[#050a10] px-[1.4rem] py-[0.55rem] rounded-xl font-bold text-[0.9rem] hover:opacity-90 transition-all hover:-translate-y-px"
      >
        Start Free Trial
      </Link> */}
       {!user ? (
              <>
                <Link href="/signin"
                className="hidden md:inline-block bg-[#4fffb0] text-[#050a10] px-[1.4rem] py-[0.55rem] rounded-xl font-bold text-[0.9rem] hover:opacity-90 transition-all hover:-translate-y-px"
                >
                  Start Free Trial
                </Link>
                
              </>
            ) : (
              <Link href="/dashboard"
              className="hidden md:inline-block bg-[#4fffb0] text-[#050a10] px-[1.4rem] py-[0.55rem] rounded-xl font-bold text-[0.9rem] hover:opacity-90 transition-all hover:-translate-y-px"
              >
                Dashboard
              </Link>
            )}

      {/* Mobile menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5 text-[#f0f4ff]" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-[#0d1220] border-l border-white/[0.07] text-[#f0f4ff]"
        >
          <div className="flex flex-col gap-6 mt-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[#8892a4] text-lg hover:text-[#f0f4ff] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#cta"
              onClick={() => setOpen(false)}
              className="bg-[#4fffb0] text-[#050a10] px-6 py-3 rounded-xl font-bold text-center hover:opacity-90 transition-opacity"
            >
              Start Free Trial
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}