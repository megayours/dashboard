import { type PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import { ClientProviders } from './client-providers'
import { getWagmiConfig } from '@/config/wagmi-config';
import './globals.css';


export const metadata: Metadata = {
  title: 'Your Application Title Goes Here',
  description: 'Your application description goes here',
};


export default async function RootLayout({ children }: PropsWithChildren) {

  return (
    <html>
    <body>
        <ClientProviders>
          {children}
        </ClientProviders>
    </body>
    </html>
  );
}
