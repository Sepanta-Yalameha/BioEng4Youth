import type { Metadata } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

// Display/headline font — bold, punchy, high-energy
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

// UI/body font — clean, versatile, premium
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Mono accent font
const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "McMaster Biohacks — Coming Soon",
  description:
    "McMaster's first bioengineering hackathon. Open to all. Register your interest and be the first to know.",
  openGraph: {
    title: "McMaster Biohacks",
    description: "McMaster's first bioengineering hackathon. Coming soon.",
    siteName: "McMaster Biohacks",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${plusJakartaSans.variable} ${spaceMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
