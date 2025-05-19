import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/sidebar-provider";
import { Sidebar } from "@/components/sidebar";
import { ReduxProvider } from "@/lib/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Delivery Management System",
  description: "A modern delivery management dashboard",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          <SidebarProvider>
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex-1 overflow-auto">{children}</div>
            </div>
          </SidebarProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
