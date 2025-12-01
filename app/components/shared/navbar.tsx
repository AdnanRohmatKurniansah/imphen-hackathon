'use client'

import { Menu, Heart } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/app/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"
import { Button } from "@/app/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

interface NavbarProps {
  menu?: MenuItem[]
  option?: {
    sign: {
      title: string
      url: string
    },
    try: {
      title: string
      url: string
    }
  }
}

const Navbar = ({
  menu = [
    { title: "Beranda", url: "/" },
    { title: "Fitur", url: "/fitur" },
    { title: "Tentang", url: "/tentang" },
    { title: "Cara Kerja", url: "/cara-kerja" },
  ],
  option = {
    sign: { 
        title: "Masuk", url: "/sign-in" 
    },
    try: { title: "Coba Gratis", url: "/sign-in" },
  },
}: NavbarProps) => {
  return (
    <section className="sticky top-0 z-50 bg-white py-3 px-5 md:px-16 border-b shadow-sm">
      <div className="container">
        <nav className="hidden lg:flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/app-logo.png"
              width={0}
              height={0}
              sizes="100vw"
              className="h-12 w-auto"
              alt="App Logo"
            />
          </Link>

          <div className="flex-1 flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4 justify-end">
            <Button className="rounded-full px-7 py-3 shadow-sm" variant={'outline'} asChild>
              <Link href={option.sign.url}>
                {option.sign.title}
              </Link>
            </Button>
            <Button className="rounded-full px-7 py-3 shadow-sm" asChild>
              <Link href={option.try.url}>
                {option.try.title}
              </Link>
            </Button>
          </div>
        </nav>

        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/app-logo.png"
                width={0}
                height={0}
                sizes="100vw"
                className="max-h-12 w-auto"
                alt="App Logo"
              />
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <Image
                        src="/images/app-logo.png"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="max-h-12 w-auto"
                        alt="App Logo"
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <Button asChild className="mt-4">
                    <Link href={option.sign.url}>{option.sign.title}</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  )
}


const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem key={item.title}>
      <Link
        href={item.url}
        className="group inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  )
}

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title}>
        <AccordionTrigger className="text-md font-semibold">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    )
  }

  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  )
}

const SubMenuLink = ({ item }: { item: MenuItem }) => (
  <a
    className="flex flex-row gap-4 rounded-md p-3 transition-colors hover:bg-muted"
    href={item.url}
  >
    <div className="text-foreground">{item.icon}</div>
    <div>
      <div className="text-sm font-semibold">{item.title}</div>
      {item.description && (
        <p className="text-sm text-muted-foreground">{item.description}</p>
      )}
    </div>
  </a>
)

export default Navbar
