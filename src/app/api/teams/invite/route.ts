import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import TeamMember from "@/models/TeamMember";

export async function POST(req: Request) {
  await dbConnect();
  const { teamId, userId, role } = await req.json();

  // Add member
  const member = await TeamMember.create({
    teamId,
    userId,
    role: role || "member",
  });

  return NextResponse.json(member);
}