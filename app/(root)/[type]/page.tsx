/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */

import FilesList from '@/components/FilesList';
import Sort from '@/components/Sort';
import { getFileTypesParams } from '@/lib/utils';
import { Suspense } from 'react';
import Loading from './loading';

const page = async ({ searchParams, params }: SearchParamProps) => {
  const searchText = ((await searchParams)?.query as string) || '';
  const sort = ((await searchParams)?.sort as string) || '';
  const type = ((await params)?.type as string) || '';
  const types = getFileTypesParams(type) as FileType[];

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Total : <span className="h5">0 MB</span>
          </p>
          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>
      {/* Render the files */}
      <Suspense fallback={<Loading />}>
        <FilesList types={types} searchText={searchText} sort={sort} />
      </Suspense>
    </div>
  );
};

export default page;
