import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";
import TeamMember from "@/models/TeamMember";
import { auth } from "@/app/auth";

export async function POST(req: Request) {
  await dbConnect();

  const session = await auth();
  const userId = session?.user._id;

  const { name } = await req.json();

  const team = await Team.create({
    name,
    ownerId: userId,
  });

  await TeamMember.create({
    teamId: team._id,
    userId,
    role: "owner",
  });

  return NextResponse.json(team);
}