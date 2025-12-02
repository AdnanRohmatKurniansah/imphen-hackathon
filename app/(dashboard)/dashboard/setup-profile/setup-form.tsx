"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { createClientSupabase } from "@/app/utils/supabase/client"
import { setupProfileSchema } from "@/app/validations/setupProfile-validation"
import { useUser } from "@/app/providers/user-provider"
import z from "zod"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/app/components/ui/card"

import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import Spinner from "@/app/components/ui/spinner"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/app/components/ui/select"

import { getCategories } from "@/app/service/categoriesService"
import { Textarea } from "@/app/components/ui/textarea"
import SetupWarningModal from "./setup-warning"

type setupData = z.infer<typeof setupProfileSchema>

interface Category {
  id: string
  name: string
}

const SetupForm = () => {
  const router = useRouter()
  const { user } = useUser()

  const [mustSetup, setMustSetup] = useState(false)
  const [open, setModalOpen] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [profileId, setProfileId] = useState<string | null>(null)

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<setupData>({
    resolver: zodResolver(setupProfileSchema),
    defaultValues: {
      business_name: "",
      category_id: "",
      description: "",
      location: ""
    }
  })

  useEffect(() => {
    const loadCategories = async () => {
      const { data, error } = await getCategories()
      if (error) toast.error("Gagal mengambil kategori")
      else setCategories(data as Category[])
    }

    loadCategories()
  }, [])

  useEffect(() => {
    if (!user) return

    const loadProfile = async () => {
      const { data } = await createClientSupabase()
        .from("umkm_profile")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle()

      if (data) {
        setProfileId(data.id)

        setValue("business_name", data.business_name)
        setValue("category_id", data.category_id.toString())
        setValue("description", data.description)
        setValue("location", data.location)
      } else {
        setMustSetup(true)
      }
    }

    loadProfile()
  }, [user, createClientSupabase(), setValue])

  const onSubmit = async (values: setupData) => {
    if (!user) {
      toast.error("User tidak ditemukan")
      return
    }

    try {
      setIsSubmitting(true)

      if (profileId) {
        const { error } = await createClientSupabase()
          .from("umkm_profile")
          .update(values)
          .eq("id", profileId)

        if (error) {
          toast.error("Gagal update profil")
          return
        }

        toast.success("Profil UMKM berhasil diperbarui!")
        router.push("/dashboard")
        return
      }

      const { error } = await createClientSupabase()
        .from("umkm_profile")
        .insert({
          user_id: user.id,
          ...values
        })

      if (error) {
        toast.error("Gagal membuat profil")
        return
      }

      toast.success("Profil UMKM berhasil dibuat!")
      router.push("/dashboard")

    } catch (err) {
      console.error(err)
      toast.error("Terjadi kesalahan")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center">
      {mustSetup && !profileId && (
        <SetupWarningModal open={open} onOpenChange={setModalOpen} />
      )}

      <Card className="w-full max-w-lg">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div>
              <label className="block mb-1 font-medium text-sm">Nama Usaha</label>
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
              <label className="block mb-1 font-medium text-sm">Deskripsi</label>
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
              <Input {...register("location")} placeholder="Yogyakarta, Indonesia" />
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
                    <Spinner /> {profileId ? "Mengupdate..." : "Menyimpan..."}
                  </span>
                ) : (
                  profileId ? "Update Profil" : "Simpan Profil"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SetupForm
