import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/schemas/register";



export async function POST(request: Request) {
        await dbConnect();
    try {
        const body = await request.json();

        const result = registerSchema.safeParse(body);

        if (!result.success) {
            return new Response(JSON.stringify({ message: "Invalid input data", errors:  result.error.flatten().fieldErrors, }), { status: 400 });
        }

        const { username, email, password } = result.data;

        
        const existingEmail = await UserModel.findOne({
            email: email.toLowerCase().trim()
        });
        
        if (existingEmail) {
            
            return new Response(JSON.stringify({ message: "Email already exists" }), { status: 400 });
        }
        const existingUsername = await UserModel.findOne({
            username: username
        });
        if (existingUsername) {
            console.error("Username already exists:", username);
            return new Response(JSON.stringify({ message: "Username already exists" }), { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            username,
            email,
            passwordHash: hashedPassword,
            emailVerified: false,
            role: "user" ,
            plan: "free",
        });
        const otp = Math.floor(100000 + Math.random() * 900000);
        newUser.emailOtp = otp;
        newUser.otpExpiry = new Date(Date.now() + 5 * 60 * 1000); 

        await newUser.save();
        
        console.log("Generated OTP:", otp)

        return Response.json({
        email: newUser.email,
        otp,
        redirect: `/verify-otp?email=${encodeURIComponent(newUser.email)}`
        });

} catch (error: any) {
    console.error("REGISTER ERROR:", error);
    return new Response(
        JSON.stringify({ message: "Error registering user", error: error.message }),
        { status: 500 }
    );
}
}