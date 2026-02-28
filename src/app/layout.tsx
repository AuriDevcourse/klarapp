import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AgentationProvider } from "@/components/klar/agentation-provider";
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
    icon: "/logo/KlariconBlue.svg",
    apple: "/logo/KlariconBlue.svg",
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
  themeColor: "#1e3a5f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="app-shell">{children}</div>
        <AgentationProvider />
      </body>
    </html>
  );
}
