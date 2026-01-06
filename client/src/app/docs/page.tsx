"use client";

import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { FaFileAlt, FaGithub, FaDownload } from "react-icons/fa";

export default function DocsPage() {
    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-[var(--border)] mb-6">
                            <FaFileAlt className="text-indigo-500" />
                            <span className="text-[var(--text-muted)] text-sm">Technical Documentation</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4">
                            CryptoSwap <span className="gradient-text">Whitepaper</span>
                        </h1>
                        <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
                            A comprehensive technical document detailing the architecture, smart contracts, and security analysis of the CryptoSwap protocol.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <a
                            href="https://github.com/sajidmahamud835/Web3.0-Crypto-Swap/blob/main/docs/WHITEPAPER.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary flex items-center gap-2"
                        >
                            <FaGithub />
                            View on GitHub
                        </a>
                        <a
                            href="https://github.com/sajidmahamud835/Web3.0-Crypto-Swap/raw/main/docs/WHITEPAPER.md"
                            className="px-6 py-3 rounded-xl bg-[var(--glass-light-bg)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface-light)] transition-colors flex items-center gap-2"
                        >
                            <FaDownload />
                            Download PDF
                        </a>
                    </div>

                    {/* Table of Contents */}
                    <div className="card mb-8">
                        <h2 className="text-xl font-semibold text-[var(--text)] mb-4">Table of Contents</h2>
                        <nav className="space-y-2">
                            {[
                                { id: "summary", title: "1. Executive Summary" },
                                { id: "introduction", title: "2. Introduction" },
                                { id: "problem", title: "3. Problem Statement" },
                                { id: "architecture", title: "4. Solution Architecture" },
                                { id: "smart-contract", title: "5. Smart Contract Specification" },
                                { id: "frontend", title: "6. Frontend Architecture" },
                                { id: "security", title: "7. Security Analysis" },
                                { id: "tokenomics", title: "8. Tokenomics" },
                                { id: "roadmap", title: "9. Roadmap" },
                                { id: "conclusion", title: "10. Conclusion" },
                            ].map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className="block text-[var(--text-muted)] hover:text-[var(--text)] hover:pl-2 transition-all"
                                >
                                    {item.title}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Section 1: Executive Summary */}
                    <section id="summary" className="card mb-8">
                        <h2 className="text-2xl font-bold text-[var(--text)] mb-4">1. Executive Summary</h2>
                        <p className="text-[var(--text-muted)] mb-4">
                            CryptoSwap is a <strong>non-custodial decentralized exchange (DEX)</strong> protocol that enables peer-to-peer token swaps directly from users&apos; wallets. Built on Ethereum and EVM-compatible chains, the protocol eliminates intermediaries while providing:
                        </p>
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="text-center p-4 rounded-xl glass-light">
                                <div className="text-2xl font-bold gradient-text">0.1%</div>
                                <div className="text-sm text-[var(--text-muted)]">Swap Fee</div>
                            </div>
                            <div className="text-center p-4 rounded-xl glass-light">
                                <div className="text-2xl font-bold gradient-text">&lt; 5s</div>
                                <div className="text-sm text-[var(--text-muted)]">Confirmation</div>
                            </div>
                            <div className="text-center p-4 rounded-xl glass-light">
                                <div className="text-2xl font-bold gradient-text">100%</div>
                                <div className="text-sm text-[var(--text-muted)]">Non-Custodial</div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Introduction */}
                    <section id="introduction" className="card mb-8">
                        <h2 className="text-2xl font-bold text-[var(--text)] mb-4">2. Introduction</h2>
                        <h3 className="text-lg font-semibold text-[var(--text)] mb-2">2.1 Background</h3>
                        <p className="text-[var(--text-muted)] mb-4">
                            The DeFi ecosystem has grown exponentially since 2020, with TVL exceeding $100 billion at its peak. However, many existing DEX solutions suffer from complex interfaces, high fees, and poor mobile responsiveness.
                        </p>
                        <h3 className="text-lg font-semibold text-[var(--text)] mb-2">2.2 Vision</h3>
                        <p className="text-[var(--text-muted)]">
                            CryptoSwap aims to be the most user-friendly, transparent, and cost-effective DEX. Our focus is on simplicity, transparency, security, and accessibility.
                        </p>
                    </section>

                    {/* Section 3: Problem Statement */}
                    <section id="problem" className="card mb-8">
                        <h2 className="text-2xl font-bold text-[var(--text)] mb-4">3. Problem Statement</h2>
                        <h3 className="text-lg font-semibold text-[var(--text)] mb-3">Centralized Exchange Risks</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-[var(--border)]">
                                        <th className="text-left py-2 text-[var(--text)]">Risk</th>
                                        <th className="text-left py-2 text-[var(--text)]">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[var(--text-muted)]">
                                    <tr className="border-b border-[var(--border)]">
                                        <td className="py-2">Custody</td>
                                        <td className="py-2">Users surrender private keys to exchange</td>
                                    </tr>
                                    <tr className="border-b border-[var(--border)]">
                                        <td className="py-2">Hacking</td>
                                        <td className="py-2">Centralized honeypots attract attackers</td>
                                    </tr>
                                    <tr className="border-b border-[var(--border)]">
                                        <td className="py-2">Regulatory</td>
                                        <td className="py-2">Assets can be frozen or seized</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">Privacy</td>
                                        <td className="py-2">KYC requirements expose personal data</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Section 4: Architecture */}
                    <section id="architecture" className="card mb-8">
                        <h2 className="text-2xl font-bold text-[var(--text)] mb-4">4. Solution Architecture</h2>
                        <pre className="bg-[var(--surface-light)] p-4 rounded-xl overflow-x-auto text-sm text-[var(--text-muted)]">
                            {`┌─────────────────────────────────────────────────┐
│              USER INTERFACE LAYER                │
│   Next.js 14  ·  React 18  ·  Tailwind CSS      │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│             WEB3 INTEGRATION LAYER               │
│   Ethers.js v6  ·  MetaMask  ·  WalletConnect   │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│            SMART CONTRACT LAYER                  │
│         Transactions.sol (Solidity 0.8.24)      │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│              BLOCKCHAIN LAYER                    │
│   Ethereum  ·  Sepolia  ·  Polygon  ·  Arbitrum │
└─────────────────────────────────────────────────┘`}
                        </pre>
                    </section>

                    {/* Section 5: Smart Contract */}
                    <section id="smart-contract" className="card mb-8">
                        <h2 className="text-2xl font-bold text-[var(--text)] mb-4">5. Smart Contract Specification</h2>
                        <div className="mb-4">
                            <span className="text-sm text-[var(--text-muted)]">Contract: </span>
                            <code className="text-indigo-400">Transactions.sol</code>
                            <span className="text-sm text-[var(--text-muted)] ml-4">Compiler: </span>
                            <code className="text-indigo-400">Solidity 0.8.24</code>
                        </div>
                        <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Data Structure</h3>
                        <pre className="bg-[var(--surface-light)] p-4 rounded-xl overflow-x-auto text-sm mb-4">
                            <code className="text-[var(--text-muted)]">
                                {`struct TransferStruct {
    address sender;      // Transaction initiator
    address receiver;    // Recipient address
    uint256 amount;      // Amount in wei
    string message;      // User-provided message
    uint256 timestamp;   // Block timestamp
    string keyword;      // Category keyword
}`}
                            </code>
                        </pre>
                        <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Functions</h3>
                        <ul className="space-y-2 text-[var(--text-muted)]">
                            <li className="flex items-start gap-2">
                                <code className="text-emerald-400">publishTransaction()</code>
                                <span>— Records a new swap on-chain</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <code className="text-emerald-400">getAllTransactions()</code>
                                <span>— Returns complete transaction history</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <code className="text-emerald-400">getTransactionCount()</code>
                                <span>— Returns total transaction count</span>
                            </li>
                        </ul>
                    </section>

                    {/* Section 6: Frontend */}
                    <section id="frontend" className="card mb-8">
                        <h2 className="text-2xl font-bold text-[var(--text)] mb-4">6. Frontend Architecture</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { tech: "Next.js", version: "14.2.4" },
                                { tech: "React", version: "18.3.1" },
                                { tech: "TypeScript", version: "5.7.2" },
                                { tech: "Ethers.js", version: "6.13.1" },
                            ].map((item) => (
                                <div key={item.tech} className="text-center p-3 rounded-xl glass-light">
                                    <div className="font-semibold text-[var(--text)]">{item.tech}</div>
                                    <div className="text-sm text-[var(--text-muted)]">v{item.version}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 7: Security */}
                    <section id="security" className="card mb-8">
                        <h2 className="text-2xl font-bold text-[var(--text)] mb-4">7. Security Analysis</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-[var(--border)]">
                                        <th className="text-left py-2 text-[var(--text)]">Aspect</th>
                                        <th className="text-left py-2 text-[var(--text)]">Status</th>
                                        <th className="text-left py-2 text-[var(--text)]">Notes</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[var(--text-muted)]">
                                    <tr className="border-b border-[var(--border)]">
                                        <td className="py-2">Reentrancy</td>
                                        <td className="py-2 text-emerald-400">✅ Safe</td>
                                        <td className="py-2">No external calls</td>
                                    </tr>
                                    <tr className="border-b border-[var(--border)]">
                                        <td className="py-2">Integer Overflow</td>
                                        <td className="py-2 text-emerald-400">✅ Safe</td>
                                        <td className="py-2">Solidity 0.8+ built-in checks</td>
                                    </tr>
                                    <tr className="border-b border-[var(--border)]">
                                        <td className="py-2">Access Control</td>
                                        <td className="py-2 text-yellow-400">⚠️ Open</td>
                                        <td className="py-2">Anyone can publish</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">DoS via Array</td>
                                        <td className="py-2 text-yellow-400">⚠️ Risk</td>
                                        <td className="py-2">Pagination recommended</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Section 8: Tokenomics */}
                    <section id="tokenomics" className="card mb-8">
                        <h2 className="text-2xl font-bold text-[var(--text)] mb-4">8. Tokenomics</h2>
                        <p className="text-[var(--text-muted)] mb-4">
                            CryptoSwap currently operates without a native token. Future $CSWAP token planned:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-3 rounded-xl glass-light">
                                <div className="text-lg font-bold text-[var(--text)]">40%</div>
                                <div className="text-xs text-[var(--text-muted)]">Community</div>
                            </div>
                            <div className="text-center p-3 rounded-xl glass-light">
                                <div className="text-lg font-bold text-[var(--text)]">25%</div>
                                <div className="text-xs text-[var(--text-muted)]">Team</div>
                            </div>
                            <div className="text-center p-3 rounded-xl glass-light">
                                <div className="text-lg font-bold text-[var(--text)]">20%</div>
                                <div className="text-xs text-[var(--text-muted)]">Liquidity</div>
                            </div>
                            <div className="text-center p-3 rounded-xl glass-light">
                                <div className="text-lg font-bold text-[var(--text)]">15%</div>
                                <div className="text-xs text-[var(--text-muted)]">Marketing</div>
                            </div>
                        </div>
                    </section>

                    {/* Section 9: Roadmap */}
                    <section id="roadmap" className="card mb-8">
                        <h2 className="text-2xl font-bold text-[var(--text)] mb-4">9. Roadmap</h2>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl glass-light border-l-4 border-emerald-500">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-emerald-400">✅</span>
                                    <span className="font-semibold text-[var(--text)]">Phase 1: Foundation</span>
                                </div>
                                <p className="text-sm text-[var(--text-muted)]">MetaMask integration, swap interface, dashboard, dark/light themes</p>
                            </div>
                            <div className="p-4 rounded-xl glass-light border-l-4 border-blue-500">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-blue-400">🔄</span>
                                    <span className="font-semibold text-[var(--text)]">Phase 2: Enhancement (Q2 2026)</span>
                                </div>
                                <p className="text-sm text-[var(--text-muted)]">WalletConnect, multi-chain, limit orders, price charts</p>
                            </div>
                            <div className="p-4 rounded-xl glass-light border-l-4 border-purple-500">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-purple-400">⏳</span>
                                    <span className="font-semibold text-[var(--text)]">Phase 3: DeFi Expansion (Q3 2026)</span>
                                </div>
                                <p className="text-sm text-[var(--text-muted)]">Liquidity pools, yield farming, $CSWAP token, DAO</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 10: Conclusion */}
                    <section id="conclusion" className="card mb-8">
                        <h2 className="text-2xl font-bold text-[var(--text)] mb-4">10. Conclusion</h2>
                        <p className="text-[var(--text-muted)]">
                            CryptoSwap represents a significant step forward in DEX usability and accessibility. By combining modern web technologies, robust smart contracts, user-centric design, and security-first architecture, we deliver a platform that meets the needs of both crypto newcomers and experienced traders.
                        </p>
                        <div className="mt-6 text-center">
                            <a href="https://github.com/sajidmahamud835/Web3.0-Crypto-Swap" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                                <FaGithub />
                                View Source Code
                            </a>
                        </div>
                    </section>

                </div>
            </div>

            <FooterSection />
        </main>
    );
}
