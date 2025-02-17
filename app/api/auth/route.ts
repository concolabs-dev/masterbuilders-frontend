// import { NextResponse } from "next/server";

// const mockUser = { username: "admin", password: "password", role: "admin" };

// export async function POST(req: Request) {
//   const { username, password } = await req.json();

//   if (username === mockUser.username && password === mockUser.password) {
//     return NextResponse.json({ user: { username, role: mockUser.role } });
//   }

//   return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
// }

// // Check if user is logged in
// export async function GET() {
//   const isAuthenticated = true;
//   const user = isAuthenticated ? { username: "admin", role: "admin" } : null;

//   return NextResponse.json({ user });
// }
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";

export async function GET(req: NextRequest) {
  const session = await getSession();
  
  console.log(session);
  if (!session || !session.user) {

    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ session });
}
