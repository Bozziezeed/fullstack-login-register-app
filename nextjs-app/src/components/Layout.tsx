"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();

  useEffect(() => {
    if (pathname === `/${localActive}`) {
      router.replace(`/${localActive}/login`);
    }
  }, [pathname, localActive, router]);
  return <div> {children}</div>;
};

export default Layout;
