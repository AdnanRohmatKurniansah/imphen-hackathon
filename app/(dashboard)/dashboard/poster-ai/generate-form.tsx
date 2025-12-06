"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/app/components/ui/card";
import Image from "next/image";
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
import { Switch } from "@/app/components/ui/switch";
import { Controller, useForm } from "react-hook-form";
import { UmkmProduct, UmkmProfile } from "@/app/types";
import { getProductById, getProducts } from "@/app/service/productService";
import { toast } from "sonner";
import { getUmkmProfile } from "@/app/service/umkmProfileService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";

function GenerateForm({ userId }: { userId: string }) {
  const { register, handleSubmit, control } = useForm();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UmkmProfile>();
  const [products, setProducts] = useState<UmkmProduct[]>([]);
  const [result, setResult] = useState("");

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

      const res = await fetch(
        "https://n8n.fadlandev.my.id/webhook-test/0e8c0220-535b-48c7-a49e-9514043e067e?mode=image",
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

      setResult(json.data);
      toast.success("Berhasil menghasilkan konten!");
    } catch (err) {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <div className="p-4">
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
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
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
        </div>
      </Card>
      <Card className="p-0 overflow-hidden h-full">
        <div className="p-4 flex justify-end">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" aria-label="Open menu" size="icon-sm">
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuLabel>File Actions</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>New File...</DropdownMenuItem>
                <DropdownMenuItem>Share...</DropdownMenuItem>
                <DropdownMenuItem disabled>Download</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Image
          src={`data:image/png;base64,${result}`}
          alt="Generated Poster"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </Card>
    </div>
  );
}

export default GenerateForm;
