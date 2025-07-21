import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {LanguageProvider} from "@/context/LanguageContext";
import { Analytics } from '@vercel/analytics/react';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Colaborativa | Economic Development",
  description: "Empowering Latinx immigrants in Greater Boston for 35+ years, La Colaborativa enhances social and economic " +
      "health and supports vulnerable community members",
  icons: {
    icon: [
        { url: "/mini_logo.png", type: "image/png" }    ]
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
          <Analytics/>
      </LanguageProvider>

      </body>
    </html>
  );
}
