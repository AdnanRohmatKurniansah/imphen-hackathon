import z from "zod";

export const setupProfileSchema = z.object({
  business_name: z.string().min(3, 'Business name is required').max(150),
  category_id: z.string().min(1, 'Category is required'),
  description: z.string().min(5, 'Description is required'),
  location: z.string().min(3, 'Location is required'),
});