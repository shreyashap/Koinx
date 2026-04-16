import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { type Holding, type CapitalGains, type HarvestingState } from "../types/harvesting";
import { fetchHoldings } from "../services/holdingsService";
import { fetchCapitalGains } from "../services/gainsService";

interface HarvestingContextType extends HarvestingState {
    toggleHolding: (coin: string) => void;
    toggleAllHoldings: (selected: boolean) => void;
    isAllSelected: boolean;
    savingsCount: number;
}

const HarvestingContext = createContext<HarvestingContextType | undefined>(undefined);

export const HarvestingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [holdings, setHoldings] = useState<Holding[]>([]);
    const [preHarvesting, setPreHarvesting] = useState<CapitalGains>({
        stcg: { profits: 0, losses: 0 },
        ltcg: { profits: 0, losses: 0 },
    });
    const [selectedHoldingsByCoin, setSelectedHoldingsByCoin] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [hData, gData] = await Promise.all([fetchHoldings(), fetchCapitalGains()]);
                setHoldings(hData);
                setPreHarvesting(gData);
            } catch (err) {
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const toggleHolding = useCallback((coin: string) => {
        setSelectedHoldingsByCoin((prev) => {
            const next = new Set(prev);
            if (next.has(coin)) {
                next.delete(coin);
            } else {
                next.add(coin);
            }
            return next;
        });
    }, []);

    const toggleAllHoldings = useCallback((selected: boolean) => {
        if (selected) {
            setSelectedHoldingsByCoin(new Set(holdings.map((h) => h.coin)));
        } else {
            setSelectedHoldingsByCoin(new Set());
        }
    }, [holdings]);

    const isAllSelected = useMemo(() => {
        return holdings.length > 0 && selectedHoldingsByCoin.size === holdings.length;
    }, [holdings, selectedHoldingsByCoin]);

    const postHarvesting = useMemo(() => {
        const result: CapitalGains = JSON.parse(JSON.stringify(preHarvesting));

        selectedHoldingsByCoin.forEach((coinCode) => {
            const holding = holdings.find((h) => h.coin === coinCode);
            if (!holding) return;

            // STCG
            if (holding.stcg.gain > 0) {
                result.stcg.profits += holding.stcg.gain;
            } else {
                result.stcg.losses += Math.abs(holding.stcg.gain);
            }

            // LTCG
            if (holding.ltcg.gain > 0) {
                result.ltcg.profits += holding.ltcg.gain;
            } else {
                result.ltcg.losses += Math.abs(holding.ltcg.gain);
            }
        });

        return result;
    }, [preHarvesting, holdings, selectedHoldingsByCoin]);

    const savingsCount = useMemo(() => {
        const preRealisedNet =
            (preHarvesting.stcg.profits - preHarvesting.stcg.losses) +
            (preHarvesting.ltcg.profits - preHarvesting.ltcg.losses);

        const postRealisedNet =
            (postHarvesting.stcg.profits - postHarvesting.stcg.losses) +
            (postHarvesting.ltcg.profits - postHarvesting.ltcg.losses);

        // Only show "You're going to save" if realised capital gains drop
        return preRealisedNet > postRealisedNet ? preRealisedNet - postRealisedNet : 0;
    }, [preHarvesting, postHarvesting]);

    return (
        <HarvestingContext.Provider
            value={{
                holdings,
                preHarvesting,
                postHarvesting,
                selectedHoldingsByCoin,
                loading,
                error,
                toggleHolding,
                toggleAllHoldings,
                isAllSelected,
                savingsCount,
            }}
        >
            {children}
        </HarvestingContext.Provider>
    );
};

export const useHarvesting = () => {
    const context = useContext(HarvestingContext);
    if (context === undefined) {
        throw new Error("useHarvesting must be used within a HarvestingProvider");
    }
    return context;
};
