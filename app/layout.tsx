import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cold Email Generator - AI-Powered Email Variations',
  description: 'Generate highly converting cold email variations instantly using AI. Perfect for sales teams and entrepreneurs.',
  keywords: 'cold email, sales, AI, email generator, outreach',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
