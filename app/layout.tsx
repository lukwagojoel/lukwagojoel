import type { Metadata } from "next";
import { Bebas_Neue, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import {personJsonLd} from "../components/identity";
import CustomCursor from "@/components/cusor";
import { Header } from "@/components/kprstyle/Header";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lukwagojoel.com"), // change to your domain

  title: {
    default: "Lukwago Joel | Software Engineer, Entrepreneur & AI Enthusiast",
    template: "%s | Lukwago Joel",
  },

  description:
    "Lukwago Joel is a software engineer from Uganda specializing in React, Next.js, React Native, Node.js, TypeScript, AI, and modern web development. Entrepreneur, bodybuilder, and founder building software products.",

  keywords: [
    "Lukwago Joel Jr",
    "Lukwago Joel",
    "Joel Lukwago",
    "Software Engineer",
    "React",
    "Next.js",
    "React Native",
    "Node.js",
    "TypeScript",
    "Artificial Intelligence",
    "Uganda",
  ],

  authors: [
    {
      name: "Lukwago Joel",
      url: "https://lukwagojoel.com",
    },
  ],

  creator: "Lukwago Joel",

  publisher: "Lukwago Joel",

  alternates: {
    canonical: "https://lukwagojoel.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lukwagojoel.com",

    title:
      "Lukwago Joel | Software Engineer, Entrepreneur & AI Enthusiast",

    description:
      "Software engineer from Uganda building web, mobile, and AI applications using React, Next.js, React Native, Node.js and TypeScript.",

    siteName: "Lukwago Joel",

    images: [
      {
        url: "/me1.jpg",
        width: 1200,
        height: 630,
        alt: "Lukwago Joel",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Lukwago Joel | Software Engineer, Entrepreneur & AI Enthusiast",

    description:
      "Software engineer from Uganda building web, mobile and AI applications.",

    images: ["/me.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable} ${plex.variable}`}>
      <body className="font-body bg-carbon text-bone antialiased">
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(personJsonLd),
  }}
/>
        <div />
        <Header/>
        {children}
        
      </body>
    </html>
  );
}
