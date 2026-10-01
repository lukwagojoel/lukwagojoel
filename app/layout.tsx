import type { Metadata } from "next";
import {  Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";
import {personJsonLd} from "../components/identity";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";



const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://lukwagojoel.com"), 
  title: {
    default: "Lukwago Joel | Software Engineer, Entrepreneur & AI Enthusiast",
    template: "%s | Lukwago Joel",
  },

  description:
    "Lukwago Joel is a software engineer from Uganda specializing in React, Next.js, React Native, Node.js, TypeScript, AI, and modern web development. Entrepreneur, bodybuilder, and founder building software products.",

  keywords: [
    "Lukwago Joel",
     "Lukwago Joel Jr",
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
      "Lukwago Joel | Software Engineer, Entrepreneur",

    description:
      "Software engineer from Uganda building web, mobile and AI applications.",

    images: ["/me1.jpg"],
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
    <html lang="en" className={`${plusJakartaSans.variable} ${plusJakartaSans.className}`}>
      <body className="font-body bg-white text-black antialiased">
        
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(personJsonLd),
  }}
/>
        <div />
        <Header/>
        {children}
        <Footer/>
        
      </body>
    </html>
  );
}
