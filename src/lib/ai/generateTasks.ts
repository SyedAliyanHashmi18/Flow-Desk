import { aiClient } from "./cilent";
import { generateTasksPrompt } from "./promptTemplates";
import { AIResponceSchema } from "./validateAIOutput";

export async function generateTasks(userInput:string) {

    const completion = await aiClient.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct",
    messages: [
      {
        role: "system",
        content: "You must ONLY return valid JSON. Do not include explanations or text outside JSON."
      },
      {
        role: "user",
        content: generateTasksPrompt(userInput),
      },
    ],
  });
   const content = completion.choices[0].message.content;
// console.log("AI RAW RESPONSE:", content);

if (!content) throw new Error("AI returned empty response");

// remove markdown formatting like ```json
const cleaned = content
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

let parsed;

try {
  parsed = JSON.parse(cleaned);
} catch (error) {
  console.error("Invalid AI JSON:", cleaned);
  throw new Error("AI returned invalid JSON");
}

const validated = AIResponceSchema.parse(parsed);

return validated.tasks;

    
}