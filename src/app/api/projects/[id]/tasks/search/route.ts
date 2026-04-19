import { auth } from "@/app/auth";
import dbConnect from "@/lib/dbConnect";
import TaskModel from "@/models/task";
import { success } from "zod";



export async function GET(request: Request, {params}: {params : Promise<{id : string}>}) {

    await dbConnect();

    const session = await auth();
    
    if(!session) throw new Error ("Unathorized")
        
        const {id : projectId} = await params;

        const {searchParams} = new URL(request.url);
        const query = searchParams.get("q") || "";

        const tasks = await TaskModel.find({
            projectId,
            userId : session.user.id,
            title : { $regex: query, $options: "i" },
        })

        return Response.json({
            success: true,
            tasks
        })
}