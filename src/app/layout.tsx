import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jungle Choice Wheel",
  description: "Spin the jungle wheel to make a choice!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white relative overflow-x-hidden">
        {/* Jungle background */}
        <div
          className="fixed inset-0 -z-10"
          style={{
            background: "linear-gradient(180deg, #0b3d0b 0%, #1a5c1a 30%, #2d7a2d 60%, #1a4a1a 100%)",
          }}
        />
        {/* Leaf/vine overlay pattern */}
        <div
          className="fixed inset-0 -z-10 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q35 15 30 25 Q25 15 30 5Z' fill='%23228B22'/%3E%3Cpath d='M10 30 Q20 25 25 35 Q15 35 10 30Z' fill='%23006400'/%3E%3Cpath d='M45 40 Q50 30 55 40 Q50 45 45 40Z' fill='%23228B22'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
        {children}
      </body>
    </html>
  );
}
