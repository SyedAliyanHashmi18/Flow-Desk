import { getToken } from "next-auth/jwt";
import { NextRequest , NextResponse} from "next/server";


export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request});
    const { pathname } = request.nextUrl;

    if( token && (pathname === "/signin" || pathname === "/register") ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));

    }
    if( !token && (pathname === "/dashboard" ||
        pathname.startsWith("/api/projects") ||
        pathname.startsWith("/api/tasks")
     ) ){
        return NextResponse.redirect(new URL("/signin", request.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher: [
        "/dashboard/:path*", "/api/projects/:path*", "/api/tasks/:path*"],
}