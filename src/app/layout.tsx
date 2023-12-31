import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'oktaaniGAMES',
  description: 'Best Games Ever.',
  viewport: { userScalable: false, width: 'device-width' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          'min-h-screen flex flex-col bg-gray-900'
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
