import Navbar from "../components/Navbar";
import CryptoSwap from "../components/CryptoSwap";
import FooterSection from "../components/FooterSection";

export const metadata = {
    title: "Swap | CryptoSwap",
    description: "Swap tokens instantly with low fees on CryptoSwap DEX.",
};

export default function SwapPage() {
    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 py-12 px-4">
                <div className="max-w-screen-xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Swap Tokens</h1>
                        <p className="text-gray-400">Trade tokens instantly with the best rates</p>
                    </div>

                    {/* Swap Card */}
                    <div className="flex justify-center">
                        <CryptoSwap />
                    </div>
                </div>
            </div>

            <FooterSection />
        </main>
    );
}
