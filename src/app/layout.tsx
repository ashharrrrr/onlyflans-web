import type { Metadata } from "next";
import { Hanken_Grotesk, Inter } from "next/font/google"

import "./globals.css";
import { QueryProvider } from "@/lib/queryProvider";
import { Toaster } from "@/components/ui/sonner";

const headingFont = Hanken_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
})

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "OnlyFlans",
  description: "A place for flan videos.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <QueryProvider>
          {children}
        </QueryProvider>

        <Toaster />
      </body>
    </html>
  );
}
