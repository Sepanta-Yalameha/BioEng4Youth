import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display - geometric grotesque, sentence-case-friendly, more distinctive than the
// overused Bebas Neue. Used for headlines and section titles.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

// Body - neutral grotesque, broad weight range, reads cleanly at every size.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Mono - engineered terminal labels, eyebrows, ticker copy, data values.
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "BioHacks - BioEng4Youth",
  description:
    "BioEng4Youth's bioengineering hackathon at McMaster University. Apply your science or engineering knowledge to a real neurological health challenge.",
  openGraph: {
    title: "BioHacks by BioEng4Youth",
    description: "Where science meets engineering. One neuro case. Infinite solutions.",
    siteName: "BioHacks",
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
