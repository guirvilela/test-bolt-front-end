import { z } from "zod";

export const loginValidation = z.object({
  username: z
    .string()
    .min(1, "O usuário é obrigatório")
    .max(50, "O usuário não pode ter mais de 50 caracteres"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(50, "A senha não pode ter mais de 50 caracteres"),
});

export const registerValidation = z.object({
  username: z
    .string()
    .min(3, "Nome de usuário deve ter pelo menos 3 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  email: z.string().email("Email inválido"),
});
