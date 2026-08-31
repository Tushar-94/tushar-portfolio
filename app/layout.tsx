import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({

  variable: "--font-geist-sans",

  subsets: ["latin"],

});

const geistMono = Geist_Mono({

  variable: "--font-geist-mono",

  subsets: ["latin"],

});

export const metadata: Metadata = {

  title: {

    default: "Tushar Rao | Applied AI Engineer",

    template: "%s | Tushar Rao",

  },

  description:

    "Applied AI Engineer building production systems across Generative AI, Machine Learning, and Computer Vision.",

};

export default function RootLayout({ children }: LayoutProps<"/">) {

  return (

    <html

      lang="en"

      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}

    >

      <body className="min-h-full">{children}</body>

    </html>

  );

}