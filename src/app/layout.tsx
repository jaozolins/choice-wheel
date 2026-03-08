import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Choice Wheel",
  description: "Spin the wheel to make a choice!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white">
        {children}
      </body>
    </html>
  );
}
