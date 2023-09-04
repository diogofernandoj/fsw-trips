import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { NextAuthProvider } from "./providers/auth";

import Header from "../components/Header";
import Footer from "@/components/Footer";
import ToastProvider from "./providers/toast";

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
          <ToastProvider>
            <div className="flex flex-col h-screen">
              <div className="h-[80px]">
                <Header />
              </div>
              <div className="flex-1">{children}</div>
              <div className="h-[80px]">
                <Footer />
              </div>
            </div>
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
