import React from "react";
import { Card, CardFooter } from "../ui/card";
import { type CapitalGains } from "../../types/harvesting";
import { formatINR } from "../../utils/formatters";
import { cn } from "../../lib/utils";

interface GainsCardProps {
    title: string;
    data: CapitalGains;
    variant: "dark" | "blue";
    savings?: number;
}

export const GainsCard: React.FC<GainsCardProps> = ({ title, data, variant, savings }) => {
    const isBlue = variant === "blue";

    const realisedTotal = (data.stcg.profits - data.stcg.losses) + (data.ltcg.profits - data.ltcg.losses);

    return (
        <Card className={cn(
            "border-none overflow-hidden transition-all duration-300",
            isBlue
                ? "bg-blue-600 shadow-[0_4px_20px_rgba(37,99,235,0.4)] text-white"
                : "bg-white dark:bg-gray-900 border border-white/5 text-gray-400 dark:text-gray-400"
        )}>
            <div className="p-6 pb-0">
                <h3 className={cn("text-lg font-bold border-b dark:border-white/5 pb-6", isBlue ? "text-white" : "text-black dark:text-white")}>{title}</h3>

                <div className="mt-6 grid grid-cols-[1fr_100px_100px] gap-4 mb-4 text-xs font-semibold">
                    <div />
                    <div className="text-right opacity-80">Short-term</div>
                    <div className="text-right opacity-80">Long-term</div>
                </div>

                <div className="space-y-4 mb-8">
                    {/* Profits */}
                    <div className="grid grid-cols-[1fr_100px_100px] gap-4 items-center">
                        <div className="text-sm font-medium">Profits</div>
                        <div className={cn("text-sm font-bold text-right", isBlue ? "text-white" : "text-gray-400 dark:text-white")}>
                            {formatINR(data.stcg.profits)}
                        </div>
                        <div className={cn("text-sm font-bold text-right", isBlue ? "text-white" : "text-gray-400 dark:text-white")}>
                            {formatINR(data.ltcg.profits)}
                        </div>
                    </div>

                    {/* Losses */}
                    <div className="grid grid-cols-[1fr_100px_100px] gap-4 items-center">
                        <div className="text-sm font-medium">Losses</div>
                        <div className={cn("text-sm font-bold text-right", isBlue ? "text-white" : "text-gray-400 dark:text-white")}>
                            - {formatINR(data.stcg.losses)}
                        </div>
                        <div className={cn("text-sm font-bold text-right", isBlue ? "text-white" : "text-gray-400 dark:text-white")}>
                            - {formatINR(data.ltcg.losses)}
                        </div>
                    </div>

                    {/* Net Capital Gains */}
                    <div className="grid grid-cols-[1fr_100px_100px] gap-4 items-center pb-2">
                        <div className="text-sm font-medium">Net Capital Gains</div>
                        <div className={cn("text-sm font-bold text-right", isBlue ? "text-white" : "text-gray-400 dark:text-white")}>
                            {data.stcg.profits - data.stcg.losses >= 0 ? "" : "- "}{formatINR(Math.abs(data.stcg.profits - data.stcg.losses))}
                        </div>
                        <div className={cn("text-sm font-bold text-right", isBlue ? "text-white" : "text-gray-400 dark:text-white")}>
                            {data.ltcg.profits - data.ltcg.losses >= 0 ? "" : "- "}{formatINR(Math.abs(data.ltcg.profits - data.ltcg.losses))}
                        </div>
                    </div>
                </div>

                <div className="flex items-baseline justify-between py-6 border-t border-white/10 mt-auto">
                    <div className={cn("text-lg font-bold", isBlue ? "text-white" : "text-black dark:text-gray-300")}>{isBlue ? "Effective Capital Gains:" : "Realised Capital Gains:"}</div>
                    <div className={cn("text-2xl font-black tracking-tight", isBlue ? "text-white" : "text-black dark:text-white")}>
                        {realisedTotal >= 0 ? "" : "- "}{formatINR(Math.abs(realisedTotal))}
                    </div>
                </div>
            </div>

            {isBlue && savings !== undefined && savings > 0 && (
                <CardFooter className="bg-white/10 py-4 px-6 border-t border-white/5 flex items-center gap-2 animate-in slide-in-from-bottom-2 fade-in duration-300">
                    <span className="text-xl pt-0.5">🎉</span>
                    <div className="text-[12px] font-medium flex items-baseline gap-1.5 border-none p-0 bg-transparent">
                        <span className="opacity-90">You will save</span>
                        <span className="font-extrabold text-sm tracking-tight">{formatINR(savings)}</span>
                        <span className="opacity-90">in taxes</span>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
};
