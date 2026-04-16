import TaskModel from "@/models/task";
import mongoose from "mongoose";

export async function GET(req: Request, { params }: {params : Promise<{id: string}>}) {

  const { id } = await params;
  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status");
  const priority = searchParams.get("priority");

  const filter: any = {
    projectId: new mongoose.Types.ObjectId(id),
  };

  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  const tasks = await TaskModel.find(filter);

  return Response.json({
    success: true,
    tasks
  });
}