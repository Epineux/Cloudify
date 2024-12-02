/* eslint-disable tailwindcss/no-custom-classname */
'use client';
import { useUser } from '@/context/UserContext';
import { ShieldCheck } from 'lucide-react';
import { Models } from 'node-appwrite';
const AdminBadge = ({ file }: { file: Models.Document }) => {
  const { userId } = useUser();
  return (
    <div>
      {userId === file.owner.$id && (
        <p className="caption text-light-200 line-clamp-1 flex gap-1">
          <ShieldCheck className="size-4" />
          Owner
        </p>
      )}
    </div>
  );
};

export default AdminBadge;
