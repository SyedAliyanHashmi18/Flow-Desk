import { NextResponse } from "next/server";
import ProjectModel  from "@/models/project";
import  dbConnect  from "@/lib/dbConnect";

export async function GET() {
  await dbConnect();

  const projects = await ProjectModel.find().lean();

  return NextResponse.json(projects);
}