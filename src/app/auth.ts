import NextAuth from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);