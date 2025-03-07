import { NextResponse } from "next/server"

import { auth0 } from "@/lib/auth0"
import { jwtDecrypt,jwtVerify } from "jose"
async function decryptToken(token: string) {
    console.log(process.env.AUTH0_SECRET)
    const secretKey = new TextEncoder().encode("e35ab6e673abef5085d3a57593600be1") // Replace with your actual secret key
    try {
      const { payload } = await jwtDecrypt(token, secretKey)
      return payload
    } catch (error) {
      console.error("Failed to decrypt token:", error)
      return null
    }
  }
  async function verifyToken(token: string) {
    const secretKey = new TextEncoder().encode(process.env.AUTH0_SECRET);
    try {
        const { payload } = await jwtVerify(token, secretKey);
        return payload;
    } catch (error) {
        console.error("Failed to verify token:", error);
        return null;
    }
}
export async function GET() {
  console.log("methana thamai")
  try {
    // const token = await auth0.getAccessToken()
    // const token = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9kZXYtaTN5dzZkNXVzcWtrYXNiMy51cy5hdXRoMC5jb20vIn0..gkRgfk47iaRV0WjT._hHiOcXZ0IXEXCChyspYAW6u-9UBE5JWCgFDGTKM3uQtNECK05OYHLDpOCLkfPwMqX2-BjsXy1nzm7q_OrkXeaHB4F4gLW08DOaRDDa-AsaWNmOfqd4RK5zGBKqbgSh-BE0Guwa-8x-Kd6np30WUEE9WvWqJKQ_FuPWet9IGkFm0M0crEU_sM9R70SNAFlM4Wy7s07Hn-xBWvjSDYqWOR13BOEJ4aFxXZ-0hnKbTRUcQiEHAqWftfvoBU9wskhAmO5XA_YYeo-RCdvuNiAoLyMwlXyUuGb9XUOVax_JhSTeDxrjlB2td8ax5kN-IQJ4RGjbeExIO0fRBRVPP1rOKMLmn.yvttTolfiF-2xodNgqdFdA";
    const token = await auth0.getAccessToken();
    console.log(token)
    if (token.accessToken) {
      console.log(await decryptToken(token.accessToken));
    } else {
      console.error("Access token is undefined");
    }
    // console.log(decryptToken(token.accessToken))
    // console.log(verifyToken(token.accessToken))

  } catch (err) {
    // err will be an instance of AccessTokenError if an access token could not be obtained
  }

  return NextResponse.json({
    message: "Success!",
  })
}