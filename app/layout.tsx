import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

import { siteMetadataBase } from "@/lib/site";

const gilroy = localFont({
  src: [
    {
      path: "../public/fonts/gilroy/Gilroy-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-RegularItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-gilroy",
  display: "swap",
});

const clashDisplay = localFont({
  src: [
    {
      path: "../public/fonts/clash-display/ClashDisplayLight.woff2",
      weight: "300",
    },
    {
      path: "../public/fonts/clash-display/ClashDisplayRegular.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/clash-display/ClashDisplayMedium.woff2",
      weight: "500",
    },
    {
      path: "../public/fonts/clash-display/ClashDisplaySemibold.woff2",
      weight: "600",
    },
    {
      path: "../public/fonts/clash-display/ClashDisplayBold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-clash",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteMetadataBase,
  title: "Yuvabe Studios",
  description:
    "AI-first strategy, design, engineering, and growth marketing studio for startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gilroy.variable} ${clashDisplay.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
