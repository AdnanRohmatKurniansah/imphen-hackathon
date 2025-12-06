'use client'

import Link from 'next/link'
import {
  Bell,
  Home,
  Images,
  PanelLeft,
  SaveIcon,
  ShoppingBag,
  StarsIcon,
  Ticket,
} from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/app/components/ui/breadcrumb'
import { Button } from '@/app/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet'

import TooltipProv from './dashboard/_components/tooltip-provider'
import { SearchInput } from './dashboard/_components/header-search'
import { Profile } from './dashboard/_components/profile'
import Image from 'next/image'
import { UserProvider } from '../providers/user-provider'
import { usePathname } from 'next/navigation'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const menu = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/products", label: "Produk Anda", icon: ShoppingBag },
  { href: "/dashboard/konten-ai", label: "Konten AI", icon: StarsIcon },
  { href: "/dashboard/poster", label: "Poster", icon: Images },
  { href: "/dashboard/aktivitas-tersimpan", label: "Aktivitas Tersimpan", icon: SaveIcon },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProv>
      <UserProvider>
        <main className="flex min-h-screen w-full bg-muted/40">
          <SidebarDesktop />
          <div className="flex flex-col flex-1 sm:gap-4 sm:py-4 sm:pl-0">
            <header className="sticky top-0 z-30 flex h-14 w-full items-center gap-4 bg-background px-4 sm:px-6">
              <SidebarMobile /> 
              <DashboardBreadcrumb />
              <Button variant={'outline'} className='shadow-sm relative ml-auto grow-0'>
                <Bell />
              </Button>
              <Profile />
            </header>
            <main className="grid flex-1 items-start gap-2 border-t bg-muted/40 p-4 sm:px-6 sm:py-0 md:gap-4">
              {children}
            </main>
          </div>
        </main>
      </UserProvider>
    </TooltipProv>
  )
}

function SidebarDesktop() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-56 flex-col border-r bg-white px-4 py-6">
      <div className="flex items-center gap-2 mb-8">
        <Image src="/images/app-logo.png" width={130} height={28} alt="Logo" />
      </div>

      <nav className="flex flex-col gap-1">
        {menu.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center font-semibold gap-3 px-3 py-3 rounded-lg text-sm 
                ${active ? "bg-indigo-100 text-primary" : "text-gray-600 hover:bg-gray-100"}
              `}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      
    </aside>
  )
}

function SidebarMobile() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="md:hidden">
          <PanelLeft className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-64 p-3">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>Select a page or action</SheetDescription>
          </VisuallyHidden> 
        </SheetHeader>
        <div className="flex items-center gap-2 mt-5">
          <Image src="/images/app-logo.png" width={130} height={28} alt="Logo" />
        </div>

        <nav className="flex flex-col gap-2 text-base font-medium">
          {menu.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex font-semibold items-center gap-3 px-3 py-2 rounded-lg ${active ? "bg-indigo-100 text-primary" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        
      </SheetContent>
    </Sheet>
  )
}


function DashboardBreadcrumb() {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <SearchInput />
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
