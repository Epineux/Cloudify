import { Chart } from '@/components/Chart';
import FileSummaryList from '@/components/FileSummaryList';
import RecentFilesList from '@/components/RecentFilesList';
import { getFiles, getTotalSpaceUsed } from '@/lib/actions/file.actions';
import { getUsageSummary } from '@/lib/utils';
import { Suspense } from 'react';

// Composant pour le contenu principal du dashboard
const DashboardContent = async () => {
  // Parallel requests
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  // Get usage summary
  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="dashboard-container">
      <section>
        <Chart used={totalSpace.used} />

        <FileSummaryList summaries={usageSummary} />
      </section>

      <section className="dashboard-recent-files">
        <RecentFilesList files={files.documents} />
      </section>
    </div>
  );
};

// Page principale avec Suspense
const Dashboard = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
};

// Skeleton à remplacer par votre implémentation
const DashboardSkeleton = () => (
  <div className="dashboard-container">
    {/* Placeholders pour le chargement */}
    <div>Chargement...</div>
  </div>
);

export default Dashboard;
