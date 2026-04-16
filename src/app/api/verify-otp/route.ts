import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, otp } = await req.json();
    await dbConnect();

    const user = await UserModel.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (user.emailVerified) return NextResponse.json({ 
      success: true,
      message: "Already verified",
      redirect: "/dashboard", });

    if (
    !user.emailOtp ||
    !user.otpExpiry ||
    user.emailOtp !== Number(otp) ||
    user.otpExpiry < new Date()
    ) {
  return NextResponse.json(
    { error: "Invalid or expired OTP" },
    { status: 400 }
  );
}

    user.emailVerified = true;
    user.emailOtp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return NextResponse.json({ 
      success: true,
    message: "Email verified",
    redirect: "/dashboard", });
}