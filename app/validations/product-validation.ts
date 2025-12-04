import { z } from "zod";

export const productCreateSchema = z.object({
    product_name: z.string().min(1, 'Product Name is required').max(150),
    description: z.string().min(1, 'Description is required'),
    sale_price: z.coerce.number().min(1, 'Sale Price is required'),
    discount_price: z.coerce.number().optional(),
    image_url: z.any().refine((files) => files?.length != 0, "Image is required."),
    stock_qty: z.coerce.number().min(1, 'Stock Qty is required'),
    weight: z.coerce.number().optional(),
    unit: z.string().optional(),
})

export const productUpdateSchema = z.object({
    product_name: z.string().min(1, 'Product Name is required').max(150),
    description: z.string().min(1, 'Description is required'),
    sale_price: z.coerce.number().min(1, 'Sale Price is required'),
    discount_price: z.coerce.number().optional(),
    image_url: z.any().nullable(), 
    stock_qty: z.coerce.number().min(1, 'Stock Qty is required'),
    weight: z.coerce.number().optional(),
    unit: z.string().optional(),
})