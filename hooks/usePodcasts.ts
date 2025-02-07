"use client";

import useSWR from "swr";

export function usePodcasts() {
  const { data, error, isLoading } = useSWR("/api/podcasts", async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch podcasts");
    return res.json();
  });

  return {
    podcasts: data,
    isLoading,
    isError: error,
  };
}
