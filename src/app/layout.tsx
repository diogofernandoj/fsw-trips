import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { NextAuthProvider } from "./providers/auth";

import Header from "../components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FSW Trips",
  description: "Sistema para reserva de viagens online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          <Header />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
