"use client"

import { useEffect, useState } from "react";

export function useToken() {
  const [accesstoken, setAccesstoken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setAccesstoken(storedToken);
    setIsLoading(false);
  }, []);

  return { accesstoken, isLoading };
}
