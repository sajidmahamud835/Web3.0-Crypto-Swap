"use client";

import { useWallet } from "../context/WalletContext";
import CryptoSwap from "./CryptoSwap";
import { FaRocket, FaShieldAlt, FaBolt } from "react-icons/fa";

export default function HeroSection() {
    const { isConnected, connect } = useWallet();

    return (
        <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-glow" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
            </div>

            <div className="max-w-screen-xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-[var(--border)]">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                                Low Fees • Lightning Fast • Secure
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            <span className="text-[var(--text)]">Swap Crypto</span>
                            <br />
                            <span className="gradient-text">Instantly & Securely</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-[var(--text-muted)] max-w-lg">
                            Trade tokens directly from your wallet with minimal fees.
                            Connect MetaMask and swap in seconds — no sign-up required.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            {!isConnected ? (
                                <button onClick={connect} className="btn-primary text-lg px-8 py-4">
                                    <FaRocket className="inline mr-2" />
                                    Start Trading
                                </button>
                            ) : (
                                <a href="#swap" className="btn-primary text-lg px-8 py-4">
                                    <FaRocket className="inline mr-2" />
                                    Swap Now
                                </a>
                            )}
                            <a
                                href="https://github.com/sajidmahamud835/Web3.0-Crypto-Swap"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 text-lg text-[var(--text-muted)] hover:text-[var(--text)] transition-colors flex items-center gap-2"
                            >
                                Learn More →
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[var(--border)]">
                            <div>
                                <div className="text-2xl font-bold text-[var(--text)]">$2.4M+</div>
                                <div className="text-sm text-[var(--text-muted)]">Volume Traded</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-[var(--text)]">50K+</div>
                                <div className="text-sm text-[var(--text-muted)]">Transactions</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-[var(--text)]">0.1%</div>
                                <div className="text-sm text-[var(--text-muted)]">Swap Fee</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Swap Card */}
                    <div id="swap" className="flex justify-center lg:justify-end">
                        <div className="w-full max-w-md">
                            <CryptoSwap />
                        </div>
                    </div>
                </div>

                {/* Feature Pills */}
                <div className="mt-16 flex flex-wrap justify-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-[var(--border)]">
                        <FaShieldAlt className="text-indigo-500" />
                        <span className="text-[var(--text-muted)] text-sm">Non-Custodial</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-[var(--border)]">
                        <FaBolt className="text-yellow-500" />
                        <span className="text-[var(--text-muted)] text-sm">Instant Swaps</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-[var(--border)]">
                        <FaRocket className="text-emerald-500" />
                        <span className="text-[var(--text-muted)] text-sm">Multi-Chain Support</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
