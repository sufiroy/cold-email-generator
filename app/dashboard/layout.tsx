import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Cold Email Generator',
  description: 'Generate and manage your cold emails',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
