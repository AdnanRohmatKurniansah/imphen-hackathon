import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

const navigationLinks = [
  { text: "Beranda", url: "/" },
  { text: "Fitur", url: "/fitur" },
  { text: "Tentang", url: "/tentang" },
  { text: "Cara Kerja", url: "/cara-kerja" },
];

const contactInfo = [
  {
    label: "Email",
    value: "support@ambaapp.com",
    href: "mailto:support@ambaapp.com",
    icon: Mail,
  },
  {
    label: "Telepon",
    value: "+62 812-3456-7890",
    href: "tel:+6281234567890",
    icon: Phone,
  },
  {
    label: "Alamat",
    value: "Yogyakarta, Indonesia",
    href: "#",
    icon: MapPin,
  },
];

export function Footer() {
  return (
    <section className="overflow-hidden relative pt-20 pb-3 px-5 md:px-14 bg-[#ecf2f8]">
      <div className="absolute -top-10 -left-15 w-60 h-60 bg-[#4741F5]/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -right-10 z-10 w-50 h-50 bg-purple-300/50 rounded-full blur-3xl"></div>
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-7">
            <div className="col-span-2 mb-8 lg:mb-0">
              <Link href="/" className="shrink-0 flex items-center gap-2">
                <Image
                  src="/images/nexa-ai.png"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-14 w-auto"
                  alt="logo app"
                />
              </Link>

              <p className="mt-4 text-gray-700 mb-5">Bantu UMKM membuat konten promosi seperti caption, poster, dan copywriting dengan cepat dan otomatis.</p>

              <ul className="flex gap-2">
                {[Facebook, Instagram, Youtube].map((Icon, i) => (
                  <li
                    key={i}
                    className="w-9 h-9 flex items-center justify-center bg-white hover:bg-[#4741F5] rounded-md shadow-md text-[#4741F5] hover:text-white transition-all"
                  >
                    <Link href="#">
                      <Icon className="w-5 h-5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:block"></div>
            <div className="col-span-2">
              <Badge className="mb-4 px-3 py-1 bg-[#4741F5]/10 text-[#4741F5] border-[#4741F5]/30 shadow-sm text-[12px]">Navigasi</Badge>
              <ul className="space-y-4 text-gray-700">
                {navigationLinks.map((item, i) => (
                  <li key={i}>
                    <Link href={item.url} className="hover:text-[#4741F5]">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2">
               <Badge className="mb-4 px-3 py-1 bg-[#4741F5]/10 text-[#4741F5] border-[#4741F5]/30 shadow-sm text-[12px]">Kontak</Badge>
              <ul className="space-y-4 text-gray-700">
                {contactInfo.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={i}>
                      <Link href={item.href} className="flex items-center gap-2 hover:text-[#4741F5]">
                        <Icon className="w-5 h-5 text-primary" />
                        {item.value}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="mt-24 flex flex-col text-center justify-center gap-4 border-t pt-4 text-[13px] text-gray-700 md:items-center">
            <p>© {new Date().getFullYear()} Gugus Ambalan. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
