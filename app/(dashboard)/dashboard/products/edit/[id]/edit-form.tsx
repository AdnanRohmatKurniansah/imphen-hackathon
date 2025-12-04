"use client"

import React, { useEffect, useState } from "react"
import { useForm, FieldError } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productUpdateSchema } from "@/app/validations/product-validation"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
import { Label } from "@/app/components/ui/label"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Spinner from "@/app/components/ui/spinner"
import { useUser } from "@/app/providers/user-provider"
import Image from "next/image"
import { Textarea } from "@/app/components/ui/textarea"
import { getProductById, updateProduct } from "@/app/service/productService"

type ProductFormData = z.infer<typeof productUpdateSchema>

const EditProductForm = ({ productId }: { productId: string }) => {
  const router = useRouter()
  const { user } = useUser()

  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [oldImage, setOldImage] = useState<string | null>(null)

  const { register, setValue, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(productUpdateSchema)
  })

  useEffect(() => {
    if (!user) return 

    const fetchProduct = async () => {
      try {
        const product = await getProductById(productId)

        if (!product) {
          toast.error("Produk tidak ditemukan")
          return router.push("/dashboard/products")
        }

        setValue("product_name", product.product_name)
        setValue("description", product.description)
        setValue("sale_price", product.sale_price)
        setValue("discount_price", product.discount_price || undefined)
        setValue("stock_qty", product.stock_qty)
        setValue("weight", product.weight || undefined)
        setValue("unit", product.unit || "")

        setOldImage(product.image_url)
      } catch (err) {
        toast.error("Gagal memuat data produk")
      }
    }

    fetchProduct()
  }, [productId, router, setValue])

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("product_id", productId)
      formData.append("product_name", data.product_name)
      formData.append("description", data.description)
      formData.append("sale_price", data.sale_price.toString())

      if (data.discount_price)
        formData.append("discount_price", data.discount_price.toString())

      formData.append("stock_qty", data.stock_qty.toString())

      if (data.weight)
        formData.append("weight", data.weight.toString())

      if (data.unit)
        formData.append("unit", data.unit)

      if (data.image_url && data.image_url.length > 0) {
        formData.append("image_file", data.image_url[0])
      }

      await updateProduct(formData)

      toast.success("Produk berhasil diperbarui!")
      router.push("/dashboard/products")
    } catch (err) {
      toast.error("Gagal memperbarui produk")
    } finally {
      setLoading(false)
    }
  }

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Produk</CardTitle>
        <CardDescription>Update informasi produk sesuai kebutuhan</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="mb-3">Nama Produk <span className='text-red-500'>*</span></Label>
              <Input {...register("product_name")} />
              {errors.product_name && <p className="text-red-500 text-sm">{errors.product_name.message}</p>}
            </div>
            <div>
              <Label className="mb-3">Harga Jual <span className='text-red-500'>*</span></Label>
              <Input type="number" {...register("sale_price")} />
              {errors.sale_price && <p className="text-red-500 text-sm">{errors.sale_price.message}</p>}
            </div>
            <div>
              <Label className="mb-3">Deskripsi <span className='text-red-500'>*</span></Label>
              <Textarea rows={4} {...register("description")} />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            <div>
              <Label className="mb-3">Harga Diskon</Label>
              <Input type="number" {...register("discount_price")} />
            </div>
            <div>
              <Label className="mb-3">Stok <span className='text-red-500'>*</span></Label>
              <Input type="number" {...register("stock_qty")} />
              {errors.stock_qty && <p className="text-red-500 text-sm">{String(errors.stock_qty.message)}</p>}
            </div>
            <div>
              <Label className="mb-3">Berat (gram)</Label>
              <Input type="number" {...register("weight")} />
            </div>
            <div>
              <Label className="mb-3">Satuan</Label>
              <Input {...register("unit")} />
            </div>
            <div>
              <Label className="mb-3">Gambar Produk</Label>
              {oldImage && !imagePreview && (
                <Image
                  src={oldImage}
                  width={150}
                  height={150}
                  alt="old-image"
                  className="object-cover py-5 rounded-md"
                />
              )}
              {imagePreview && (
                <Image
                  src={imagePreview}
                  width={150}
                  height={150}
                  alt="new-preview"
                  className="object-cover py-5 rounded-md"
                />
              )}
              <Input
                type="file"
                accept="image/<span className='text-red-500'>*</span>"
                {...register("image_url")}
                onChange={(e) => {
                  handleImagePreview(e)
                  register("image_url").onChange(e)
                }}
              />
              {errors.image_url && (
                <p className="text-red-500 text-sm">
                  {String((errors.image_url as FieldError).message)}
                </p>
              )}
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <Button type="submit" disabled={loading} className="flex items-center gap-2">
              Update Produk
              {loading && <Spinner />}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default EditProductForm
