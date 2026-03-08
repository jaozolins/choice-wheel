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
        {/* Jungle photo background */}
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Dark overlay so text is readable */}
        <div className="fixed inset-0 -z-10 bg-black/40" />
        {children}
      </body>
    </html>
  );
}
