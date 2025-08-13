// app/api/some-endpoint/route.ts
import { getAccessToken } from "@auth0/nextjs-auth0";

export async function GET(request: Request) {
  const { accessToken } = await getAccessToken(); // In app router, this has context automatically
  return new Response(JSON.stringify({ token: accessToken }));
}
