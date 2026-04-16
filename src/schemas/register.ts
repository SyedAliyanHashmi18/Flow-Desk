import { z } from "zod";
export const usernameValidation = z
    .string()
    .min(2,"Username must be at least 2 characters")
    .max(20,"Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters")

    
export const emailValidation = z.string()
    .email("Invalid email format")
    .transform((val) => val.toLowerCase().trim());    




    export const registerSchema = z.object({
    
    username:usernameValidation,
    
    email: emailValidation,

    password:  z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase, one lowercase, and one number"
    ),

    confirmPassword: z.string()
    
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
    });