// app/[type]/loading.tsx
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="file-list">
      <div className="flex h-[216px] w-full animate-pulse flex-col gap-6 rounded-[18px] bg-neutral-500/10 p-5 ">
        <div className="flex justify-between">
          <Skeleton className="size-20 rounded-full" />
          <div className="flex flex-col items-end justify-between">
            <Skeleton className="mr-3 h-6 w-2" />
            <Skeleton className="mb-1 h-4 w-16" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-2 w-32" />
        </div>
      </div>
    </div>
  );
}
