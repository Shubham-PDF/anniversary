import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Great_Vibes, Bubblegum_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-cursive",
  weight: ["400"],
});

const bubblegum = Bubblegum_Sans({
  subsets: ["latin"],
  variable: "--font-balloon",
  weight: ["400"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Sanjay & Sangita's Silver Jubilee Celebration | 25 Years",
  description: "Join us in celebrating the 25th wedding anniversary of Sanjay & Sangita. 30th June 2026 at Raunak Hotel, Pinjore. RSVP today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${inter.variable} ${greatVibes.variable} ${bubblegum.variable} font-body antialiased paper-overlay`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
