import { auth } from "@/app/auth";
import dbConnect from "@/lib/dbConnect";
import { improvedAITasks } from "@/services/taskService";


export async function POST(request : Request, { params }: { params: Promise<{ id: string }>}) {

    
    await dbConnect();

    const session = await auth();
    if(!session ) throw new Error("User not found");

    const { id : projectId } =  await params;
    
     const updatedTasks = await improvedAITasks(projectId);

    return Response.json({
        success: true,
        task : updatedTasks  
    })
}