import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fahrly – Find Your Fahrschule in Berlin",
  description: "Discover, compare, and connect with the perfect driving school in Berlin. Airbnb-style discovery for Fahrschulen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ height: '100%' }}
      suppressHydrationWarning
    >
      <body style={{ height: '100%', margin: 0 }} suppressHydrationWarning>{children}</body>
    </html>
  );
}
