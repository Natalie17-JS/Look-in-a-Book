import { z } from "zod";

export const userRegisterValidation = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long."),
  email: z.string().email("Please provide a valid email address."),
  password: z.string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/\d/, "Password must contain at least one number.")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character."),
});
