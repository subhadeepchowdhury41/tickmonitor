import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import SnackbarProvider from "@/lib/context/SnackbarContext";
import { UserProvider } from "@/contexts/UserContext";
import { DomainProvider } from "@/contexts/DomainContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tick Monitor",
  description: "Tick tick tick!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SnackbarProvider>
          <AuthProvider>
            <DomainProvider>
              <UserProvider>{children}</UserProvider>
            </DomainProvider>
          </AuthProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
