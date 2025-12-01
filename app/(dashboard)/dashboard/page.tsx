import { Metadata } from 'next';
import React from 'react'
import Stats from './_components/stats';
import { Button } from '@/app/components/ui/button';
import { ChartArea } from 'lucide-react';

export const metadata: Metadata = {
  title: "Dashboard Page | AmbaApp"
};  

const DashboardPage = () => {
  return (
    <div className='main-content'>
      <div className="flex items-center">
        <div className="flex items-center gap-2 mt-4">
          <Button size="sm" className="gap-1 mb-3">
            <ChartArea className="h-3.5 w-3.5" />
            <span className="sm:whitespace-nowrap">
              Dashboard Statistics
            </span>
          </Button>
        </div>
      </div>
      <Stats />
    </div>
  )
}

export default DashboardPage