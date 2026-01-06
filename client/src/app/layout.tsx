import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "./context/WalletContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "CryptoSwap | Decentralized Token Exchange",
    description: "Swap cryptocurrencies instantly with low fees. Connect your MetaMask wallet and trade tokens securely on the blockchain.",
    keywords: "crypto swap, DEX, decentralized exchange, MetaMask, Ethereum, token swap",
    openGraph: {
        title: "CryptoSwap | Decentralized Token Exchange",
        description: "Swap cryptocurrencies instantly with low fees.",
        type: "website",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} bg-[#0f0f1a] text-white antialiased`}>
                <WalletProvider>
                    {children}
                </WalletProvider>
            </body>
        </html>
    );
}
