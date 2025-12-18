import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OCPL - Only Cricket League | Vasai's Premier Cricket Tournament",
  description:
    "OCPL is the Only Cricket League played in Vasai between local players. A league for all age groups, from various walks of life who love to enjoy this beautiful game.",
  keywords: [
    "OCPL",
    "Only Cricket League",
    "Vasai Cricket",
    "Cricket Tournament",
    "Local Cricket",
    "Vasai Sports",
  ],
  authors: [{ name: "OCPL" }],
  openGraph: {
    title: "OCPL - Only Cricket League",
    description: "Vasai's Premier Cricket Tournament for all age groups",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
