import { z } from "zod";

export const authSchemaWithEmail = z.object({
    email: z.string().min(1, 'Email is required').max(150),
    password: z.string().min(1, 'Password is required')
})