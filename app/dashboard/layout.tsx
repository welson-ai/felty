import { AppNav } from '@/components/app-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AppNav />
      <main className="flex-1 md:ml-0">{children}</main>
    </div>
  );
}
