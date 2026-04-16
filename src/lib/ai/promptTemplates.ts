export function generateTasksPrompt(userInput: string) {
  return `
Break the following project goal into development tasks.

Project Goal:
${userInput}

Return ONLY valid JSON.

Rules:
- Do NOT explain anything
- Do NOT add text before or after JSON
- Output must start with { and end with }
- priority must be EXACTLY one of: "low", "medium", "high"
- Do NOT use any other spelling (e.g., medium, high priority, etc.)
- Always return at least 5 tasks you can go to 10 0r 20

JSON format:

{
  "tasks": [
    {
      "title": "Task title",
      "description": "Detailed explanation",
      "priority": "low"
    }
  ]
}
`;
}