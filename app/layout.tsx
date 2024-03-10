import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { config } from "@/lib/config";
import WagmiProviderConfig from "@/lib/wagmi-provider";
import { Navbar } from "@/components/Navbar";
import { Web3InfoProvider } from "@/context/Web3InfoProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProviderConfig initialState={initialState}>
          <Web3InfoProvider>
            <Navbar />
            {children}
          </Web3InfoProvider>
        </WagmiProviderConfig>
      </body>
    </html>
  );
}
