import { Loader } from 'lucide-react';
import { ReactNode, Suspense } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Loader className="size-4" />}>{children}</Suspense>
  );
}
