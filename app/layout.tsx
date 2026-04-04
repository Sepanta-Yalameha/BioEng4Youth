import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Semi_Condensed, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

// Display — tall condensed all-caps, high-impact hero moments (HackMIT-level energy)
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

// Body/headings — slightly condensed grotesque, engineered, fast, legible at all sizes
const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Mono — retro digital terminal labels, eyebrows, data
const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: "400",
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
      className={`${bebasNeue.variable} ${barlowSemiCondensed.variable} ${shareTechMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
