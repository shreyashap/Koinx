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
            case "BTC": return "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]";
            case "ETH": return "bg-gray-400 shadow-[0_0_10px_rgba(156,163,175,0.5)]";
            case "USDT": return "bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]";
            case "MATIC": return "bg-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.5)]";
            default: return "bg-blue-600";
        }
    };

    return (
        <div className="rounded-xl border border-border bg-[#0B1222] overflow-hidden flex flex-col mt-8">
            <div className="p-4 border-b border-border">
                <h2 className="text-lg font-bold text-white">Holdings</h2>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-[#111827]">
                        <TableRow className="hover:bg-transparent border-border/50">
                            <TableHead className="w-[50px] pl-6 text-center">
                                <Checkbox
                                    checked={isAllSelected}
                                    onCheckedChange={(checked) => toggleAllHoldings(!!checked)}
                                    className="border-white/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                            </TableHead>
                            <TableHead className="text-gray-400 font-semibold py-4 text-xs">Asset</TableHead>
                            <TableHead className="text-gray-400 font-semibold py-4 text-xs">
                                <div>Holdings</div>
                                <div className="text-[10px] font-normal opacity-50">Current Market Rate</div>
                            </TableHead>
                            <TableHead className="text-gray-400 font-semibold py-4 text-xs">Total Current Value</TableHead>

                            <TableHead
                                className="text-gray-400 font-semibold py-4 text-xs cursor-pointer hover:text-white transition-colors"
                                onClick={() => handleSort("stcg")}
                            >
                                <div className="flex items-center gap-1">
                                    Short-term
                                    {sortField === "stcg" && (
                                        sortOrder === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                                    )}
                                </div>
                            </TableHead>

                            <TableHead
                                className="text-gray-400 font-semibold py-4 text-xs cursor-pointer hover:text-white transition-colors"
                                onClick={() => handleSort("ltcg")}
                            >
                                <div className="flex items-center gap-1">
                                    Long-Term
                                    {sortField === "ltcg" && (
                                        sortOrder === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                                    )}
                                </div>
                            </TableHead>

                            <TableHead className="text-gray-400 font-semibold py-4 text-xs text-right pr-6 whitespace-nowrap">Amount to Sell</TableHead>
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
                                        "border-border/50 transition-colors h-16",
                                        isSelected ? "bg-blue-600/10 hover:bg-blue-600/15" : "hover:bg-white/5"
                                    )}
                                >
                                    <TableCell className="pl-6 text-center">
                                        <Checkbox
                                            checked={isSelected}
                                            onCheckedChange={() => toggleHolding(h.coin)}
                                            className="border-white/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3 min-w-[120px]">
                                            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] text-white shrink-0", getCoinColor(h.coin))}>
                                                {h.coin.substring(0, 1)}
                                            </div>
                                            <div className="flex flex-col truncate">
                                                <span className="font-bold text-white text-sm leading-tight truncate">{h.coinName}</span>
                                                <span className="text-[10px] text-gray-400 uppercase leading-tight font-medium">{h.coin}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-bold text-white text-sm whitespace-nowrap">{(h.totalHolding || 0).toLocaleString(undefined, { maximumFractionDigits: 6 })} {h.coin}</div>
                                        <div className="text-[10px] text-gray-400 font-medium">$ {marketRate.toLocaleString()}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-bold text-white text-sm whitespace-nowrap">$ {totalValue.toLocaleString()}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cn(
                                            "text-sm font-bold whitespace-nowrap",
                                            h.stcg.gain >= 0 ? "text-green-500" : "text-red-500"
                                        )}>
                                            {h.stcg.gain >= 0 ? "+" : "-"}{formatINR(Math.abs(h.stcg.gain))}
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-medium">{(h.stcg.balance || 0).toLocaleString(undefined, { maximumFractionDigits: 6 })} {h.coin}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cn(
                                            "text-sm font-bold whitespace-nowrap",
                                            h.ltcg.gain >= 0 ? "text-green-500" : "text-red-500"
                                        )}>
                                            {h.ltcg.gain >= 0 ? "+" : "-"}{formatINR(Math.abs(h.ltcg.gain))}
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-medium">{(h.ltcg.balance || 0).toLocaleString(undefined, { maximumFractionDigits: 6 })} {h.coin}</div>
                                    </TableCell>
                                    <TableCell className="text-right pr-6 whitespace-nowrap">
                                        <span className="text-sm font-bold text-white opacity-80">
                                            {isSelected ? `${(h.totalHolding || 0).toLocaleString(undefined, { maximumFractionDigits: 6 })} ${h.coin}` : "-"}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            {!isExpanded && sortedHoldings.length > 4 && (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="p-4 text-left text-blue-500 hover:text-blue-400 text-sm font-bold transition-colors w-full border-t border-border mt-auto"
                >
                    View all
                </button>
            )}

            {isExpanded && (
                <button
                    onClick={() => setIsExpanded(false)}
                    className="p-4 text-left text-blue-500 hover:text-blue-400 text-sm font-bold transition-colors w-full border-t border-border mt-auto"
                >
                    Show less
                </button>
            )}
        </div>
    );
};
