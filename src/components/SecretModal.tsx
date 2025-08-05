import { useState } from "react";

export function DontClickModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
                aria-label="Close modal background"
            />
            <div className="relative z-10 bg-white/95 rounded-3xl shadow-2xl border-2 border-black p-8 max-w-lg w-full text-center flex flex-col items-center"
                style={{
                    fontFamily: "'VT323', monospace",
                }}>
                <h2 className="text-3xl mb-3">Uh-oh... You weren't supposed to click that.</h2>
                <h4 className="text-lg mb-6 text-gray-700">
                    But hey, since you're here... why not go all in and hire me as your next Frontend Developer?</h4>
                <p>Thanks for stopping by.</p>
                <div className="text-lg md:text-xl font-semibold">Tibor Szalontai</div>
                <div className="text-sm">hired by</div>
                <div className="text-2xl font-bold">You</div>
                <button
                    className="px-5 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition-all mt-2 cursor-pointer"
                    onClick={onClose}
                >
                    Thanks!
                </button>
            </div>
        </div>
    );
}
