import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
export const authOptions : NextAuthConfig = {
    trustHost: true,
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                identifier: { label: "Email or Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    if (!credentials?.identifier || !credentials?.password) {
                        throw new Error("Missing credentials");
                        }
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier?.toLowerCase() },
                            { username: credentials.identifier?.toLowerCase() }
                        ]
                    });
                    if (!user) {
                        throw new Error("User not found");
                    }
                    const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);
                    if (isPasswordValid) {
                        return {
                            id: user._id.toString(),
                            email: user.email,
                            username: user.username,
                            role: user.role,
                            plan: user.plan,
                        };
                    }else {
                        throw new Error("Invalid password");
                    }
                } catch (err : any) {
                    throw new Error("Invalid credentials");
                }
            }
            
        })
    ],callbacks:{
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.username = user.username;
                token.role = user.role;
                token.plan = user.plan;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.username;
                session.user.role = token.role;
                session.user.plan = token.plan;
            }
            return session;
        },

    },
    session: {
        strategy: "jwt" ,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin",
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
        },
    },
    
};
