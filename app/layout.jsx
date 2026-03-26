import "@styles/globals.css";
import React, { Suspense } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://rashnor.com"),
  title: "Rasheed Nour - Full Stack Developer Portfolio",
  description:
    "Full Stack Developer, Designer, and former Architect. Explore my interactive 3D portfolio showcasing projects and skills.",
  openGraph: {
    title: "Rasheed Nour - Full Stack Developer",
    description:
      "Interactive 3D portfolio built with Next.js and Three.js",
    url: "https://rashnor.com",
    siteName: "rashnor.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rasheed Nour - Full Stack Developer",
    description:
      "Interactive 3D portfolio built with Next.js and Three.js",
  },
  robots: { index: true, follow: true },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/3d/world.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
