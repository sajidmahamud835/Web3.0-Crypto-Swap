"use client";

import { FaTimes, FaExclamationTriangle, FaRedo } from "react-icons/fa";

interface ErrorDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    details?: string;
    onClose: () => void;
    onRetry?: () => void;
}

export default function ErrorDialog({
    isOpen,
    title,
    message,
    details,
    onClose,
    onRetry,
}: ErrorDialogProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md glass rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                <FaExclamationTriangle className="text-red-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">{title}</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        <p className="text-gray-300 mb-4">{message}</p>

                        {details && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 mb-4">
                                <p className="text-sm text-red-300 font-mono break-all">
                                    {details}
                                </p>
                            </div>
                        )}

                        {/* Help Section */}
                        <div className="p-4 rounded-xl glass-light mb-4">
                            <h4 className="text-white font-medium mb-2">How to fix:</h4>
                            <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
                                <li>Open your MetaMask extension</li>
                                <li>Click "Connect" when prompted</li>
                                <li>Make sure you approve the connection request</li>
                            </ol>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 p-4 border-t border-white/10">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            Cancel
                        </button>
                        {onRetry && (
                            <button
                                onClick={onRetry}
                                className="flex-1 px-4 py-3 rounded-xl gradient-bg text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                            >
                                <FaRedo />
                                Try Again
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
