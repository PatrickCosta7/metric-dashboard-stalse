import HomeClient from '@/components/HomeClient';
import { Suspense } from 'react';

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <HomeClient />
      </Suspense>
    </main>
  );
}