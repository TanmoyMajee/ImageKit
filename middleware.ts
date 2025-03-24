import withAuth from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth( function middleware(request:NextRequest){
  return NextResponse.next();
},
{
  callbacks:{
    authorized({req,token}){
      const {pathname} = req.nextUrl;
      // allow access to login page
      if(pathname.startsWith("/api/auth")
      || pathname.startsWith("/login")
      || pathname.startsWith("/register")
      ){
        return true;
      }
      
      // pubilc
      if(pathname.startsWith("/") || pathname.startsWith("/api/videos")){
        return true;
      }
      // redirect to login page if not authenticated
      return !!token;
    }
  }
}
)

export const config = {
  matcher:["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
