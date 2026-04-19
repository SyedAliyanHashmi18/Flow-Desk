'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";
import { CreateAITasks } from "../projects/CreateAITasks";

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  href?: string;
  onClick?: ()=> void;
};

export default function EmptyState({
  icon,
  title,
  description,
  buttonLabel,
  href,
  onClick,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 space-y-4 ">
      
      {/* Icon */}
      <div className=" text-5xl  text-[#050a10]">
        {icon}
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-[#050a10]" >{title}</h2>

      {/* Description */}
      <p className="text-sm  max-w-md  text-[#050a10]">
        {description}
      </p>

      {/* Button */}
      {href ? (
        <Link href={href}>
          <Button className="mt-4">
            {buttonLabel}
          </Button>
        </Link>
      ) : (
        <Button className="mt-4 text-[#4fffb0] bg-[#050a10]" onClick={onClick}>
          {buttonLabel}
        </Button>
      )}
      <div>
      </div>
      
          </div>
  );
}