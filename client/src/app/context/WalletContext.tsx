"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import {
    connectWallet,
    disconnectWallet,
    isMetaMaskInstalled,
    formatAddress,
    getNetwork,
    NETWORKS
} from "../lib/web3";

interface WalletState {
    address: string | null;
    balance: string;
    chainId: number | null;
    isConnected: boolean;
    isConnecting: boolean;
    error: string | null;
}

interface WalletContextType extends WalletState {
    connect: () => Promise<void>;
    disconnect: () => void;
    formattedAddress: string;
    networkName: string;
}

const initialState: WalletState = {
    address: null,
    balance: "0",
    chainId: null,
    isConnected: false,
    isConnecting: false,
    error: null,
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<WalletState>(initialState);

    // Connect wallet
    const connect = useCallback(async () => {
        if (!isMetaMaskInstalled()) {
            setState(prev => ({ ...prev, error: "Please install MetaMask" }));
            window.open("https://metamask.io/download/", "_blank");
            return;
        }

        setState(prev => ({ ...prev, isConnecting: true, error: null }));

        try {
            const { address, balance } = await connectWallet();
            const network = await getNetwork();

            setState({
                address,
                balance,
                chainId: network.chainId,
                isConnected: true,
                isConnecting: false,
                error: null,
            });
        } catch (error: any) {
            setState(prev => ({
                ...prev,
                isConnecting: false,
                error: error.message || "Failed to connect wallet"
            }));
        }
    }, []);

    // Disconnect wallet
    const disconnect = useCallback(() => {
        disconnectWallet();
        setState(initialState);
    }, []);

    // Listen for account changes
    useEffect(() => {
        if (typeof window === "undefined" || !window.ethereum) return;

        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length === 0) {
                disconnect();
            } else if (accounts[0] !== state.address) {
                connect();
            }
        };

        const handleChainChanged = () => {
            // Reload on chain change (recommended by MetaMask)
            window.location.reload();
        };

        window.ethereum.on("accountsChanged", handleAccountsChanged);
        window.ethereum.on("chainChanged", handleChainChanged);

        return () => {
            window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
            window.ethereum?.removeListener("chainChanged", handleChainChanged);
        };
    }, [state.address, connect, disconnect]);

    // Check if already connected on mount
    useEffect(() => {
        const checkConnection = async () => {
            if (typeof window === "undefined" || !window.ethereum) return;

            try {
                const accounts = await window.ethereum.request({ method: "eth_accounts" });
                if (accounts.length > 0) {
                    connect();
                }
            } catch (error) {
                console.error("Error checking wallet connection:", error);
            }
        };

        checkConnection();
    }, [connect]);

    const value: WalletContextType = {
        ...state,
        connect,
        disconnect,
        formattedAddress: state.address ? formatAddress(state.address) : "",
        networkName: state.chainId ? NETWORKS[state.chainId]?.name || "Unknown Network" : "",
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
}
