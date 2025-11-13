"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: React.ComponentType<{ user: { username: string; role: string }; onLogout: () => void }>) => {
  return (props: any) => {
    const router = useRouter();
    const [user, setUser] = useState<{ username: string; role: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //   const checkAuth = async () => {
    //     try {
    //       const response = await fetch("/api/auth");
    //       const data = await response.json();

    //       if (!data.user || data.user.role !== "admin") {
    //         router.push("/login");
            
    //       } else {
    //         setUser(data.user);

    //       }
    //     } catch (error) {
    //       console.error("Auth check failed:", error);
    //       router.push("/login");
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };

    //   checkAuth();
    // }, [router]);

    const handleLogout = () => {
      localStorage.removeItem("user");
      router.push("/login");
    };

    if (isLoading) return <p>Loading...</p>;

    // if (!user) return null; // Prevent rendering until user is authenticated

    return <WrappedComponent {...props} user={user} onLogout={handleLogout} />;
  };
};

export default withAuth;
