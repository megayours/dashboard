import { type PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header/page';

import { ClientProviders } from './client-providers'
import './globals.css';


export const metadata: Metadata = {
  title: 'MegaYours Dashboard',
  description: 'Explor any asset on chain and bring it to life!',
};


export default async function RootLayout({ children }: PropsWithChildren) {

  return (
    <html>
    <body className="dashboard-background">
        <ClientProviders>
          <Header />
          {children}
        </ClientProviders>
    </body>
    </html>
  );
}
