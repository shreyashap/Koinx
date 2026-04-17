import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

export const TaxHeader: React.FC = () => {
    return (
        <div className="flex items-baseline gap-4 mb-4">
            <h1 className="text-2xl font-bold text-[#111827] dark:text-white tracking-tight">Tax Harvesting</h1>
            <TooltipProvider delayDuration={200}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <a
                            href="#"
                            className="text-sm font-semibold text-blue-600 dark:text-blue-500 hover:text-blue-400 border-b border-blue-500/30 transition-colors pb-0.5"
                        >
                            How it works?
                        </a>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs p-4 bg-gray-900 dark:bg-white border-gray-800 text-gray-300 dark:text-gray-800 text-xs shadow-xl">
                        <p>
                            Tax-loss harvesting is the practice of selling a security that has experienced a loss.
                            By realizing, or harvesting, a loss, you can offset taxes on both gains and income.
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};
