import FormatedDateTime from '@/components/FormatedDateTime';
import { Separator } from '@/components/ui/separator';
import { convertFileSize } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface FileSummarySingle {
  title: string;
  size: number;
  latestDate: string;
  icon: string;
  url: string;
}
interface FileSummaryListProps {
  summaries: FileSummarySingle[];
}

const FileSummaryList = ({ summaries }: FileSummaryListProps) => (
  <ul className="dashboard-summary-list">
    {summaries.map((summary) => (
      <Link
        href={summary.url}
        key={summary.title}
        className="dashboard-summary-card"
      >
        <div className="space-y-4">
          <div className="flex justify-between gap-3">
            <Image
              src={summary.icon}
              width={100}
              height={100}
              alt="uploaded image"
              className="summary-type-icon"
            />
            <h4 className="summary-type-size">
              {convertFileSize(summary.size) || 0}
            </h4>
          </div>

          <h5 className="summary-type-title">{summary.title}</h5>
          <Separator className="bg-light-400" />
          <FormatedDateTime date={summary.latestDate} className="text-center" />
        </div>
      </Link>
    ))}
  </ul>
);

export default FileSummaryList;
