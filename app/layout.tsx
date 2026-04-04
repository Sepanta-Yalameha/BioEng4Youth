import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display/headline — variable weight, editorial, distinctive. Not generic.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Body/UI — geometric, clean, highly legible at all sizes
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

// Mono — labels, eyebrows, data
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "BioHacks — BioEng4Youth",
  description:
    "BioEng4Youth's bioengineering hackathon at the University of Toronto. Apply your science or engineering knowledge to a real neurological health challenge.",
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
      className={`${bricolage.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
