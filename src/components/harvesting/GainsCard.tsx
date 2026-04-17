import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { type CapitalGains } from "../../types/harvesting";
import { formatINR } from "../../utils/formatters";
import { cn } from "../../lib/utils";

interface GainsCardProps {
    title: string;
    data: CapitalGains;
    variant?: "dark" | "blue";
    savings?: number;
    className?: string;
}

export const GainsCard: React.FC<GainsCardProps> = ({
    title,
    data,
    variant = "dark",
    savings,
    className
}) => {
    const isBlue = variant === "blue";

    const realisedNet = (data.stcg.profits - data.stcg.losses) + (data.ltcg.profits - data.ltcg.losses);
    const stcgNet = data.stcg.profits - data.stcg.losses;
    const ltcgNet = data.ltcg.profits - data.ltcg.losses;

    return (
        <Card className={cn(
            "border-none rounded-xl overflow-hidden flex flex-col",
            isBlue ? "bg-[#2563EB] text-white" : "bg-[#111827] text-white",
            className
        )}>
            <CardHeader className="p-6 pb-2">
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
            </CardHeader>

            <CardContent className="px-6 py-4 flex-grow">
                {/* Metric Table */}
                <div className="grid grid-cols-[1fr_100px_100px] gap-y-4 items-center">
                    {/* Headers */}
                    <div />
                    <div className="text-sm font-medium opacity-70 text-right pr-2">Short-term</div>
                    <div className="text-sm font-medium opacity-70 text-right pr-2">Long-term</div>

                    {/* Profits */}
                    <div className="text-sm">Profits</div>
                    <div className="text-sm font-semibold text-right pr-2">{formatINR(data.stcg.profits)}</div>
                    <div className="text-sm font-semibold text-right pr-2">{formatINR(data.ltcg.profits)}</div>

                    {/* Losses */}
                    <div className="text-sm">Losses</div>
                    <div className="text-sm font-semibold text-right pr-2">-{formatINR(data.stcg.losses)}</div>
                    <div className="text-sm font-semibold text-right pr-2">-{formatINR(data.ltcg.losses)}</div>

                    {/* Net Capital Gains */}
                    <div className="text-sm">Net Capital Gains</div>
                    <div className="text-sm font-bold text-right pr-2">{formatINR(stcgNet)}</div>
                    <div className="text-sm font-bold text-right pr-2">{formatINR(ltcgNet)}</div>
                </div>

                {/* Footer Area */}
                <div className="mt-8 flex items-baseline gap-4">
                    <span className="text-xl font-bold">
                        {isBlue ? "Effective Capital Gains:" : "Realised Capital Gains:"}
                    </span>
                    <span className="text-3xl font-bold tracking-tight">
                        {realisedNet < 0 ? "-" : ""} {formatINR(Math.abs(realisedNet))}
                    </span>
                </div>
            </CardContent>

            {isBlue && savings !== undefined && savings > 0 && (
                <CardFooter className="bg-white/10 py-5 px-6 border-t border-white/5 flex items-center gap-2 animate-in slide-in-from-bottom-2 fade-in duration-300">
                    <span className="text-2xl pt-0.5">🎉</span>
                    <div className="text-[13px] font-medium flex items-baseline gap-1.5 border-none p-0 bg-transparent">
                        <span className="opacity-90">You are going to save upto</span>
                        <span className="font-extrabold text-base tracking-tight">{formatINR(savings)}</span>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
};
