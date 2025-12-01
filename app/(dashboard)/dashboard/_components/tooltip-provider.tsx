'use client';

import { TooltipProvider } from '@/app/components/ui/tooltip';

export default function TooltipProv({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}