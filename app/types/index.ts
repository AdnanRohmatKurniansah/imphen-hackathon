export type UmkmProfile = {
    id: string
    user_id: string
    category_id: string
    business_name: string
    description: string
    location: string
    created_at: Date
    updated_at: Date
    logo_url: string
}

export type UmkmProduct = {
    id: string
    user_id: string
    product_name: string
    description: string
    sale_price: number
    discount_price: number | null
    image_url: string
    stock_qty: number
    weight: number | null
    unit: string | null
    created_at: Date
    updated_at: Date
}