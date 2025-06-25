import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {LanguageProvider} from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Colaborativa | EcoDev",
  description: "Empowering Latinx immigrants in Greater Boston for 35+ years, La Colaborativa enhances social and economic " +
      "health and supports vulnerable community members",
  icons: {
    icon: [
        { url: "/logo.svg", type: "image/svg+xml" }    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <LanguageProvider>
        {children}
      </LanguageProvider>

      </body>
    </html>
  );
}
