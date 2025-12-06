"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import Spinner from "@/app/components/ui/spinner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/app/components/ui/select";
<<<<<<< HEAD
import { Switch } from "@/app/components/ui/switch";
=======
>>>>>>> 11b291b (feat : genenerate text)

import { getProductById, getProducts } from "@/app/service/productService";
import { getUmkmProfile } from "@/app/service/umkmProfileService";
import { toast } from "sonner";
import { UmkmProduct, UmkmProfile } from "@/app/types";
<<<<<<< HEAD
=======
import { Switch } from "@/app/components/ui/switch";
>>>>>>> 11b291b (feat : genenerate text)

const GenerateForm = ({ userId }: { userId: string }) => {
  const { register, handleSubmit, control } = useForm();

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UmkmProfile>();
  const [products, setProducts] = useState<UmkmProduct[]>([]);
  const [result, setResult] = useState("");
  const [currentType, setCurrentType] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await getUmkmProfile(userId);
      if (data) setProfile(data);
    };
    loadProfile();
  }, [userId]);

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await getProducts(userId, 1, 50);
      setProducts(data || []);
    };
    loadProducts();
  }, [userId]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setLoading(true);
    setResult("");

    try {
      const dataProduct = await getProductById(data.product_id);

      const payload = {
        ...profile,
        ...dataProduct,
        tone: data.tone,
        language: data.language,
        description_input: data.description,
        generate_type: data.generate_type,
        use_hashtag: data.use_hashtag,
      };

      setCurrentType(data.generate_type);

      const res = await fetch(
        "https://n8n.fadlandev.my.id/webhook/0e8c0220-535b-48c7-a49e-9514043e067e",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.error || "Gagal memproses data.");
        return;
      }

      setResult(json.output);
      toast.success("Berhasil menghasilkan konten!");
    } catch (err) {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    toast.success("Berhasil disalin!");
  };

  const getBoxStyle = () => {
    switch (currentType) {
      case "caption_ig":
        return "bg-purple-50 border-purple-300";
      case "copywriting_wa":
        return "bg-green-50 border-green-300";
      case "hashtag_rekomendasi":
        return "bg-blue-50 border-blue-300";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Mulai Buat Konten</CardTitle>
        <CardDescription>
          Hasilkan konten promosi secara instan untuk usaha Anda menggunakan AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="mb-2">Nama Usaha</Label>
              <Input defaultValue={profile?.business_name} disabled />
            </div>
            <div>
              <Label className="mb-2">Pilih Produk</Label>
              <Controller
                name="product_id"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-10">
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
                )}
              />
            </div>
            <div>
              <Label className="mb-2">Tone</Label>
              <Controller
                name="tone"
                control={control}
                defaultValue="ramah"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-10">
                      <SelectValue placeholder="Pilih tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Ramah">Ramah</SelectItem>
                        <SelectItem value="Formal">Formal</SelectItem>
                        <SelectItem value="Lucu">Lucu</SelectItem>
                        <SelectItem value="Elegan">Elegan</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <Label className="mb-2">Bahasa</Label>
              <Controller
                name="language"
                control={control}
                defaultValue="indonesia"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-10">
                      <SelectValue placeholder="Pilih bahasa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Indonesia">Indonesia</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <Label className="mb-2">Jenis Konten</Label>
              <Controller
                name="generate_type"
                control={control}
                defaultValue="Instagram"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-10">
                      <SelectValue placeholder="Pilih jenis konten" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Instagram">
                          Caption Instagram
                        </SelectItem>
                        <SelectItem value="WhatsApp">
                          Copywriting WhatsApp
                        </SelectItem>
                        <SelectItem value="Hashtag">
                          Rekomendasi Hashtag
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-sm">
              <div className="space-y-0.5">
                <Label className="text-base">Gunakan Hashtag</Label>
                <div className="text-sm text-gray-500">Sertakan hashtag</div>
              </div>
              <Controller
                name="use_hashtag"
                control={control}
                defaultValue={true}
                render={({ field }) => (
<<<<<<< HEAD
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
=======
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="airplane-mode"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
>>>>>>> 11b291b (feat : genenerate text)
                )}
              />
            </div>
          </div>
          <div>
            <Label className="mb-3">Deskripsi Input</Label>
            <Textarea
              rows={6}
              placeholder="Masukkan deskripsi..."
              {...register("description")}
            />
          </div>
          <div className="pt-1">
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 py-3"
            >
              ✨ Generate Content
              {loading && <Spinner />}
            </Button>
          </div>
        </form>
        {result && (
          <div className={`mt-6 p-5 border rounded-xl ${getBoxStyle()}`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Hasil Generate</h3>
              <Button variant="outline" size="sm" onClick={copyResult}>
                Copy
              </Button>
            </div>
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">
              {result}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GenerateForm;
