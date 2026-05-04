import type { Metadata } from "next";
import "./globals.css";
import { BRAND } from "@/lib/constants";


export const metadata: Metadata = {
  metadataBase: new URL("https://samzfitnesshub.com"),
  title: {
    default: `${BRAND.name} | Gyms in Siliguri`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Samz Fitness Hub offers area-wise gym memberships, personal training, and morning-evening training slots across Siliguri.",
  keywords: [
    "Samz Fitness Hub",
    "gym in Siliguri",
    "Siliguri fitness",
    "Laketown gym",
    "Haiderpara gym",
    "Arabinda Pally gym",
    "personal training Siliguri",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${BRAND.name} | Gyms in Siliguri`,
    description:
      "Area-wise memberships, PT support, and morning-evening training slots across Siliguri.",
    url: "/",
    siteName: BRAND.name,
    images: [
      {
        url: "/samz-fitness-hub.jpeg",
        width: 900,
        height: 720,
        alt: `${BRAND.name} logo`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | Gyms in Siliguri`,
    description:
      "Area-wise memberships, PT support, and morning-evening training slots across Siliguri.",
    images: ["/samz-fitness-hub.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: BRAND.name,
    telephone: "+91 9832589366",
    email: BRAND.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "12, Premendra Mitra Sarani, Ward 23, Arabinda Pally",
      addressLocality: "Siliguri",
      addressRegion: "West Bengal",
      postalCode: "734006",
      addressCountry: "IN",
    },
    areaServed: ["Laketown", "Haiderpara", "Arabinda Pally", "Siliguri"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "06:00",
        closes: "22:00",
      },
    ],
  };

  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body className="min-h-dvh bg-white antialiased" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('samz-theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=d?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
