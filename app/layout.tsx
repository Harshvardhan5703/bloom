import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { ResumeProvider } from "@/context/ResumeContext";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BLOOM",
  description: "Meet, collaborate, and keep conversations moving with Bloom.",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark-2`}>
        <AuthProvider>
          <ResumeProvider>
            {children}
            <Toaster />
          </ResumeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
