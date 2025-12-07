import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { ArrowRight, MessageCircle, Image as ImageIcon, Type } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 px-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#4741F5]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#4741F5]/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <Badge className="mb-3 px-2 py-1 bg-[#4741F5]/10 text-[#4741F5] border-[#4741F5]/30 shadow-sm">
              ⭐ Solusi Cepat untuk UMKM
            </Badge>

            <h1 className="text-[28px] md:text-[32px] font-bold mb-4 leading-tight text-gray-900">
              Bantu UMKM Bikin Konten Promosi Secara
              <span className="bg-gradient-to-r from-[#4741F5] to-indigo-500 bg-clip-text text-transparent">
                {" "}Instan
              </span>{" "}
              dengan AI
            </h1>

            <p className="text-[16px] md:text-[17px] text-gray-600 mb-6 leading-relaxed">Generate caption IG, poster promosi, copywriting WhatsApp, dan konten harian hanya dengan 1 klik.</p>

            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-10">
              <div className="text-center p-5 bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <Type className="mx-auto mb-2 text-[#4741F5]" />
                <div className="font-medium text-gray-900 text-[12px] md:text-sm">Caption Generator</div>
              </div>

              <div className="text-center p-5 bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <MessageCircle className="mx-auto mb-2 text-[#4741F5]" />
                <div className="font-medium text-gray-900 text-[12px] md:text-sm">WA Copywriting</div>
              </div>

              <div className="text-center p-5 bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <ImageIcon className="mx-auto mb-2 text-[#4741F5]" />
                <div className="font-medium text-gray-900 text-[12px] md:text-sm">Poster Generator</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={'/sign-in'}>
                <Button size={"lg"} className="rounded-full">
                  Coba Sekarang
                </Button>
              </Link>
              <Link href={'#fitur'}>
                <Button size={"lg"} variant={"outline"} className="rounded-full shadow-sm">
                  Lihat Fitur <ArrowRight />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative w-full text-center flex justify-center">
            <Image src="/images/hero-images.png" alt="Hero Image" width={0} height={0} sizes="100vw" className="w-3/4 h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
