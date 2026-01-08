import { Loader } from 'lucide-react';
import { ReactNode, Suspense } from 'react';

export default function ProductExplorerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <Loader className="size-4 animate-spin" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
