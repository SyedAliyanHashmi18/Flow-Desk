import { auth } from "@/auth";
import { generateTasks } from "@/lib/ai/generateTasks";
import dbConnect from "@/lib/dbConnect";
import { checkAIRateLimit } from "@/services/aiService";
import { createAITasks } from "@/services/taskService";


export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();

    const session = await auth();
    if (!session) throw new Error("User not found");

    const { projectGoal } = await request.json();
    const { id: projectId } = await params;
    const userId = session.user.id;

    await checkAIRateLimit(userId);

    const aiTasks = await generateTasks(projectGoal);

    await createAITasks(projectId, userId, aiTasks);

    return Response.json({
      success: true
    });

  } catch (error: any) {
    console.error("AI ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Your goal is unclear. Please describe your project in more detail."
      },
      { status: 400 }
    );
  }
}