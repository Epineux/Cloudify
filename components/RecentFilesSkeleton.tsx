import { Skeleton } from './ui/skeleton';

export const RecentFilesSkeleton = () => (
  <section className="h-full animate-pulse rounded-[20px] bg-neutral-500/10 p-5 xl:p-8">
    <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
    <ul className="mt-5 flex flex-col gap-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <li className="flex items-center gap-3" key={index}>
          <Skeleton className="size-[50px] rounded-full" />
          <div className="flex flex-col xl:flex-row xl:justify-between">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  </section>
);
