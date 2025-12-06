import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { createServerSupabase } from "@/app/utils/supabase/server";
import { ChartArea } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Detail Poster | NexaAI",
};

interface Params {
  params: Promise<{
    id: string
  }>
}

const HistoriPosterDetail = async ({ params }: Params) => {
  const { id } = await params
    
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("poster_generations")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return <div className="p-5">Poster tidak ditemukan.</div>;
  }

  const getImageSrc = (src: string) => {
    if (src.startsWith("data:image")) return src;
    return `data:image/png;base64,${src}`;
  };

  const imageSrc = getImageSrc(data.image_url);

  return (
    <div className="main-content">
      <div className="flex items-center">
        <div className="flex items-center gap-2 mt-4">
          <Button size="sm" className="gap-1 mb-3">
            <ChartArea className="h-3.5 w-3.5" />
            <span className="sm:whitespace-nowrap">Poster Instan, Siap Promosi</span>
          </Button>
        </div>
      </div>

      <Card className="mb-8 md:mb-0">
        <CardHeader>
            <CardTitle className="text-lg">Detail Poster UMKM Anda</CardTitle>
            <CardDescription>
            Poster ini dibuat otomatis menggunakan AI untuk membantu promosi UMKM dengan cepat dan mudah.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="left-content">
                    <div className="w-full overflow-hidden rounded-xl shadow-sm border">
                    <Image
                        src={imageSrc}
                        alt={data.headline}
                        width={600}
                        height={600}
                        className="w-full object-cover"
                    />
                    </div>
                    <div className="mt-6 flex flex-col gap-3 md:flex-row">
                        <a href={imageSrc} download={`poster-${data.id}.png`} className="w-full md:w-auto">
                            <Button className="w-full md:w-auto">
                            Download Poster
                            </Button>
                        </a>
                        <Link href="/dashboard/histori-poster" className="w-full md:w-auto">
                            <Button className="w-full bg-gray-600 md:w-auto">
                            Kembali
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="right-content gap-5 mt-10">
                    <div className="pb-4 border-b">
                        <p className="text-sm text-gray-500 font-medium">Headline</p>
                        <p className="font-semibold text-gray-800 mt-1">{data.headline}</p>
                    </div>
                    <div className="pb-4 border-b">
                        <p className="text-sm text-gray-500 font-medium">Subheadline</p>
                        <p className="font-semibold text-gray-800 mt-1">{data.subheadline}</p>
                    </div>
                    <div className="pb-4 border-b">
                        <p className="text-sm text-gray-500 font-medium">Call to Action (CTA)</p>
                        <p className="font-semibold text-gray-800 mt-1">{data.cta}</p>
                    </div>
                    <div className="pb-4 border-b">
                        <p className="text-sm text-gray-500 font-medium">Tema Poster</p>
                        <p className="font-semibold text-gray-800 mt-1 capitalize">{data.theme}</p>
                    </div>
                    <div className="pb-4">
                        <p className="text-sm text-gray-500 font-medium">Tanggal Dibuat</p>
                        <p className="font-semibold text-gray-700 mt-1">
                            {new Date(data.created_at).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
    );
};

export default HistoriPosterDetail;
