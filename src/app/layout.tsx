import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CultureSpace — Design With Cultural Intelligence",
    template: "%s | CultureSpace",
  },
  description:
    "Discover the cultural tastes, interests, and identities that help shape more meaningful spaces and experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
