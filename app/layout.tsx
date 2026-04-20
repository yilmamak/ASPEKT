import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LangProvider } from '@/lib/LangContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Your processes. Running. Without you. — ASPEKT',
  description: 'Turn emails, invoices, and manual requests into automated workflows. Built for businesses that are done managing what should manage itself.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
