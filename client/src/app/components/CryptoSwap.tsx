"use client";

import * as React from "react";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaAngleDown, FaCog } from "react-icons/fa";
import { useWallet } from "../context/WalletContext";
import data from "../data/cryptos.json";
import SearchCrypto from "./SearchCrypto";
import { toast } from "react-hot-toast";

interface Token {
    token: string;
    icon: string;
    price: number;
}

const CryptoSwapContent = () => {
    const [isOpenFirstToken, setIsOpenFirstToken] = useState(false);
    const [isOpenSecondToken, setIsOpenSecondToken] = useState(false);
    const [isSwapping, setIsSwapping] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [slippage, setSlippage] = useState(0.5);

    const searchParams = useSearchParams();
    const firstTokenParam = searchParams.get("firstToken");
    const secondTokenParam = searchParams.get("secondToken");

    const { isConnected, connect, formattedAddress } = useWallet();

    const [firstToken, setFirstToken] = useState<Token>(() => {
        const storedTokenName = firstTokenParam || "";
        const storedToken = data.find((item) => item.token.includes(storedTokenName));
        return storedToken || { token: "ETH", icon: "./cryptos/eth.svg", price: 2400 };
    });

    const [secondToken, setSecondToken] = useState<Token>(() => {
        const storedTokenName = secondTokenParam || "";
        if (storedTokenName === "") return { token: "USDT", icon: "./cryptos/usdt.svg", price: 1 };
        const storedToken = data.find((item) => item.token.includes(storedTokenName));
        return storedToken || { token: "USDT", icon: "./cryptos/usdt.svg", price: 1 };
    });

    const [firstValue, setFirstValue] = useState(0);
    const [secondValue, setSecondValue] = useState(0);

    const firstTokenRef = useRef<HTMLInputElement>(null);
    const secondTokenRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (firstTokenParam && secondTokenParam) {
            const newFirstToken = data.find((item) => item.token.includes(firstTokenParam));
            if (newFirstToken) setFirstToken(newFirstToken);
            const newSecondToken = data.find((item) => item.token.includes(secondTokenParam));
            if (newSecondToken) setSecondToken(newSecondToken);
        }
    }, [firstTokenParam, secondTokenParam]);

    const onClose = () => {
        setIsOpenFirstToken(false);
        setIsOpenSecondToken(false);
    };

    const setFToken = (token: string, icon: string, price: number) => {
        setFirstToken({ token, icon, price });
        setFirstValue(Number((secondValue * secondToken.price / price).toFixed(6)));
        onClose();
    };

    const setSToken = (token: string, icon: string, price: number) => {
        setSecondToken({ token, icon, price });
        setSecondValue(Number((firstValue * firstToken.price / price).toFixed(6)));
        onClose();
    };

    const onChangeFirstToken = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setFirstValue(value);
        setSecondValue(Number((value * firstToken.price / secondToken.price).toFixed(6)));
    };

    const onChangeSecondToken = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setSecondValue(value);
        setFirstValue(Number((value * secondToken.price / firstToken.price).toFixed(6)));
    };

    const changeToken = () => {
        const tempToken = firstToken;
        const tempValue = firstValue;
        setFirstToken(secondToken);
        setFirstValue(secondValue);
        setSecondToken(tempToken);
        setSecondValue(tempValue);
    };

    const handleSwap = async () => {
        if (!isConnected) {
            await connect();
            return;
        }

        setIsSwapping(true);

        // Simulate swap transaction
        try {
            await toast.promise(
                new Promise((resolve) => setTimeout(resolve, 2000)),
                {
                    loading: 'Swapping tokens...',
                    success: `Successfully swapped ${firstValue} ${firstToken.token} for ${secondValue} ${secondToken.token}`,
                    error: 'Swap failed',
                },
                {
                    style: {
                        minWidth: '250px',
                    },
                }
            );
            setIsSwapping(false);
        } catch (error) {
            console.error(error);
            setIsSwapping(false);
        }
    };

    const rate = firstToken.price / secondToken.price;

    return (
        <div className="card w-full max-w-[420px] p-4 mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Swap</h3>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                    <FaCog />
                </button>
            </div>

            {/* Settings Dropdown */}
            {showSettings && (
                <div className="mb-4 p-3 rounded-xl glass-light">
                    <label className="text-sm text-gray-400">Slippage Tolerance</label>
                    <div className="flex gap-2 mt-2">
                        {[0.1, 0.5, 1].map((value) => (
                            <button
                                key={value}
                                onClick={() => setSlippage(value)}
                                className={`px-3 py-1 rounded-lg text-sm transition-colors ${slippage === value
                                    ? "bg-indigo-500 text-white"
                                    : "bg-white/10 text-gray-400 hover:text-white"
                                    }`}
                            >
                                {value}%
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* First Token (You Pay) */}
            {isOpenFirstToken && (
                <SearchCrypto
                    key={1}
                    open={isOpenFirstToken}
                    onClose={onClose}
                    setToken={(token, icon, price) => setFToken(token, icon, price)}
                />
            )}

            <div className="p-4 rounded-xl glass-light mb-1">
                <span className="text-sm text-gray-400">You pay</span>
                <div className="flex justify-between items-center mt-2">
                    <input
                        placeholder="0"
                        ref={firstTokenRef}
                        type="number"
                        className="w-[60%] text-2xl font-medium bg-transparent focus:outline-none text-white placeholder-gray-500"
                        onChange={onChangeFirstToken}
                        value={firstValue || ""}
                    />

                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/20 transition-colors"
                        onClick={() => setIsOpenFirstToken(true)}
                    >
                        <img src={firstToken.icon} alt={firstToken.token} className="w-6 h-6" />
                        <span className="font-medium text-white">{firstToken.token}</span>
                        <FaAngleDown className="text-gray-400" />
                    </button>
                </div>
                {firstValue > 0 && (
                    <span className="text-sm text-gray-500">
                        ≈ ${(firstValue * firstToken.price).toLocaleString()}
                    </span>
                )}
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-2 relative z-10">
                <button
                    onClick={changeToken}
                    className="p-3 rounded-xl glass border border-white/20 hover:bg-white/20 transition-all hover:scale-110"
                >
                    <HiArrowsUpDown className="text-xl text-indigo-400" />
                </button>
            </div>

            {/* Second Token (You Receive) */}
            {isOpenSecondToken && (
                <SearchCrypto
                    key={2}
                    open={isOpenSecondToken}
                    onClose={onClose}
                    setToken={(token, icon, price) => setSToken(token, icon, price)}
                />
            )}

            <div className="p-4 rounded-xl glass-light mt-1">
                <span className="text-sm text-gray-400">You receive</span>
                <div className="flex justify-between items-center mt-2">
                    <input
                        placeholder="0"
                        ref={secondTokenRef}
                        type="number"
                        className="w-[60%] text-2xl font-medium bg-transparent focus:outline-none text-white placeholder-gray-500"
                        onChange={onChangeSecondToken}
                        value={secondValue || ""}
                    />

                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/20 transition-colors"
                        onClick={() => setIsOpenSecondToken(true)}
                    >
                        <img src={secondToken.icon} alt={secondToken.token} className="w-6 h-6" />
                        <span className="font-medium text-white">{secondToken.token}</span>
                        <FaAngleDown className="text-gray-400" />
                    </button>
                </div>
                {secondValue > 0 && (
                    <span className="text-sm text-gray-500">
                        ≈ ${(secondValue * secondToken.price).toLocaleString()}
                    </span>
                )}
            </div>

            {/* Rate Info */}
            {firstValue > 0 && (
                <div className="mt-3 p-3 rounded-xl glass-light text-sm text-gray-400">
                    <div className="flex justify-between">
                        <span>Rate</span>
                        <span className="text-white">
                            1 {firstToken.token} = {rate.toFixed(4)} {secondToken.token}
                        </span>
                    </div>
                    <div className="flex justify-between mt-1">
                        <span>Slippage</span>
                        <span className="text-white">{slippage}%</span>
                    </div>
                </div>
            )}

            {/* Swap Button */}
            <button
                onClick={handleSwap}
                disabled={isSwapping || firstValue === 0}
                className={`w-full mt-4 py-4 rounded-xl font-semibold text-lg transition-all ${!isConnected
                    ? "gradient-bg text-white hover:opacity-90"
                    : firstValue === 0
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : isSwapping
                            ? "bg-indigo-500/50 text-white cursor-wait"
                            : "gradient-bg text-white hover:opacity-90"
                    }`}
            >
                {!isConnected
                    ? "Connect Wallet"
                    : isSwapping
                        ? "Swapping..."
                        : firstValue === 0
                            ? "Enter an amount"
                            : "Swap"}
            </button>
        </div>
    );
};

const CryptoSwap = () => {
    return (
        <Suspense fallback={<div className="card w-full max-w-[420px] p-8 mx-auto animate-pulse">Loading...</div>}>
            <CryptoSwapContent />
        </Suspense>
    );
};

export default CryptoSwap;
