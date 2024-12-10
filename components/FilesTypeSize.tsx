import { convertFileSize } from '@/lib/utils';
interface Props {
  type: string;
  totalSpaceUsed: {
    image: { size: number; latestDate: string };
    document: { size: number; latestDate: string };
    video: { size: number; latestDate: string };
    audio: { size: number; latestDate: string };
    other: { size: number; latestDate: string };
    used: number;
    all: number;
  };
}

export const FilesTypeSize = ({ type, totalSpaceUsed }: Props) => {
  let typeSpaceUsed: string;
  switch (type) {
    case 'documents':
      typeSpaceUsed = convertFileSize(totalSpaceUsed.document.size);
      break;
    case 'images':
      typeSpaceUsed = convertFileSize(totalSpaceUsed.image.size);
      break;
    case 'media':
      typeSpaceUsed = convertFileSize(
        totalSpaceUsed.video.size + totalSpaceUsed.audio.size
      );
      break;
    default:
      typeSpaceUsed = convertFileSize(totalSpaceUsed.other.size);
  }
  return <span className="h5">{typeSpaceUsed}</span>;
};
