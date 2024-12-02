/* eslint-disable tailwindcss/no-custom-classname */
'use client';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { actionsDropdownItems } from '@/constants';
import {
  deleteFile,
  renameFile,
  updateFileUsers,
} from '@/lib/actions/file.actions';
import { Info } from 'lucide-react';

import { useUser } from '@/context/UserContext';
import { constructDownloadUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Models } from 'node-appwrite';
import { useState } from 'react';
import { FileDetails, ShareInput } from './ActionsModalContent';
import { Button } from './ui/button';
import { Input } from './ui/input';

const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState<string>(file.name);
  const [emails, setEmails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const path = usePathname();
  const { userId, userEmail } = useUser();

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(file.name);
    // setEmails([]);
  };

  const handleAction = async () => {
    if (!action) return;

    setIsLoading(true);
    let success = false;
    const actions = {
      rename: () =>
        renameFile({
          fileId: file.$id,
          name,
          extension: file.extension,
          path,
        }),
      share: () => updateFileUsers({ fileId: file.$id, emails, path }),
      delete: () =>
        deleteFile({
          file,
          bucketFileId: file.bucketFileId,
          userId,
          userEmail,
          path,
        }),
    };

    success = await actions[action.value as keyof typeof actions]();

    if (success) closeAllModals();
  };

  const renderDialogContent = () => {
    if (!action) return null;
    const { value, label } = action;
    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-light-100 text-center">
            {label}
          </DialogTitle>
          {value === 'rename' && (
            <Input
              type="text"
              value={name.substring(0, name.lastIndexOf('.')) || name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {value === 'details' && <FileDetails file={file} />}
          {value === 'share' && (
            <ShareInput
              file={file}
              userId={userId}
              onInputChange={setEmails}
              onRemove={handleRemoveUser}
            />
          )}
          {value === 'delete' && (
            <p className="delete-confirmation">
              Are you sure you want to delete{' '}
              <span className="delete-file-name">{file.name}</span>?
            </p>
          )}
        </DialogHeader>
        {['rename', 'share', 'delete'].includes(value) && (
          <DialogFooter className="block">
            <div className="flex w-full flex-col gap-4 md:flex-row">
              <Button
                onClick={handleAction}
                className="modal-submit-button py-3"
                disabled={
                  (label === 'Share' || label === 'Rename') &&
                  userId !== file.owner.$id
                }
              >
                <p className="capitalize">{label}</p>
                {isLoading && (
                  <Image
                    src="/assets/icons/loader.svg"
                    width={24}
                    height={24}
                    alt="loader"
                  />
                )}
              </Button>
              <Button
                onClick={closeAllModals}
                className="modal-cancel-button py-3"
              >
                Cancel
              </Button>
            </div>
            {(label === 'Share' || label === 'Rename') &&
              userId !== file.owner.$id && (
                <p className=" caption text-light-200 mt-2 flex items-center gap-2 break-words">
                  <Info size={16} />
                  As you&apos;re not the owner of this file, you cant{' '}
                  {label.toLowerCase()} it
                </p>
              )}
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);

    const success = await updateFileUsers({
      fileId: file.$id,
      emails: updatedEmails,
      path,
    });

    if (success) setEmails(updatedEmails);
    closeAllModals();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="shad-no-focus">
          <Image
            src="/assets/icons/dots.svg"
            width={23}
            height={34}
            alt="dots"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="shad-dropdown-item"
              onClick={() => {
                setAction(actionItem);

                if (
                  ['rename', 'share', 'delete', 'details'].includes(
                    actionItem.value
                  )
                ) {
                  setIsModalOpen(true);
                }
              }}
            >
              {actionItem.value === 'download' ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropdown;
