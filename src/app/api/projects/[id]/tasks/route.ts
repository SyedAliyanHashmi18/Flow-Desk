import dbConnect from "@/lib/dbConnect";
import { auth } from "@/app/auth";
import { createTask } from "@/lib/data/tasks";


export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const session = await auth();

        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const body = await request.json();

        const params = await context.params;
        const task = await createTask(params.id, body);
        return new Response(JSON.stringify(task), { status: 201 });

    } catch (error) {
        console.error("Error creating task:", error);
        return new Response(JSON.stringify({ error: "Failed to create task" }), { status: 500 });
    }
}
