import type { Metadata } from "next";
import "./globals.css";
import ClientThemeProvider from "./components/ClientThemeProvider";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "PURE MINERALS",
  description: "What Tomorrow Needs, We Find Today.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body className={`${inter.variable} antialiased flex flex-col min-h-screen`}>
        <ClientThemeProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
