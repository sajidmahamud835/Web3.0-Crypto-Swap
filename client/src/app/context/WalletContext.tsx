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
import ErrorDialog from "../components/ErrorDialog";
import { toast } from "react-hot-toast";

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
    clearError: () => void;
}

interface ErrorDialogState {
    isOpen: boolean;
    title: string;
    message: string;
    details?: string;
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
    const [errorDialog, setErrorDialog] = useState<ErrorDialogState>({
        isOpen: false,
        title: "",
        message: "",
        details: undefined,
    });



    // Parse and show user-friendly error messages
    const handleWalletError = useCallback((error: any) => {
        let title = "Connection Failed";
        let message = "Unable to connect to your wallet.";
        let details = "";

        // Check for user rejection (code 4001)
        if (error.code === 4001 || error.code === "ACTION_REJECTED" ||
            error.message?.includes("rejected") || error.message?.includes("denied")) {
            title = "Connection Rejected";
            message = "You rejected the wallet connection request.";
            details = "Error Code: 4001 (User Rejected Request)";
            toast.error(message);
        }
        // Check for already processing
        else if (error.code === -32002) {
            title = "Request Pending";
            message = "A connection request is already pending. Please check MetaMask.";
            details = "Error Code: -32002 (Request Already Pending)";
            toast.loading(message, { duration: 4000 });
        }
        // Check for no MetaMask
        else if (error.message?.includes("MetaMask")) {
            title = "MetaMask Not Found";
            message = "Please install MetaMask browser extension.";
            toast.error(message);
        }
        // Generic error with details
        else {
            details = error.message || JSON.stringify(error);
            toast.error(message);
        }

        setErrorDialog({
            isOpen: true,
            title,
            message,
            details: details || undefined,
        });

        setState(prev => ({
            ...prev,
            isConnecting: false,
            error: message,
        }));
    }, []);

    // Connect wallet
    const connect = useCallback(async () => {
        if (!isMetaMaskInstalled()) {
            const msg = "Please install MetaMask browser extension to connect your wallet.";
            toast.error(msg);
            setErrorDialog({
                isOpen: true,
                title: "MetaMask Not Found",
                message: msg,
                details: undefined,
            });
            window.open("https://metamask.io/download/", "_blank");
            return;
        }

        setState(prev => ({ ...prev, isConnecting: true, error: null }));
        const loadingToast = toast.loading("Connecting wallet...");

        try {
            const { address, balance } = await connectWallet();
            const network = await getNetwork();

            toast.dismiss(loadingToast);
            toast.success("Wallet connected successfully!");

            setState({
                address,
                balance,
                chainId: network.chainId,
                isConnected: true,
                isConnecting: false,
                error: null,
            });
        } catch (error: any) {
            toast.dismiss(loadingToast);
            handleWalletError(error);
        }
    }, [handleWalletError]);

    // Clear error
    const clearError = useCallback(() => {
        setState(prev => ({ ...prev, error: null }));
        setErrorDialog(prev => ({ ...prev, isOpen: false }));
    }, []);

    // Disconnect wallet
    const disconnect = useCallback(() => {
        disconnectWallet();
        setState(initialState);
        toast.success("Wallet disconnected");
    }, []);

    // Handle retry
    const handleRetry = useCallback(() => {
        setErrorDialog(prev => ({ ...prev, isOpen: false }));
        connect();
    }, [connect]);

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
        clearError,
        formattedAddress: state.address ? formatAddress(state.address) : "",
        networkName: state.chainId ? NETWORKS[state.chainId]?.name || "Unknown Network" : "",
    };

    return (
        <WalletContext.Provider value={value}>
            {children}

            {/* Error Dialog */}
            <ErrorDialog
                isOpen={errorDialog.isOpen}
                title={errorDialog.title}
                message={errorDialog.message}
                details={errorDialog.details}
                onClose={clearError}
                onRetry={handleRetry}
            />
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
