"use client";

import Link from "next/link";
import { FaGithub, FaTwitter, FaDiscord, FaTelegram } from "react-icons/fa";

const links = {
    Product: [
        { name: "Swap", href: "/swap" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Documentation", href: "https://github.com/sajidmahamud835/Web3.0-Crypto-Swap" },
    ],
    Resources: [
        { name: "GitHub", href: "https://github.com/sajidmahamud835/Web3.0-Crypto-Swap" },
        { name: "FAQ", href: "#" },
        { name: "Support", href: "#" },
    ],
    Legal: [
        { name: "Terms of Service", href: "#" },
        { name: "Privacy Policy", href: "#" },
    ],
};

const socials = [
    { icon: FaGithub, href: "https://github.com/sajidmahamud835", label: "GitHub" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaDiscord, href: "#", label: "Discord" },
    { icon: FaTelegram, href: "#", label: "Telegram" },
];

export default function FooterSection() {
    return (
        <footer className="border-t border-white/10 bg-[#0a0a14]">
            <div className="max-w-screen-xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/">
                            <span className="flex items-center space-x-3 cursor-pointer group mb-4">
                                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">C</span>
                                </div>
                                <span className="text-xl font-bold text-white">CryptoSwap</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm mb-4">
                            Decentralized token exchange built for the future of finance.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="text-lg" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(links).map(([category, items]) => (
                        <div key={category}>
                            <h4 className="text-white font-semibold mb-4">{category}</h4>
                            <ul className="space-y-2">
                                {items.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.href}
                                            className="text-gray-400 hover:text-white transition-colors text-sm"
                                            target={item.href.startsWith("http") ? "_blank" : undefined}
                                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} CryptoSwap. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-sm">
                        Built by{" "}
                        <a
                            href="https://github.com/sajidmahamud835"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:text-indigo-300"
                        >
                            Sajid Mahamud
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
