'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/app/components/ui/input';
import { Search } from 'lucide-react';

export function SearchInput() {
  return (
    <form className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
      <Input
        name="q"
        type="search"
        placeholder="Cari Konten..."
        className="w-full rounded-lg shadow-sm bg-background pl-8 md:w-[200px] lg:w-[400px]"
      />
    </form>
  );
}