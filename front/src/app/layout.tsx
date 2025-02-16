import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MegaMeet",
  description: "application to facilitate your connectivity with the world",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="layout_container">
          <header className="header">
            <Navbar />
          </header>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
