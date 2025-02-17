import { getSession } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getSession();

  if (!session || !session.user) {
    return NextResponse.json({ roles: null }, { status: 401 });
  }

  const userId = session.user.sub;

  try {
    const tokenResponse = await axios.post(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_MANAGEMENT_API_AUDIENCE,
      grant_type: 'client_credentials',
    });

    const accessToken = tokenResponse.data.access_token;

    const rolesResponse = await axios.get(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const roles = rolesResponse.data;
    return NextResponse.json({ roles });
  } catch (error) {
    console.error('Error fetching roles:', error);
    return NextResponse.json({ roles: null }, { status: 500 });
  }
}