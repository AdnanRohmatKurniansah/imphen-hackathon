"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { createClientSupabase } from "@/app/utils/supabase/client";
import { setupProfileSchema } from "@/app/validations/setupProfile-validation";
import z from "zod";

import { Card, CardContent, CardFooter } from "@/app/components/ui/card";

import { Input } from "@/app/components/ui/input";
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

import { getCategories } from "@/app/service/categoriesService";
import { Textarea } from "@/app/components/ui/textarea";
import SetupWarningModal from "./setup-warning";
import { getUmkmProfile } from "@/app/service/umkmProfileService";
import { UmkmProfile } from "@/app/types";

type setupData = z.infer<typeof setupProfileSchema>;

interface Category {
  id: string;
  name: string;
}

const SetupForm = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const [mustSetup, setMustSetup] = useState(false);
  const [open, setModalOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [profile, setProfile] = useState<UmkmProfile | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<setupData>({
    resolver: zodResolver(setupProfileSchema),
    defaultValues: {
      business_name: "",
      category_id: "",
      description: "",
      location: "",
    },
  });

  const loadProfile = async () => {
    const { data: profileData, error } = await getUmkmProfile(userId);

    if (profileData) {
      setProfile(profileData);

      setValue("business_name", profileData.business_name || "");
      setValue("category_id", profileData.category_id?.toString() || "");
      setValue("description", profileData.description || "");
      setValue("location", profileData.location || "");

      const isEmpty =
        !profileData.business_name ||
        !profileData.category_id ||
        !profileData.description ||
        !profileData.location;
      if (isEmpty) setMustSetup(true);
    } else {
      setMustSetup(true);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [userId]);

  useEffect(() => {
    const loadCategories = async () => {
      const { data, error } = await getCategories();
      if (error) toast.error("Gagal mengambil kategori");
      else setCategories(data as Category[]);
    };

    loadCategories();
  }, []);

  const onSubmit = async (values: setupData) => {
    try {
      setIsSubmitting(true);
      let error;

      if (profile) {
        const { error: updateError } = await createClientSupabase()
          .from("umkm_profile")
          .update(values)
          .eq("id", profile?.id);

        error = updateError;
      } else {
        const { error: insertError } = await createClientSupabase()
          .from("umkm_profile")
          .insert([{ ...values, user_id: userId }]);

        error = insertError;
      }

      if (error) {
        toast.error("Gagal memperbarui profil");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      toast.success(
        `Profil UMKM berhasil ${profile ? "diperbarui" : "ditambahkan"}!`
      );
      router.push("/dashboard");
      return;
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center">
      {mustSetup && (
        <SetupWarningModal open={open} onOpenChange={setModalOpen} />
      )}

      <Card className="w-full max-w-lg">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div>
              <label className="block mb-1 font-medium text-sm">
                Nama Usaha
              </label>
              <Input {...register("business_name")} placeholder="Nama usaha" />
              {errors.business_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.business_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Kategori</label>

              <Controller
                name="category_id"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value?.toString() || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.category_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category_id.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">
                Deskripsi
              </label>
              <Textarea
                {...register("description")}
                placeholder="Deskripsi singkat usaha"
                className="w-full"
                rows={4}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Lokasi</label>
              <Input
                {...register("location")}
                placeholder="Yogyakarta, Indonesia"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            <CardFooter className="px-0">
              <Button disabled={isSubmitting} type="submit" className="w-full">
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner /> {"Mengupdate..."}
                  </span>
                ) : (
                  "Update Profil"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupForm;
