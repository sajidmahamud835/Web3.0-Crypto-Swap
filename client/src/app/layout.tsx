import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "./context/WalletContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "CryptoSwap | Decentralized Token Exchange",
        template: "%s | CryptoSwap",
    },
    description:
        "Swap cryptocurrencies instantly with low fees. Connect your MetaMask wallet and trade tokens securely on the blockchain. Non-custodial DEX with 0.1% swap fee.",
    keywords: [
        "crypto swap",
        "DEX",
        "decentralized exchange",
        "MetaMask",
        "Ethereum",
        "token swap",
        "DeFi",
        "Web3",
        "cryptocurrency",
        "blockchain",
        "non-custodial",
    ],
    authors: [{ name: "Sajid Mahamud", url: "https://github.com/sajidmahamud835" }],
    creator: "Sajid Mahamud",
    publisher: "CryptoSwap",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://crypto-swap-dex.vercel.app",
        siteName: "CryptoSwap",
        title: "CryptoSwap | Decentralized Token Exchange",
        description:
            "Swap cryptocurrencies instantly with low fees. Non-custodial DEX powered by Ethereum.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "CryptoSwap - Decentralized Token Exchange",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "CryptoSwap | Decentralized Token Exchange",
        description:
            "Swap cryptocurrencies instantly with low fees. Non-custodial DEX powered by Ethereum.",
        images: ["/og-image.png"],
        creator: "@sajidmahamud835",
    },
    icons: {
        icon: "/icon.png",
        shortcut: "/icon.png",
        apple: "/icon.png",
    },
    manifest: "/manifest.json",
    metadataBase: new URL("https://crypto-swap-dex.vercel.app"),
};

import { Toaster } from "react-hot-toast";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body
                className={`${inter.className} bg-[var(--background)] text-[var(--text)] antialiased transition-colors duration-300`}
            >
                <WalletProvider>
                    {children}
                    <Toaster position="bottom-right" toastOptions={{
                        style: {
                            background: '#333',
                            color: '#fff',
                        },
                    }} />
                </WalletProvider>
            </body>
        </html>
    );
}
