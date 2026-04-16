import {z} from "zod";


export const projectSchema = z.object(
    {
        title: z
        .string()
        .min(3, "Title must be at least 3 characters long")
        .max(100, "Title must be less than 100 characters")
        .trim(),
        
        
       description: z.string()
        .trim()
        .max(1000, "Description must be less than 1000 characters")
        .optional()
        .or(z.literal(""))
        .transform(val => val === "" ? undefined : val), 

        status: z.enum(["active", "archived"]).default("active"), 
    });