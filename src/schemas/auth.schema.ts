// FILE: src/api/routes/auth/auth.schemas.ts
import { z } from 'zod';


export const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  wa: z.string()
    .min(10, "Nomor WhatsApp minimal 10 digit")
    .max(16, "Nomor WhatsApp maksimal 16 digit")
    .regex(/^[0-9]+$/, "Nomor WhatsApp hanya boleh berisi angka")
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});