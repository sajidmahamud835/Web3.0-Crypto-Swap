"use client";

import { FaShieldAlt, FaBolt, FaCoins, FaLock, FaGlobe, FaChartLine } from "react-icons/fa";

const features = [
    {
        icon: FaBolt,
        title: "Lightning Fast",
        description: "Execute swaps in seconds with our optimized routing algorithm.",
        color: "text-yellow-400",
    },
    {
        icon: FaShieldAlt,
        title: "Secure & Safe",
        description: "Non-custodial swaps. Your keys, your crypto. Always.",
        color: "text-emerald-400",
    },
    {
        icon: FaCoins,
        title: "Low Fees",
        description: "Only 0.1% swap fee. Save more on every transaction.",
        color: "text-indigo-400",
    },
    {
        icon: FaLock,
        title: "No KYC Required",
        description: "Trade anonymously. No sign-up, no personal data collected.",
        color: "text-pink-400",
    },
    {
        icon: FaGlobe,
        title: "Multi-Chain",
        description: "Support for Ethereum, Polygon, and more chains coming soon.",
        color: "text-blue-400",
    },
    {
        icon: FaChartLine,
        title: "Best Rates",
        description: "Aggregated pricing ensures you always get the best deal.",
        color: "text-orange-400",
    },
];

export default function FeatureSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen-xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Why Choose <span className="gradient-text">CryptoSwap</span>?
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Experience the future of decentralized trading with our cutting-edge platform.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="card group hover:border-indigo-500/50 transition-all duration-300"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                                <feature.icon className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center">
                    <div className="card max-w-3xl mx-auto p-8 md:p-12 gradient-border">
                        <div className="relative z-10 bg-[#1a1a2e] rounded-xl p-8">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Ready to Start Trading?
                            </h3>
                            <p className="text-gray-400 mb-6">
                                Connect your wallet and make your first swap in under a minute.
                            </p>
                            <a
                                href="#swap"
                                className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
                            >
                                <FaBolt />
                                Start Swapping Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
