import { aiClient } from "./cilent";

export async function improveTasks(title: string, description : string) {

    const prompt = `
      Improve this development task.

      Title: ${title}
      Description: ${description}

      INSTRUCTIONS:
      - Return ONLY a JSON object
      - JSON must have exactly these keys:
        {
          "title": string,
          "description": string,
          "priority": "low" | "medium" | "high"
        }
      - Do NOT include:
        - Markdown, headings, or labels
        - Examples, code blocks, or explanations
        - Any text outside the JSON object
      - Fill all fields with valid data
      - "priority" must be exactly "low", "medium", or "high"

      ONLY RETURN THE JSON OBJECT.
      `;

    
      try {
            const completion = await aiClient.chat.completions.create({
              model: "meta-llama/llama-3.1-8b-instruct",
              messages: [{ role: "user", content: prompt }],
            });
            return completion.choices[0].message.content;
          } catch (err) {
            console.error("AI model error:", err);
            throw new Error("Failed to improve task: AI model not reachable");
          }

}