"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Market() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/user/market/today-market");
  }, [router]);

  return null;
}

