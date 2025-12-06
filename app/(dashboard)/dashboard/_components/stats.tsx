import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { PencilLine, MessageCircle, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link';

const features = [
  {
    title: "Generate Caption",
    button: "Buat Caption",
    icon: <PencilLine />,
    bg: "bg-primary",
    link: "/dashboard/konten-ai"
  },
  {
    title: "CopyWriting WA",
    button: "Buat Copy WA",
    icon: <MessageCircle />,
    bg: "bg-[#1FA376]",
    link: "/dashboard/poster"
  },
  {
    title: "Generate Poster",
    button: "Buat Poster",
    icon: <ImageIcon />,
    bg: "bg-[#E6A442]",
    link: "/dashboard/poster"
  }
];

const Stats = async () => {
  return (
    <Card className='mb-8 md:mb-0'>
      <CardHeader>
        <CardTitle className='text-lg'>Manajemen Dashboard</CardTitle>
        <CardDescription>
          Pantau dan kendalikan semua data dan aktivitas penting dengan mudah dari satu tempat.
        </CardDescription>
      </CardHeader> 

      <CardContent>
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

          {features.map((item, index) => (
            <Card key={index} className={`@container/card ${item.bg} shadow-md`}>
              <CardHeader className='px-3 md:px-6'>
                <CardDescription className='text-[16px] md:text-xl font-semibold text-black'>{item.title}</CardDescription>
                <CardAction className='hidden md:block'>
                  <div className={`p-2 text-white rounded-md ${item.bg}`}>
                    {item.icon}
                  </div>
                </CardAction>
              </CardHeader>

              <CardFooter className="flex-col px-3 py-0 md:px-6 pt-5 md:pt-10 items-start gap-1.5 text-sm">
                <Link href={item.link}>
                  <Button variant={'outline'} className='w-full font-semibold'>
                    {item.button}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}

        </div>
      </CardContent>
    </Card>
  );
};

export default Stats
