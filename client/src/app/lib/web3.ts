"use client";

import { ethers, Eip1193Provider } from "ethers";

// Type for error with code
interface WalletError extends Error {
    code?: number | string;
}

// Check if MetaMask is installed
export const isMetaMaskInstalled = (): boolean => {
    return typeof window !== "undefined" && Boolean(window.ethereum?.isMetaMask);
};

// Get the provider
export const getProvider = (): ethers.BrowserProvider => {
    if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed");
    }
    return new ethers.BrowserProvider(window.ethereum as Eip1193Provider);
};

// Connect wallet
export const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
        throw new Error("Please install MetaMask to use this app");
    }

    try {
        const provider = getProvider();
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);

        return {
            address,
            balance: ethers.formatEther(balance),
            signer,
            provider,
        };
    } catch (error) {
        const walletError = error as WalletError;
        if (walletError.code === 4001) {
            throw new Error("User rejected the connection request");
        }
        throw error;
    }
};

// Disconnect wallet (clear state only, MetaMask doesn't have true disconnect)
export const disconnectWallet = (): boolean => {
    // MetaMask doesn't support programmatic disconnect
    // We just clear our app state
    return true;
};

// Get current network
export const getNetwork = async () => {
    const provider = getProvider();
    const network = await provider.getNetwork();
    return {
        chainId: Number(network.chainId),
        name: network.name,
    };
};

// Switch to a specific network
export const switchNetwork = async (chainId: number): Promise<void> => {
    if (!isMetaMaskInstalled() || !window.ethereum?.request) return;

    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
    } catch (error) {
        const walletError = error as WalletError;
        // Chain not added, try to add it
        if (walletError.code === 4902) {
            throw new Error("Network not found in MetaMask");
        }
        throw error;
    }
};

// Format address for display
export const formatAddress = (address: string): string => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Format balance
export const formatBalance = (balance: string, decimals: number = 4): string => {
    return parseFloat(balance).toFixed(decimals);
};

// Network configuration type
interface NetworkConfig {
    name: string;
    symbol: string;
    explorer: string;
}

// Network configurations
export const NETWORKS: Record<number, NetworkConfig> = {
    1: { name: "Ethereum Mainnet", symbol: "ETH", explorer: "https://etherscan.io" },
    11155111: { name: "Sepolia Testnet", symbol: "ETH", explorer: "https://sepolia.etherscan.io" },
    137: { name: "Polygon", symbol: "MATIC", explorer: "https://polygonscan.com" },
    80001: { name: "Mumbai Testnet", symbol: "MATIC", explorer: "https://mumbai.polygonscan.com" },
};

// Get explorer URL for transaction
export const getExplorerUrl = (chainId: number, txHash: string): string => {
    const network = NETWORKS[chainId];
    if (!network) return `https://etherscan.io/tx/${txHash}`;
    return `${network.explorer}/tx/${txHash}`;
};
