import React, { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { useHarvesting } from "../../context/HarvestingContext";
import { formatINR } from "../../utils/formatters";
import { cn } from "../../lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

type SortField = "stcg" | "ltcg" | null;
type SortOrder = "asc" | "desc";

export const HoldingsTable: React.FC = () => {
    const {
        holdings,
        selectedHoldingsByCoin,
        toggleHolding,
        toggleAllHoldings,
        isAllSelected
    } = useHarvesting();

    const [isExpanded, setIsExpanded] = useState(false);
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("desc");
        }
    };

    const sortedHoldings = useMemo(() => {
        let items = [...holdings];
        if (sortField) {
            items.sort((a, b) => {
                const valA = sortField === "stcg" ? a.stcg.gain : a.ltcg.gain;
                const valB = sortField === "stcg" ? b.stcg.gain : b.ltcg.gain;
                return sortOrder === "asc" ? valA - valB : valB - valA;
            });
        }
        return items;
    }, [holdings, sortField, sortOrder]);

    const displayedHoldings = isExpanded ? sortedHoldings : sortedHoldings.slice(0, 4);

    const getCoinColor = (coin: string) => {
        switch (coin.toUpperCase()) {
            case "BTC": return "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]";
            case "ETH": return "bg-gray-400 shadow-[0_0_10px_rgba(156,163,175,0.4)]";
            case "USDT": return "bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.4)]";
            case "MATIC": return "bg-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.4)]";
            default: return "bg-blue-600";
        }
    };

    return (
        <div className="rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111827] overflow-hidden flex flex-col mt-8 shadow-sm dark:shadow-2xl">
            <div className="p-5 border-b border-gray-100 dark:border-white/5">
                <h2 className="text-base font-bold text-[#111827] dark:text-white">Holdings</h2>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-gray-100 dark:bg-gray-800">
                        <TableRow className="hover:bg-transparent border-gray-100 dark:border-white/5">
                            <TableHead className="w-[60px] pl-6 text-center">
                                <Checkbox
                                    checked={isAllSelected}
                                    onCheckedChange={(checked) => toggleAllHoldings(!!checked)}
                                    className="border-gray-200 dark:border-white/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                            </TableHead>
                            <TableHead className="text-gray-800 dark:text-gray-500 font-semibold py-4 text-[11px] uppercase tracking-wider">Asset</TableHead>
                            <TableHead className="text-gray-800 dark:text-gray-500 font-semibold py-4 text-[11px] uppercase tracking-wider">
                                <div className="flex flex-col">
                                    <span>Holdings</span>
                                    <span className="text-[9px] font-normal lowercase opacity-60">Current Market Rate</span>
                                </div>
                            </TableHead>
                            <TableHead className="text-gray-800 dark:text-gray-500 font-semibold py-4 text-[11px] uppercase tracking-wider">Total Current Value</TableHead>

                            <TableHead
                                className="text-gray-800 dark:text-gray-500 font-semibold py-4 text-[11px] uppercase tracking-wider cursor-pointer hover:text-black dark:hover:text-white transition-colors"
                                onClick={() => handleSort("stcg")}
                            >
                                <div className="flex items-center gap-1">
                                    Short-term
                                    {sortField === "stcg" && (
                                        sortOrder === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                                    )}
                                </div>
                            </TableHead>

                            <TableHead
                                className="text-gray-800 dark:text-gray-500 font-semibold py-4 text-[11px] uppercase tracking-wider cursor-pointer hover:text-black dark:hover:text-white transition-colors"
                                onClick={() => handleSort("ltcg")}
                            >
                                <div className="flex items-center gap-1">
                                    Long-Term
                                    {sortField === "ltcg" && (
                                        sortOrder === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                                    )}
                                </div>
                            </TableHead>

                            <TableHead className="text-gray-800 dark:text-gray-500 font-semibold py-4 text-[11px] uppercase tracking-wider text-right pr-6">Amount to Sell</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {displayedHoldings.map((h) => {
                            const isSelected = selectedHoldingsByCoin.has(h.coin);
                            const marketRate = h.currentPrice || 0;
                            const totalValue = (h.totalHolding || 0) * marketRate;

                            return (
                                <TableRow
                                    key={`${h.coin}-${h.coinName}`}
                                    className={cn(
                                        "border-gray-50 dark:border-white/5 transition-colors h-16",
                                        isSelected
                                            ? "bg-blue-50 dark:bg-blue-600/15 hover:bg-blue-100 dark:hover:bg-blue-600/20"
                                            : "hover:bg-gray-50 dark:hover:bg-white/5"
                                    )}
                                >
                                    <TableCell className="pl-6 text-center">
                                        <Checkbox
                                            checked={isSelected}
                                            onCheckedChange={() => toggleHolding(h.coin)}
                                            className="border-gray-200 dark:border-white/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] text-white shrink-0", getCoinColor(h.coin))}>
                                                {h.coin.substring(0, 1)}
                                            </div>
                                            <div className="flex flex-col truncate">
                                                <span className="font-bold text-[#111827] dark:text-white text-sm leading-tight truncate">{h.coinName}</span>
                                                <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase leading-tight font-medium">{h.coin}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-bold text-[#111827] dark:text-white text-sm whitespace-nowrap">{(h.totalHolding || 0).toLocaleString(undefined, { maximumFractionDigits: 6 })} {h.coin}</div>
                                        <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">$ {marketRate.toLocaleString()}/{h.coin}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-bold text-[#111827] dark:text-white text-sm whitespace-nowrap">$ {totalValue.toLocaleString()}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cn(
                                            "text-sm font-bold whitespace-nowrap",
                                            h.stcg.gain >= 0 ? "text-green-500" : "text-red-500"
                                        )}>
                                            {h.stcg.gain >= 0 ? "+" : "-"}{formatINR(Math.abs(h.stcg.gain))}
                                        </div>
                                        <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{(h.stcg.balance || 0).toLocaleString(undefined, { maximumFractionDigits: 6 })} {h.coin}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cn(
                                            "text-sm font-bold whitespace-nowrap",
                                            h.ltcg.gain >= 0 ? "text-green-500" : "text-red-500"
                                        )}>
                                            {h.ltcg.gain >= 0 ? "+" : "-"}{formatINR(Math.abs(h.ltcg.gain))}
                                        </div>
                                        <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{(h.ltcg.balance || 0).toLocaleString(undefined, { maximumFractionDigits: 6 })} {h.coin}</div>
                                    </TableCell>
                                    <TableCell className="text-right pr-6 whitespace-nowrap">
                                        <span className="text-sm font-bold text-[#111827] dark:text-white opacity-80">
                                            {isSelected ? `${(h.totalHolding || 0).toLocaleString(undefined, { maximumFractionDigits: 6 })} ${h.coin}` : "-"}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-white/5">
                {!isExpanded && sortedHoldings.length > 4 ? (
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="text-blue-600 dark:text-blue-500 hover:text-blue-400 text-sm font-bold transition-colors decoration-blue-500/30 underline-offset-4 hover:underline"
                    >
                        View all
                    </button>
                ) : isExpanded && (
                    <button
                        onClick={() => setIsExpanded(false)}
                        className="text-blue-600 dark:text-blue-500 hover:text-blue-400 text-sm font-bold transition-colors decoration-blue-500/30 underline-offset-4 hover:underline"
                    >
                        Show less
                    </button>
                )}
            </div>
        </div>
    );
};
