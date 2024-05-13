import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";
import { constructMetadata } from "@/lib/utils";

const nunito = Nunito({ subsets: ["latin"], weight: "400" });

export const metadata = constructMetadata();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={nunito.className}>
                <Navbar />
                <main className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
                    <div className="flex flex-1 flex-col h-full">
                        <Providers>{children}</Providers>
                    </div>
                    <Footer />
                </main>
                <Toaster />
            </body>
        </html>
    );
}
