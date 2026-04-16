import OpenAi from "openai";

export const aiClient = new OpenAi({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
})
