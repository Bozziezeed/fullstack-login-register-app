/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GET, USER } from "./utils/api.util";

export async function middleware(request: NextRequest) {
  console.log("ROUTE: ", request.nextUrl.pathname);
  const searchParams = request.nextUrl.searchParams;
  const userToken = request.cookies.get("jwt")?.value ?? undefined;
  console.log("Token: ", userToken);

  // จะไปหน้า login
  if (request.nextUrl.pathname.startsWith("/login")) {
    // เคย login แล้ว
    if (userToken) {
      const fromPath = searchParams.get("from");

      // มี redirect path, ไปตามนั้น (ไว้ check role ตอนเข้า route อื่นอีกที)
      if (fromPath && fromPath != "/") {
        let otherSearchParams = "";
        searchParams.forEach((value, key) => {
          if (key !== "from") {
            otherSearchParams += `${key}=${value}&`;
          }
        });

        return NextResponse.redirect(
          new URL(`${fromPath}?${otherSearchParams}`, request.url)
        );
      }
      // ไม่มี redirect path, ไปหน้า home
      else {
        return NextResponse.redirect(new URL(`/home`, request.url));
      }
    }
    // ไม่เคย login, ไป login ต่อ
    else {
      return NextResponse.next();
    }
  }
  // จะไปหน้าอื่น
  else {
    // เคย login แล้ว
    if (userToken) {
      return NextResponse.next();
    }

    // role เข้าถึงหน้านั้นๆ ไม่ได้

    // non-exist role

    // ไม่เคย login, ไป login ต่อ + เขียน redirect path
    else {
      return NextResponse.redirect(
        new URL(
          `/login?from=${request.nextUrl.pathname}&${searchParams.toString()}`,
          request.url
        )
      );
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/home", "/login"],
};
