import { createClientSupabase } from "@/app/utils/supabase/client"
import { UmkmProduct } from "../types"

export const getProducts = async (userId: string, page = 1, limit = 10) => {
  
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await createClientSupabase()
    .from("umkm_products")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to)

  if (error) throw error
  return { data, total: count ?? 0 }
}

export const getProductById = async (id: string): Promise<UmkmProduct | null> => {
  const { data, error } = await createClientSupabase()
    .from("umkm_products")
    .select("*")
    .eq("id", id)
    .single()

  if (error) return null
  return data
}

export const addProduct = async (user_id: string, data: FormData): Promise<UmkmProduct> => {
  const file = data.get('image_file') as File
  const fileName = `${Date.now()}_${file.name}`
  const filePath = `umkm_products/${fileName}`

  const { error: uploadError } = await createClientSupabase().storage
    .from('umkm_storage')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const image_url = createClientSupabase().storage
    .from('umkm_storage')
    .getPublicUrl(filePath).data.publicUrl

  const { data: product, error } = await createClientSupabase()
    .from('umkm_products')
    .insert({
      user_id,
      product_name: data.get('product_name'),
      description: data.get('description'),
      sale_price: Number(data.get('sale_price')),
      discount_price: data.get('discount_price') ? Number(data.get('discount_price')) : null,
      stock_qty: Number(data.get('stock_qty')),
      weight: data.get('weight') ? Number(data.get('weight')) : null,
      unit: data.get('unit') || null,
      image_url
    })
    .select()
    .single()

  if (error) throw error

  return product
}

export const updateProduct = async (form: FormData): Promise<UmkmProduct> => {
  const supabase = createClientSupabase()

  const product_id = form.get("product_id") as string

  const { data: existing } = await supabase
    .from("umkm_products")
    .select("image_url")
    .eq("id", product_id)
    .single()

  const newFile = form.get("image_file") as File | null

  let finalImageUrl = existing?.image_url || null

  if (newFile && newFile.size > 0) {
    const ext = newFile.name.split(".").pop()
    const fileName = `${Date.now()}.${ext}`
    const filePath = `umkm_products/${fileName}`

    if (existing?.image_url) {
      const url = existing.image_url;
      const oldPath = url.split("/umkm_storage/")[1];

      if (oldPath) {
        await supabase.storage.from("umkm_storage").remove([oldPath]);
      }
    }

    const { error: uploadError } = await supabase.storage
      .from("umkm_storage")
      .upload(filePath, newFile, { upsert: true })

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage
      .from("umkm_storage")
      .getPublicUrl(filePath)

    finalImageUrl = urlData?.publicUrl || null
  }

  const payload: Partial<UmkmProduct> = {
    product_name: form.get("product_name") as string,
    description: form.get("description") as string,
    sale_price: Number(form.get("sale_price")),
    discount_price: form.get("discount_price")
      ? Number(form.get("discount_price"))
      : null,
    stock_qty: Number(form.get("stock_qty")),
    weight: form.get("weight") ? Number(form.get("weight")) : null,
    unit: (form.get("unit") as string) || null,
    image_url: finalImageUrl,
  }

  const { data: updated, error } = await supabase
    .from("umkm_products")
    .update(payload)
    .eq("id", product_id)
    .select()
    .single()

  if (error) throw error

  return updated
}

export const deleteProduct = async (id: string) => {
  
  const { data, error } = await createClientSupabase().from("umkm_products").delete().eq("id", id)
  
  return { data, error }
}
