import type { Metadata } from "next";
import "./globals.css";
import { BRAND } from "@/lib/constants";


export const metadata: Metadata = {
  title: `${BRAND.name} | Gym & Fitness`,
  description:
    "Samz Fitness Hub has four gym branches across Siliguri with membership plans, personal training, and morning-evening training slots.",
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
