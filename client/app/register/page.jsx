"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const registerUser = async () => {
      if (!isLoaded || !user) return;

      try {
        await fetch("http://localhost:5000/register", { // <-- Replace with your actual Flask backend URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkUserId: user.id,
            name: user.fullName,
            email: user.emailAddresses[0]?.emailAddress,
          }),
        });

        router.push("/"); // Redirect to main page
      } catch (err) {
        console.error("Error registering user:", err);
      }
    };

    registerUser();
  }, [user, isLoaded, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Registering user...</p>
    </div>
  );
};

export default Page;
