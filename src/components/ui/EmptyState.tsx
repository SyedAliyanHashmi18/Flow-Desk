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
  projectId: string,
};

export default function EmptyState({
  icon,
  title,
  description,
  buttonLabel,
  href,
  onClick,
  projectId
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 space-y-4">
      
      {/* Icon */}
      <div className="text-muted-foreground text-5xl">
        {icon}
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold">{title}</h2>

      {/* Description */}
      <p className="text-sm text-muted-foreground max-w-md">
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
        <Button className="mt-4" onClick={onClick}>
          {buttonLabel}
        </Button>
      )}
      <div>
        or
      </div>
                    <CreateAITasks projectId={projectId}/>
      
          </div>
  );
}