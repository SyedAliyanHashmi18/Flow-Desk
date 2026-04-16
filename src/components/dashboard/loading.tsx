import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="border rounded-xl p-4 space-y-4"
        >
          {/* Title */}
          <Skeleton className="h-6 w-2/3" />

          {/* Description */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          {/* Footer Buttons */}
          <div className="flex justify-between pt-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}

    </div>
  );
}