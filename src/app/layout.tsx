import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gunnar Finkeldeh | Photography",
  description: "London-based photographer capturing the energy of streets, the beauty of architecture, and the wonder of travel.",
  keywords: ["photography", "travel photography", "street photography", "architecture photography", "London photographer"],
  openGraph: {
    title: "Gunnar Finkeldeh | Photography",
    description: "London-based photographer capturing the energy of streets, the beauty of architecture, and the wonder of travel.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable + " " + playfair.variable + " antialiased min-h-screen flex flex-col"}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
