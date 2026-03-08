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
      <body className="min-h-screen text-white relative overflow-x-hidden">
        {/* Tropical jungle background */}
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1440342359743-84fcb8c21c7c?auto=format&fit=crop&w=1920&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Dark overlay so text is readable */}
        <div className="fixed inset-0 -z-10 bg-black/50" />
        {children}
      </body>
    </html>
  );
}
