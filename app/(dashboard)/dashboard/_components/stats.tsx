import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { PencilLine, MessageCircle, Image as ImageIcon } from 'lucide-react'

const features = [
  {
    title: "Generate Caption",
    button: "Buat Caption",
    icon: <PencilLine />,
    bg: "bg-primary",
  },
  {
    title: "CopyWriting WA",
    button: "Buat Copy WA",
    icon: <MessageCircle />,
    bg: "bg-[#1FA376]",
  },
  {
    title: "Generate Poster",
    button: "Buat Poster",
    icon: <ImageIcon />,
    bg: "bg-[#E6A442]",
  },
  {
    title: "Content Calendar",
    button: "Lihat Kalendar",
    icon: <ImageIcon />,
    bg: "bg-[#4184DE]",
  },
];

const Stats = async () => {
  return (
    <Card className='mb-8 md:mb-0'>
      <CardHeader>
        <CardTitle className='text-lg'>Dashboard Management</CardTitle>
        <CardDescription>
          Easily monitor and control all essential data and activities from one place.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

          {features.map((item, index) => (
            <Card key={index} className={`@container/card ${item.bg} shadow-md`}>
              <CardHeader>
                <CardDescription className='text-xl font-semibold text-black'>{item.title}</CardDescription>
                <CardAction>
                  <div className={`p-2 text-white rounded-md ${item.bg}`}>
                    {item.icon}
                  </div>
                </CardAction>
              </CardHeader>

              <CardFooter className="flex-col pt-5 md:pt-10 items-start gap-1.5 text-sm">
                <Button variant={'outline'} className='w-full font-semibold'>
                  {item.button}
                </Button>
              </CardFooter>
            </Card>
          ))}

        </div>
      </CardContent>
    </Card>
  );
};

export default Stats
