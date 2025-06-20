"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function withRoleGuard<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>,
  allowedRoles: string[] = []
) {
  return function ProtectedComponent(props: P) {
    const { user, isLoading, error } = useUser();
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      if (!isLoading && user) {
        const roles: string[] = Array.isArray(
          user["https://dev-risinu-test.com/roles"]
        )
          ? user["https://dev-risinu-test.com/roles"]
          : [];
        const hasAccess =
          allowedRoles.length === 0 ||
          roles.some((role) => allowedRoles.includes(role));

        if (!hasAccess) {
          router.push("/unauthorized");
        } else {
          setChecked(true);
        }
      } else if (!isLoading && !user) {
        if (allowedRoles.includes("admin")) {
          router.push("/login");
        } else {
          router.push("/api/auth/login");
        }
      }
    }, [user, isLoading]);

    if (isLoading || !user || !checked) return null;

    return <Component {...props} />;
  };
}
