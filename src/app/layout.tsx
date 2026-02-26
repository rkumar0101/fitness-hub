import type { Metadata } from "next";
import "./globals.css";
import { BRAND } from "@/lib/constants";


export const metadata: Metadata = {
  title: `${BRAND.name} | Gym & Fitness`,
  description:
    "Fitness Hub helps you train smarter with real coaching, clean equipment, and flexible plans. Start with a free trial on WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white antialiased">{children} </body>
    </html>
  );
}