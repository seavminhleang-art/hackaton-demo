import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Found Cambodia — Lost & Found Community",
  description:
    "A little kindness goes a long way. Find what’s missing or help something find its way home.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col type-scale">{children}</body>
    </html>
  );
}
