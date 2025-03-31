import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define routes that require protection
const isProtectedRoute = createRouteMatcher(['/']);

export default clerkMiddleware(async (auth, req) => {
  
  // Check if the route is protected
  if (isProtectedRoute(req)) {
    await auth.protect();  // This will block the request if the user is not authenticated
  }
  
  return NextResponse.next();  // Continue the request processing
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',  // Static files and Next.js internals to be skipped
    '/(api|trpc)(.*)',  // Always run for API routes
  ],
};
