import type { Metadata } from "next";
import "./globals.css";
import ClientThemeProvider from "./components/ClientThemeProvider";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Pure Minerals | Geological Exploration & Mining",
  description: "What Tomorrow Needs, We Find Today. Norwegian exploration company focused on sustainable mineral development in Trøndelag.",
  keywords: "mining, exploration, minerals, Norway, Trøndelag, copper, zinc, gold, silver, geological",
  openGraph: {
    title: "Pure Minerals | Geological Exploration & Mining",
    description: "What Tomorrow Needs, We Find Today. Norwegian exploration company focused on sustainable mineral development.",
    type: "website",
  },
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">
        <ClientThemeProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
