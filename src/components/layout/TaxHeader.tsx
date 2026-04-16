import React, { useState } from "react";

export const TaxHeader: React.FC = () => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="flex flex-col gap-1 mb-6 relative">
            <div className="flex items-baseline gap-4">
                <h1 className="text-2xl font-bold dark:text-white">Tax Harvesting</h1>
                <div className="relative inline-block">
                    <a
                        href="#"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        className="text-blue-500 hover:text-blue-400 underline text-sm font-semibold transition-colors"
                    >
                        How it works?
                    </a>

                    {showTooltip && (
                        <div className="absolute top-8 left-0 z-[100] w-64 p-3 bg-white text-gray-800 text-xs rounded-lg shadow-xl animate-in fade-in zoom-in duration-150">
                            <div className="absolute -top-1.5 left-6 w-3 h-3 bg-white rotate-45" />
                            <p className="leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus. Vel mattis diam duis morbi tellus dui consectetur.{" "}
                                <span className="text-blue-500 cursor-pointer hover:underline">Know More</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
