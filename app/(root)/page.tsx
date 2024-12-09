import { Chart } from '@/components/Chart';
import { ChartSkeleton } from '@/components/ChartSkeleton';
import FileSummaryList from '@/components/FileSummaryList';
import RecentFilesList from '@/components/RecentFilesList';
import { RecentFilesSkeleton } from '@/components/RecentFilesSkeleton';
import { getFiles, getTotalSpaceUsed } from '@/lib/actions/file.actions';
import { getUsageSummary } from '@/lib/utils';
import { Suspense } from 'react';

export const experimental_ppr = true;

const ChartSection = async () => {
  const totalSpace = await getTotalSpaceUsed();
  const usageSummary = getUsageSummary(totalSpace);
  return (
    <section>
      <Chart used={totalSpace.used} />
      <FileSummaryList summaries={usageSummary} />
    </section>
  );
};

const RecentFilesSection = async () => {
  const { documents: files } = await getFiles({ types: [], limit: 10 });

  return <RecentFilesList files={files} />;
};

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Suspense fallback={<ChartSkeleton />}>
        <ChartSection />
      </Suspense>

      <Suspense fallback={<RecentFilesSkeleton />}>
        <RecentFilesSection />
      </Suspense>
    </div>
  );
};
export default Dashboard;
