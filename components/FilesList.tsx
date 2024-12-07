// app/[type]/FilesList.tsx
import Card from '@/components/Card';
import { getFiles } from '@/lib/actions/file.actions';
import { Models } from 'node-appwrite';

export default async function FilesList({
  types,
  searchText,
  sort,
}: {
  types: FileType[];
  searchText: string;
  sort: string;
}) {
  const files = await getFiles({
    types,
    searchText,
    sort,
  });

  return files.total > 0 ? (
    <section className="file-list">
      {files.documents.map((file: Models.Document) => (
        <Card key={file.$id} file={file} />
      ))}
    </section>
  ) : (
    <p className="empty-list">No files found</p>
  );
}
