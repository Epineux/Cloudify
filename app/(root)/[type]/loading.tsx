'use client';

import Sort from '@/components/Sort';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'next/navigation';

const Loading = () => {
  const type = useParams()?.type as string;
  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>
        <div className="total-size-section">
          <p className="body-1">
            Total : <span className="h5"> 0 MB </span>
          </p>
          <div className="sort-container">
            <p className="body-1 text-light-200 hidden sm:block">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default Loading;
