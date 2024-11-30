import Image from 'next/image';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
        <div className="flex max-w-[25rem] flex-col justify-center gap-12">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/logo-white.svg"
              alt="logo"
              width={80}
              height={80}
              className="h-auto"
            />
            <h1 className="h1 text-white">Cloudify</h1>
          </div>
          <div className="flex  flex-col gap-4 text-white">
            <h1 className="h1">Manage your files through the Cloud</h1>
            <p className="body-1">
              Store, Manage, Share, and Access your files from anywhere,
              anytime.
            </p>
          </div>
          <Image
            src="/assets/images/files.png"
            alt="open folder illustration"
            width={342}
            height={342}
            className="h-auto transition-all hover:rotate-2 hover:scale-105"
          />
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/logo.svg"
              alt="logo"
              width={80}
              height={80}
              className="h-auto"
            />
            <span className="h1 bg-gradient-to-b from-brand via-brand to-brand/60 bg-clip-text text-transparent">
              Cloudify
            </span>
          </div>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Layout;
