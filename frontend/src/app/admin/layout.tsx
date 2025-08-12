import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel | Off-Grid Freedom',
  description: 'Content management for Off-Grid Freedom guides',
  robots: 'noindex, nofollow', // Don't index admin pages
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
