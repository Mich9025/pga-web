"use client";

import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import { Button } from "./ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button variant="outline" size="sm" onClick={() => router.back()}>
      Volver <LuArrowLeft className="inline-block size-4 opacity-40 ml-3" />
    </Button>
  );
}
