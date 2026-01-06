import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider & {
            isMetaMask?: boolean;
            on?: (event: string, handler: (...args: any[]) => void) => void;
            removeListener?: (event: string, handler: (...args: any[]) => void) => void;
            request: (args: { method: string; params?: any[] }) => Promise<any>;
        };
    }
}

export { };
