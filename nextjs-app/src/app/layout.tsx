"use client";

import "./globals.css";
// import { useLocale } from "next-intl";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" bg-blue-50">{children}</body>
    </html>
  );
}
