import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { ResumeProvider } from "@/context/ResumeContext";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BLOOM",
  description: "Take interviews with AI.",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
