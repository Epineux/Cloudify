import Header from '@/components/Header';
import MobileNavigation from '@/components/MobileNavigation';
import Sidebar from '@/components/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { UserProvider } from '@/context/UserContext';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import React from 'react';


export const dynamic = 'force-dynamic';
const Layout = async ({ children }: { children: React.ReactNode }) => {
  // As it's the parent components of the other components, we fetch the user here
  const currentUser = await getCurrentUser();
  if (!currentUser) return redirect('/sign-in');

  return (
    <UserProvider
      user={{
        userId: currentUser.$id,
        userEmail: currentUser.email,
      }}
    >
      <main className="flex h-screen">
        <Sidebar {...currentUser} />
        <section className="flex h-full flex-1 flex-col">
          <MobileNavigation {...currentUser} />{' '}
          <Header userId={currentUser.$id} accountId={currentUser.accountId} />
          <div className="main-content">{children}</div>
        </section>
        <Toaster />
      </main>
    </UserProvider>
  );
};

export default Layout;
