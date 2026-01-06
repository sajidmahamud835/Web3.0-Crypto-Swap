"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSun, FaMoon, FaWallet, FaSignOutAlt } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useWallet } from "../context/WalletContext";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const {
        isConnected,
        isConnecting,
        formattedAddress,
        balance,
        networkName,
        connect,
        disconnect,
        error
    } = useWallet();

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setIsDarkMode(savedTheme === "dark");
            document.documentElement.classList.toggle("dark", savedTheme === "dark");
        } else {
            // Default to dark mode
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleDarkMode = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle("dark", !isDarkMode);
        localStorage.setItem("theme", newTheme);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleConnect = async () => {
        await connect();
    };

    return (
        <nav className="sticky top-0 z-50 glass border-b border-white/10">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <Link href="/">
                    <span className="flex items-center space-x-3 cursor-pointer group">
                        <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">C</span>
                        </div>
                        <span className="self-center text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                            CryptoSwap
                        </span>
                    </span>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-400 rounded-lg md:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                    aria-controls="navbar-default"
                    aria-expanded={isOpen ? "true" : "false"}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>

                {/* Navigation */}
                <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-6 md:mt-0 items-center gap-4 md:gap-6">
                        {/* Swap Link */}
                        <li>
                            <Link href="/swap">
                                <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                                    Swap
                                </span>
                            </Link>
                        </li>

                        {/* Dashboard Link */}
                        <li>
                            <Link href="/dashboard">
                                <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                                    Dashboard
                                </span>
                            </Link>
                        </li>

                        {/* Docs Link */}
                        <li>
                            <a
                                href="https://github.com/sajidmahamud835/Web3.0-Crypto-Swap"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                            >
                                Docs
                                <HiOutlineExternalLink className="w-4 h-4" />
                            </a>
                        </li>

                        {/* Theme Toggle */}
                        <li>
                            <button
                                onClick={toggleDarkMode}
                                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
                                aria-label="Toggle theme"
                            >
                                {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                            </button>
                        </li>

                        {/* Wallet Button */}
                        <li>
                            {isConnected ? (
                                <div className="flex items-center gap-2">
                                    {/* Network Badge */}
                                    <span className="hidden lg:block px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                                        {networkName}
                                    </span>

                                    {/* Wallet Info */}
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20">
                                        <FaWallet className="text-indigo-400" />
                                        <div className="text-sm">
                                            <span className="text-white font-medium">{formattedAddress}</span>
                                            <span className="text-gray-400 ml-2 hidden sm:inline">
                                                {parseFloat(balance).toFixed(4)} ETH
                                            </span>
                                        </div>
                                    </div>

                                    {/* Disconnect Button */}
                                    <button
                                        onClick={disconnect}
                                        className="p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all"
                                        aria-label="Disconnect wallet"
                                    >
                                        <FaSignOutAlt size={16} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleConnect}
                                    disabled={isConnecting}
                                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaWallet />
                                    {isConnecting ? "Connecting..." : "Connect Wallet"}
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>

            {/* Error Toast */}
            {error && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-red-500/90 text-white rounded-lg text-sm">
                    {error}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
