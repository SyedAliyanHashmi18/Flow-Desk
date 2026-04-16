import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import TaskModel from "@/models/task";
import { hasFeature } from "@/lib/feature/checkFeature";
import { auth } from "@/app/auth";
export async function GET(req: Request, { params }: {params : Promise<{id: string}>}) {
  await dbConnect();

  const { id : projectId } = await params;
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const user = session.user;

  const tasks = await TaskModel.find({ projectId });
  if (!hasFeature(user, "export")) {
  throw new Error("Upgrade to Pro to export");
}
  // CSV Header
  let csv = "Title,Description,Priority,Status\n";

  // Add rows
  tasks.forEach(task => {
    csv += `"${task.title}","${task.description}","${task.priority}","${task.status}"\n`;
  });

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=tasks.csv",
    },
  });
}