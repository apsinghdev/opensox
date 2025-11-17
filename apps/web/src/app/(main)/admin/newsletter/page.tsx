"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NewsletterAdmin from "./_components/NewsAdmin";

const TEAM_EMAILS = [
  "ajeet@opensox.ai",
  "team@opensox.ai",
];


export default function NewsletterAdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Your auth check here
    const userEmail = "ajeet@opensox.ai"; // Replace with actual auth
    
    if (!TEAM_EMAILS.includes(userEmail)) {
      router.push("/dashboard");
      return;
    }
    
    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return <div>Loading...</div>;
  }

  return <NewsletterAdmin />;
}