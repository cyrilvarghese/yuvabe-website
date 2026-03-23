import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yuvabe Studios",
    short_name: "Yuvabe",
    description:
      "AI-first strategy, design, engineering, and growth marketing studio for startups.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#5829c7",
    icons: [
      {
        src: "/yb.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
