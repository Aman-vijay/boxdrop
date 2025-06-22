import { clerkMiddleware , createRouteMatcher  } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isProtectedRoutes = createRouteMatcher(["/","sign-in(.*)?","sign-up(.*)?"]);



export default clerkMiddleware(async(auth,request)=>{
    const user = auth();
    const userId = (await user)?.userId;
    const url = new URL(request.url);

    if(userId && isProtectedRoutes(request ) && url.pathname !== "/"){
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
     if (!isProtectedRoutes(request)) {
    await auth.protect()
  }

})

export const config = {
  matcher: [
 
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
 
    '/(api|trpc)(.*)',
  ],
}