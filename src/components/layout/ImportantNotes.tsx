import React, { useState } from "react";
import { Info, ChevronDown, ChevronUp } from "lucide-react";

export const ImportantNotes: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const notes = [
        "Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.",
        "Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.",
        "Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.",
        "Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.",
        "Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.",
    ];

    return (
        <div className="border border-[#2563EB] bg-[#0F172A] rounded-lg mb-8 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#1E293B] transition-colors"
            >
                <div className="flex items-center gap-3">
                    <Info className="text-blue-500 w-5 h-5 flex-shrink-0" />
                    <span className="font-semibold text-sm text-white md:text-base">Important Notes & Disclaimers</span>
                </div>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
            </button>

            {isOpen && (
                <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <ul className="space-y-3 list-disc pl-5">
                        {notes.map((note, index) => (
                            <li key={index} className="text-gray-300 text-xs md:text-sm leading-relaxed">
                                {note}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
