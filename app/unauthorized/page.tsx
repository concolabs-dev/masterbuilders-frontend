"use-client";

import Link from "next/link";

export const metadata = {
  title: "Unauthorized Access",
  description: "You do not have permission to access this resource",
};

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 flex justify-center">
          {/* Lock icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
        </div>

        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Unauthorized Access
        </h1>

        <p className="mb-6 text-center text-gray-600">
          You don't have permission to access this page. Please contact your
          administrator if you believe this is an error.
        </p>

        <div className="flex justify-center space-x-4">
          <Link
            href="/"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Return Home
          </Link>

          <Link
            href="/api/auth/login"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
