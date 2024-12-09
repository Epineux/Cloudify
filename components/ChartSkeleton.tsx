import Image from 'next/image';
import { Skeleton } from './ui/skeleton';

const icons = [
  '/assets/icons/file-document-light.svg',
  '/assets/icons/file-image-light.svg',
  '/assets/icons/file-video-light.svg',
  '/assets/icons/file-other-light.svg',
];

export const ChartSkeleton = () => (
  <section>
    <Skeleton className="h-[222px] w-full rounded-[20px] md:h-[282px] lg:h-[306px] xl:h-[292px]" />
    <ul className="dashboard-summary-list">
      {Array.from({ length: 4 }).map((_, index) => (
        <li
          className="relative mt-6 h-[157px] animate-pulse rounded-[20px] bg-white p-5"
          key={index}
        >
          <div className="space-y-4">
            <div className="flex justify-between gap-3">
              <Image
                src={icons[index]}
                width={100}
                height={100}
                alt="uploaded image"
                className="summary-type-icon"
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  </section>
);
