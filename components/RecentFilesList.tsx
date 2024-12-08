import ActionDropdown from '@/components/ActionDropdown';
import FormatedDateTime from '@/components/FormatedDateTime';
import Thumbnail from '@/components/Thumbnail';
import Link from 'next/link';
import { Models } from 'node-appwrite';

const RecentFilesList = ({ files }: { files: Models.Document[] }) => (
  <section className="dashboard-recent-files">
    <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
    {files.length > 0 ? (
      <ul className="mt-5 flex flex-col gap-5">
        {files.map((file: Models.Document) => (
          <Link
            href={file.url}
            target="_blank"
            className="flex items-center gap-3"
            key={file.$id}
          >
            <Thumbnail
              type={file.type}
              extension={file.extension}
              url={file.url}
            />

            <div className="recent-file-details">
              <div className="flex flex-col gap-1">
                <p className="recent-file-name">{file.name}</p>
                <FormatedDateTime date={file.$createdAt} className="caption" />
              </div>
              <ActionDropdown file={file} />
            </div>
          </Link>
        ))}
      </ul>
    ) : (
      <p className="empty-list">No files uploaded</p>
    )}
  </section>
);

export default RecentFilesList;
