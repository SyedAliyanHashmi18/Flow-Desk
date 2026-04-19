import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, // 🔥 IMPORTANT (YOU WERE MISSING THIS IN PRACTICE)

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.identifier || !credentials?.password) {
          return null; // ❌ NEVER throw in NextAuth authorize
        }

        const user = await UserModel.findOne({
          $or: [
            { email: credentials.identifier.toLowerCase() },
            { username: credentials.identifier.toLowerCase() },
          ],
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!isPasswordValid) return null;

        return {
          id: user._id.toString(), // 🔥 IMPORTANT: use id (NOT _id)
          email: user.email,
          name: user.username,
          role: user.role,
          plan: user.plan,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.plan = user.plan;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.plan = token.plan;
      }
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },
};