import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";
import { AgentationProvider } from "@/components/klar/agentation-provider";
import { GameStateProvider } from "@/lib/game-state";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Klar — Emergency Preparedness Training",
  description:
    "Get ready for emergencies with Denmark's interactive preparedness app",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo/icon-192.png",
    apple: "/logo/apple-touch-icon.png",
  },
  openGraph: {
    title: "Klar — Emergency Preparedness Training",
    description:
      "Get ready for emergencies with Denmark's interactive preparedness app",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Klar — Emergency preparedness for everyone",
      },
    ],
    siteName: "Klar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Klar — Emergency Preparedness Training",
    description:
      "Get ready for emergencies with Denmark's interactive preparedness app",
    images: ["/og-image.jpg"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Klar",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="app-shell relative overflow-hidden">
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
            <Image
              src="/logo/KlariconBlue.svg"
              alt=""
              width={500}
              height={500}
              className="opacity-[0.03] select-none"
              aria-hidden="true"
            />
          </div>
          <GameStateProvider>
            <div className="relative z-10">{children}</div>
          </GameStateProvider>
        </div>
        <Analytics />
        <AgentationProvider />
      </body>
    </html>
  );
}
