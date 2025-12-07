"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/app/components/ui/select";
import Image from "next/image";
import { UmkmProduct, UmkmProfile } from "@/app/types";
import { getUmkmProfile } from "@/app/service/umkmProfileService";
import { getProductById, getProducts } from "@/app/service/productService";
import { toast } from "sonner";
import { addPosterGeneration } from "@/app/service/posterService";

const themes = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Gradient", value: "gradient" },
  { label: "Vibrant", value: "vibrant" },
];

const GeneratePoster = ({ userId }: { userId: string }) => {
  const { register, handleSubmit, watch, control, setValue } = useForm({
    defaultValues: {
      headline: "",
      subHeadline: "",
      cta: "",
      theme: "light",
      language: "id",
      product_id: "",
    },
  });

  const theme = watch("theme");
  const headline = watch("headline");
  const cta = watch("cta");

  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const [profile, setProfile] = useState<UmkmProfile>();
  const [products, setProducts] = useState<UmkmProduct[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await getUmkmProfile(userId);
      if (data) setProfile(data);
    };
    load();
  }, [userId]);

  useEffect(() => {
    const load = async () => {
      const { data } = await getProducts(userId, 1, 50);
      setProducts(data || []);
    };
    load();
  }, [userId]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (body: any) => {
    try {
      if (!profile) {
        alert("Profil UMKM tidak ditemukan");
        return;
      }

      const dataProduct = await getProductById(body.product_id);

      setLoading(true);

      const url = process.env.NEXT_PUBLIC_POSTER_N8N_URL;
      if (!url) {
        console.error("NEXT_PUBLIC_POSTER_N8N_URL is missing!");
        alert("URL server untuk generate poster belum diset.");
        setLoading(false);
        return;
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          ...dataProduct,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Gagal memproses data.");
        return;
      }

      const imageBase64 = result.data;
      setGeneratedImage(imageBase64);

      await addPosterGeneration({
        profile_id: profile.id,
        product_id: body.product_id,
        headline: body.headline,
        subheadline: body.subHeadline,
        cta: body.cta,
        theme: body.theme,
        image_url: imageBase64,
      });

      toast.success("Berhasil menghasilkan konten!");
    } catch (error) {
      console.error("Error saat generate poster:", error);
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Poster UMKM</CardTitle>
          <CardDescription>Masukkan detail konten poster</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Controller
            name="product_id"
            control={control}
            render={({ field }) => (
              <div>
                <Label>Pilih Produk</Label>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full h-10 mt-2">
                    <SelectValue placeholder="Pilih produk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {products.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.product_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          />

          <div>
            <Label className="mb-2">Headline</Label>
            <Input {...register("headline")} placeholder="Tuliskan Headline" />
          </div>

          <div>
            <Label className="mb-2">Sub Headline</Label>
            <Input
              {...register("subHeadline")}
              placeholder="Tuliskan Sub Headline"
            />
          </div>

          <div>
            <Label className="mb-2">CTA Button</Label>
            <Input {...register("cta")} placeholder="Contoh: Beli Sekarang" />
          </div>

          <Controller
            name="theme"
            control={control}
            render={({ field }) => (
              <div>
                <Label>Pilih Tema</Label>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full h-10 mt-2">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {themes.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          />

          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            className="w-full py-5"
          >
            {loading ? "Memproses..." : "✨ Generate Poster"}
          </Button>
        </CardContent>
      </Card>
      <Card className="flex items-center justify-center min-h-[300px] md:min-h-[500px]">
        <CardContent>
          {!generatedImage && (
            <p className="text-gray-500">
              Poster akan muncul di sini setelah digenerate.
            </p>
          )}
          {generatedImage && (
            <div className="space-y-4 text-center">
              <Image
                src={`data:image/png;base64,${generatedImage}`}
                alt="Poster"
                width={600}
                height={600}
                className="rounded shadow mx-auto"
              />
              <a
                href={`data:image/png;base64,${generatedImage}`}
                download={`poster-${new Date().getTime()}.png`}
              >
                <Button className="mt-2">Download Poster</Button>
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneratePoster;
