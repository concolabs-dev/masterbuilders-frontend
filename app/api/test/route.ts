import { NextResponse } from "next/server"

import { getAccessToken, getSession } from "@auth0/nextjs-auth0"

export async function GET() {

  try {
    const token = await getAccessToken()
    const session = await getSession()

    return NextResponse.json({
      accessToken : token,
      idToken: session?.idToken  //uncomment the auth0/route.ts audience 
    })

  } catch (err) {
    // err will be an instance of AccessTokenError if an access token could not be obtained
  }

  return NextResponse.json({
    accessToken : "Something failed",
  })
}