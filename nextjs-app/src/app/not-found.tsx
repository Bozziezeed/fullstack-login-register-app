"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Custom404() {
  const router = useRouter();
  const pathname = usePathname();
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (pathname === `/en` || pathname === "/th") {
      router.replace(`${pathname}/login`);
    } else {
      setRender(true);
    }
  }, [router, pathname]);

  if (render) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        404 : PAGE NOT FOUND
      </div>
    );
  }
}
