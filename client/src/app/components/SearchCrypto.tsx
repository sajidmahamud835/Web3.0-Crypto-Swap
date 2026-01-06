"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

import data from "../data/cryptos.json";
import pindata from "../data/top_crypto.json";
import popdata from "../data/pop_crypto.json";

interface SearchCryptoProps {
    open: boolean;
    onClose: () => void;
    setToken: (token: string, icon: string, price: number) => void;
}

interface TokenItemProps {
    name: string;
    token: string;
    icon: string;
    price: number;
    onSelect: () => void;
    isPinned?: boolean;
}

const TokenItem: React.FC<TokenItemProps> = ({ name, token, icon, price, onSelect, isPinned }) => (
    <button
        onClick={onSelect}
        className={`w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors text-left ${isPinned ? "glass-light" : ""
            }`}
    >
        <img src={icon} alt={token} className="w-8 h-8 rounded-full" />
        <div className="flex-1">
            <div className="font-medium text-white">{token}</div>
            <div className="text-sm text-gray-400">{name}</div>
        </div>
        <div className="text-right">
            <div className="text-sm text-gray-400">${price.toLocaleString()}</div>
        </div>
    </button>
);

const SearchCrypto: React.FC<SearchCryptoProps> = ({ open, onClose, setToken }) => {
    const [searchValue, setSearchValue] = useState("");
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        const filteredTokens = data.filter(
            (item) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.token.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredData(filteredTokens);
    }, [searchValue]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSelect = (token: string, icon: string, price: number) => {
        setToken(token, icon, price);
        setSearchValue("");
    };

    if (!open) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md glass rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <h3 className="text-lg font-semibold text-white">Select a Token</h3>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Search */}
                    <div className="p-4">
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or symbol"
                                value={searchValue}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl glass-light text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Popular Tokens */}
                    <div className="px-4 pb-2">
                        <div className="flex flex-wrap gap-2">
                            {pindata.map((item) => (
                                <button
                                    key={item.token}
                                    onClick={() => handleSelect(item.token, item.icon, item.price)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-full glass-light hover:bg-white/20 transition-colors"
                                >
                                    <img src={item.icon} alt={item.token} className="w-5 h-5" />
                                    <span className="text-sm text-white">{item.token}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="mx-4 border-t border-white/10" />

                    {/* Token List */}
                    <div className="p-4 max-h-[300px] overflow-y-auto space-y-1">
                        {(searchValue === "" ? popdata : filteredData).map((item) => (
                            <TokenItem
                                key={item.token}
                                name={item.name}
                                token={item.token}
                                icon={item.icon}
                                price={item.price}
                                onSelect={() => handleSelect(item.token, item.icon, item.price)}
                            />
                        ))}

                        {filteredData.length === 0 && searchValue !== "" && (
                            <div className="text-center py-8 text-gray-400">
                                No tokens found for "{searchValue}"
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchCrypto;