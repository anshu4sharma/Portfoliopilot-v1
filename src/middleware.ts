import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { routes, users } from "@/db/schema";

export const config = {
  matcher: ["/((?!api/|_next/|_vercel/|favicon.ico|_static/).*)"],
};

export default async function middleware(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const hostname = req.headers.get("host") || "";

    // Safeguard against missing hostname
    if (!hostname) {
      console.error("No hostname found in request");
      return NextResponse.rewrite(new URL("/404", req.url));
    }

    // Extract subdomain
    const parts = hostname.split(".");
    const isLocalhost = hostname.includes("localhost");
    const isSubdomain = parts.length > (isLocalhost ? 1 : 2);
    const subdomain = isSubdomain ? parts[0] : null;

    // Get the first path segment as potential route name
    // const routeName = url.pathname.split("/")[1];

    // Handle subdomain requests
    if (subdomain) {
      try {
        const route = await db.query.routes.findFirst({
          where: eq(routes.routeName, subdomain),
        });
        const user = await db.query.users.findFirst({
          where: eq(users.id, route?.userId || 0),
        });

        // if (route?.isSubDomainActive) {
        if (user?.userType == "pro") {
          // If we're already on the correct subdomain, just rewrite to the route handler
          return NextResponse.rewrite(
            new URL(
              `/${subdomain}${url.pathname === "/" ? "" : url.pathname}`,
              req.url,
            ),
          );
        } else {
          // TODO: Redirect to the root domain
          // return NextResponse.redirect(new URL(env.HOST_NAME ?? "/", req.url));
          return NextResponse.rewrite(new URL("/404", req.url));
        }
      } catch (error) {
        console.error("Database error when checking subdomain:", error);
        return NextResponse.rewrite(new URL("/500", req.url));
      }
    }

    // Handle direct route access (without subdomain)
    // if (routeName) {
    //   try {
    //     const route = await db.query.routes.findFirst({
    //       where: eq(routes.routeName, routeName),
    //     });

    //     if (route?.isSubDomainActive) {
    //       // Construct subdomain URL
    //       const baseUrl = isLocalhost
    //         ? `http://${route.routeName}.localhost:3000`
    //         : `https://${route.routeName}.${hostname}`;

    //       const pathWithoutRoute =
    //         url.pathname.replace(`/${routeName}`, "") || "/";
    //       return NextResponse.redirect(new URL(baseUrl + pathWithoutRoute));
    //     }
    //   } catch (error) {
    //     console.error("Database error when checking route name:", error);
    //     return NextResponse.rewrite(new URL("/500", req.url));
    //   }
    // }

    // For all other requests, continue with normal routing
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware global error:", error);
    return NextResponse.rewrite(new URL("/500", req.url));
  }
}
