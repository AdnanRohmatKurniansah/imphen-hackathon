"use client"

import React, { useState } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productCreateSchema } from '@/app/validations/product-validation'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card'
import { Label } from '@/app/components/ui/label'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Spinner from '@/app/components/ui/spinner'
import { addProduct } from '@/app/service/productService'
import { useUser } from '@/app/providers/user-provider'
import Image from 'next/image'
import { Textarea } from '@/app/components/ui/textarea'

type ProductFormData = z.infer<typeof productCreateSchema>

const CreateProductForm = () => {
  const router = useRouter()
  const { user } = useUser()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(productCreateSchema)
  })

  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  if (!user) return null

  const onSubmit = async (data: ProductFormData) => {
    if (!data.image_url || data.image_url.length === 0) return

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('product_name', data.product_name)
      formData.append('description', data.description)
      formData.append('sale_price', data.sale_price.toString())
      if (data.discount_price) 
        formData.append('discount_price', data.discount_price.toString())
      formData.append('stock_qty', data.stock_qty.toString())
      if (data.weight) 
        formData.append('weight', data.weight.toString())
      if (data.unit) 
        formData.append('unit', data.unit)
      formData.append('image_file', data.image_url[0])

      await addProduct(user.id, formData)
      toast.success('Produk berhasil ditambahkan!')
      router.push('/dashboard/products')
    } catch (err) {
      console.error(err)
      toast.error('Gagal menambahkan produk')
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
        <CardTitle>Tambah Produk UMKM</CardTitle>
        <CardDescription>Isi form berikut untuk menambahkan produk baru</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className='mb-3'>Nama Produk <span className='text-red-500'>*</span></Label>
              <Input placeholder='Masukkan nama produk' {...register('product_name')} />
              {errors.product_name && (
                <p className="text-red-500 text-sm">{String(errors.product_name.message)}</p>
              )}
            </div>

            <div>
              <Label className='mb-3'>Harga Jual <span className='text-red-500'>*</span></Label>
              <Input min={'1'} placeholder='Masukkan harga jual produk' type="number" {...register('sale_price')} />
              {errors.sale_price && (
                <p className="text-red-500 text-sm">{String(errors.sale_price.message)}</p>
              )}
            </div>

            <div>
              <Label className='mb-3'>Deskripsi <span className='text-red-500'>*</span></Label>
              <Textarea
                {...register("description")}
                placeholder="Masukkan deskripsi produk"
                className="w-full"
                rows={4}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{String(errors.description.message)}</p>
              )}
            </div>

            <div>
              <Label className='mb-3'>Harga Diskon</Label>
              <Input min={0} placeholder='Masukkan harga diskon produk' type="number" {...register('discount_price')} />
            </div>

            <div>
              <Label className='mb-3'>Stok <span className='text-red-500'>*</span></Label>
              <Input placeholder='Masukkan stok produk' min={1} type="number" {...register('stock_qty')} />
              {errors.stock_qty && (
                <p className="text-red-500 text-sm">{String(errors.stock_qty.message)}</p>
              )}
            </div>

            <div>
              <Label className='mb-3'>Berat (gram)</Label>
              <Input min={0} placeholder='Masukkan berat produk' type="number" {...register('weight')} />
            </div>

            <div>
              <Label className='mb-3'>Satuan</Label>
              <Input  placeholder='Masukkan satuan seperti (pcs, kg, liter, dll)' {...register('unit')} />
            </div>

            <div>
              <Label className='mb-3'>Gambar Produk <span className='text-red-500'>*</span></Label>

              {imagePreview && (
                <Image
                  alt='imgPreview'
                  width={150}
                  height={150}
                  className='py-5 rounded-md object-cover'
                  src={imagePreview}
                />
              )}

              <Input
                type="file"
                accept="image/*"
                {...register('image_url')}
                onChange={(e) => {
                  handleImagePreview(e)
                  register('image_url').onChange(e)
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
              Submit
              {loading && <Spinner />}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateProductForm
