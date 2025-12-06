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

  const [editMode, setEditMode] = useState<
    "none" | "headline" | "cta" | "color"
  >("none");
  const [editValue, setEditValue] = useState("");

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
    if (!profile) return alert("Profil UMKM tidak ditemukan");

    const dataProduct = await getProductById(body.product_id);

    setLoading(true);

    const res = await fetch(
      "https://n8n.fadlandev.my.id/webhook/0e8c0220-535b-48c7-a49e-9514043e067e?mode=image",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          ...dataProduct,
        }),
      }
    );

    const result = await res.json();
    setGeneratedImage(result.data || null);
    setLoading(false);
  };

  // const applyEdit = async () => {
  //   if (!generatedImage) return;
  //   setLoading(true);

  //   console.log(
  //     JSON.stringify({
  //       image: generatedImage,
  //       mode: editMode,
  //       value: editValue,
  //     })
  //   );

  //   const res = await fetch(
  //     "https://n8n.fadlandev.my.id/webhook-test/0e8c0220-535b-48c7-a49e-9514043e067e?mode=edit-image",
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         image: generatedImage,
  //         mode: editMode,
  //         value: editValue,
  //       }),
  //     }
  //   );

  //   const result = await res.json();
  //   setGeneratedImage(result.data);
  //   setLoading(false);
  //   setEditMode("none");
  // };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* FORM */}
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

      {/* RESULT */}
      <Card className="flex items-center justify-center min-h-[500px]">
        <CardContent>
          {!generatedImage && (
            <p className="text-gray-500">
              Poster akan muncul di sini setelah digenerate.
            </p>
          )}

          {generatedImage && (
            <div className="space-y-4">
              <Image
                src={`data:image/png;base64,${generatedImage}`}
                alt="Poster"
                width={600}
                height={600}
                className="rounded shadow mx-auto"
              />

              {/* EDIT BUTTONS */}
              {/* <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => {
                    setEditMode("headline");
                    setEditValue(headline);
                  }}
                  variant="outline"
                >
                  Edit Headline
                </Button>
                <Button
                  onClick={() => {
                    setEditMode("cta");
                    setEditValue(cta);
                  }}
                  variant="outline"
                >
                  Edit CTA
                </Button>
                <Button
                  onClick={() => {
                    setEditMode("color");
                    setEditValue(theme);
                  }}
                  variant="outline"
                >
                  Edit Tema
                </Button>
              </div> */}

              {/* EDIT FORM */}
              {/* {editMode !== "none" && (
                <div className="border p-4 rounded space-y-3">
                  <Label>Edit {editMode}</Label>

                  {editMode === "color" ? (
                    <select
                      className="w-full border px-3 py-2 rounded"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    >
                      {themes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                  )}

                  <Button
                    onClick={applyEdit}
                    className="w-full"
                  >
                    {loading ? "Memproses..." : "Terapkan Edit"}
                  </Button>
                </div>
              )} */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneratePoster;
