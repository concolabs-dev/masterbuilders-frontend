"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type React from "react" // Added import for React

import { jwtDecode } from "jwt-decode"
import { jwtDecrypt } from "jose"

async function decryptToken(token: string) {
  console.log(process.env.AUTH0_SECRET)
  const secretKey = new TextEncoder().encode("e35ab6e673abef5085d3a57593600be187971f0bd9b6027cabd84c254ffbbcbc") // Replace with your actual secret key
  try {
    const { payload } = await jwtDecrypt(token, secretKey)
    return payload
  } catch (error) {
    console.error("Failed to decrypt token:", error)
    return null
  }
}
interface DecodedToken {
  sub: string
  email?: string
  '${process.env.AUTH0_ISSUER_BASE_URL}/roles'?: string[] // Replace with your custom claim for roles
  [key: string]: any // Allow for additional claims
}
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoadingl, setIsLoading] = useState(true)
  // const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {

      try {
        const res = await fetch("/api/auth", { credentials: "include" })
        const data = await res.json()
        const accessToken = data.session.idToken
        console.log(accessToken)  
        console.log("methana thamai")
        console.log( decryptToken(accessToken))

        // // Extract user information and roles
        // const username = decodedToken.email || decodedToken.sub
        // const roles = decodedToken["https://your-namespace.com/roles"] || []
        // console.log("User roles:", roles, username)
        if (!data.session.user ) {
          router.push("/api/auth/login")
        } else {
          console.log(data)

          setIsLoading(false)
        }
      
      } catch (error) {
        console.error("Authentication error:", error)
        router.push("/api/auth/login")
      }
    }

    // checkAuth()
  }, [router])

  // if (isLoadingl) {
  //   return <div>Loading...</div>
  // }

  return <>{children}</>
}

