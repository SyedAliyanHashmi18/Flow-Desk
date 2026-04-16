import {z} from 'zod';

export const AITaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    priority: z.enum(["low","medium","high"]),
})

export const AIResponceSchema = z.object({
    tasks: z.array(AITaskSchema)
})