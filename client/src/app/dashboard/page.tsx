"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { useWallet } from "../context/WalletContext";
import { FaExchangeAlt, FaExternalLinkAlt, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

// Mock transaction data
const mockTransactions = [
    {
        id: "0x1234...5678",
        from: { token: "ETH", amount: 1.5, icon: "/cryptos/eth.svg" },
        to: { token: "USDT", amount: 3600, icon: "/cryptos/usdt.svg" },
        status: "completed",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        txHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f",
    },
    {
        id: "0x2345...6789",
        from: { token: "USDT", amount: 1000, icon: "/cryptos/usdt.svg" },
        to: { token: "WBTC", amount: 0.024, icon: "/cryptos/wbtc.svg" },
        status: "completed",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        txHash: "0x8a7d35Cc6634C0532925a3b844Bc9e7595f",
    },
    {
        id: "0x3456...7890",
        from: { token: "ETH", amount: 0.5, icon: "/cryptos/eth.svg" },
        to: { token: "USDC", amount: 1200, icon: "/cryptos/usdc.svg" },
        status: "pending",
        timestamp: new Date(Date.now() - 300000).toISOString(),
        txHash: "0x9b7d35Cc6634C0532925a3b844Bc9e7595f",
    },
];

const statusIcons = {
    completed: <FaCheckCircle className="text-emerald-400" />,
    pending: <FaClock className="text-yellow-400 animate-pulse" />,
    failed: <FaTimesCircle className="text-red-400" />,
};

const statusColors = {
    completed: "bg-emerald-500/20 text-emerald-400",
    pending: "bg-yellow-500/20 text-yellow-400",
    failed: "bg-red-500/20 text-red-400",
};

export default function DashboardPage() {
    const { isConnected, connect, formattedAddress, balance, networkName } = useWallet();
    const [transactions] = useState(mockTransactions);

    if (!isConnected) {
        return (
            <main className="min-h-screen flex flex-col">
                <Navbar />

                <div className="flex-1 flex items-center justify-center py-12 px-4">
                    <div className="card max-w-md text-center p-8">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                            <FaExchangeAlt className="text-3xl text-indigo-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
                        <p className="text-gray-400 mb-6">
                            Connect your wallet to view your transaction history and portfolio.
                        </p>
                        <button onClick={connect} className="btn-primary w-full py-4">
                            Connect Wallet
                        </button>
                    </div>
                </div>

                <FooterSection />
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 py-12 px-4">
                <div className="max-w-screen-xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                        <p className="text-gray-400">View your transactions and portfolio</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="card">
                            <span className="text-sm text-gray-400">Wallet</span>
                            <div className="text-xl font-bold text-white mt-1">{formattedAddress}</div>
                            <span className="text-sm text-gray-500">{networkName}</span>
                        </div>
                        <div className="card">
                            <span className="text-sm text-gray-400">Balance</span>
                            <div className="text-xl font-bold text-white mt-1">{parseFloat(balance).toFixed(4)} ETH</div>
                            <span className="text-sm text-gray-500">≈ ${(parseFloat(balance) * 2400).toLocaleString()}</span>
                        </div>
                        <div className="card">
                            <span className="text-sm text-gray-400">Total Swaps</span>
                            <div className="text-xl font-bold text-white mt-1">{transactions.length}</div>
                            <span className="text-sm text-gray-500">All time</span>
                        </div>
                    </div>

                    {/* Transactions */}
                    <div className="card">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
                            <span className="text-sm text-gray-400">{transactions.length} transactions</span>
                        </div>

                        {transactions.length === 0 ? (
                            <div className="text-center py-12">
                                <FaExchangeAlt className="text-4xl text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">No transactions yet</p>
                                <a href="/swap" className="text-indigo-400 hover:text-indigo-300 mt-2 inline-block">
                                    Make your first swap →
                                </a>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {transactions.map((tx) => (
                                    <div
                                        key={tx.id}
                                        className="p-4 rounded-xl glass-light flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                    >
                                        {/* Swap Info */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center">
                                                <img src={tx.from.icon} alt={tx.from.token} className="w-8 h-8" />
                                                <span className="mx-2 text-gray-500">→</span>
                                                <img src={tx.to.icon} alt={tx.to.token} className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <div className="text-white font-medium">
                                                    {tx.from.amount} {tx.from.token} → {tx.to.amount} {tx.to.token}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {new Date(tx.timestamp).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status & Actions */}
                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${statusColors[tx.status]}`}>
                                                {statusIcons[tx.status]}
                                                {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                            </span>
                                            <a
                                                href={`https://etherscan.io/tx/${tx.txHash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                                title="View on Etherscan"
                                            >
                                                <FaExternalLinkAlt />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <FooterSection />
        </main>
    );
}
