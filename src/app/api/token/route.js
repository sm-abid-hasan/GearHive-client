
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic"; 

const TOKEN_LIFETIME_SECONDS = 60 * 60; 

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.json({ message: "You are not logged in." }, { status: 401 });
  }

  if (!process.env.JWT_SECRET) {
    return NextResponse.json({ message: "JWT_SECRET is not configured on the website." }, { status: 500 });
  }

  const token = jwt.sign(
    { email: session.user.email, name: session.user.name },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_LIFETIME_SECONDS, subject: session.user.id }
  );

  return NextResponse.json(
    {
      token,
 
      expiresAt: Date.now() + (TOKEN_LIFETIME_SECONDS - 60) * 1000,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
