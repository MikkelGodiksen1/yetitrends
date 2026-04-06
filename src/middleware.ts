import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  DK: "DKK",
  SE: "SEK",
  NO: "NOK",
  FI: "EUR",
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.get("currency")) {
    const country = request.headers.get("x-vercel-ip-country") || "DK";
    const currency = COUNTRY_CURRENCY_MAP[country] || "DKK";
    response.cookies.set("currency", currency, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    response.cookies.set("country", country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
