export interface GainInfo {
    balance: number;
    gain: number;
}

export interface Holding {
    coin: string;
    coinName: string;
    logo: string;
    currentPrice: number;
    totalHolding: number;
    averageBuyPrice: number;
    stcg: GainInfo;
    ltcg: GainInfo;
}

export interface CapitalGainsSection {
    profits: number;
    losses: number;
}

export interface CapitalGains {
    stcg: CapitalGainsSection;
    ltcg: CapitalGainsSection;
}

export interface CapitalGainsResponse {
    capitalGains: CapitalGains;
}

export interface HarvestingState {
    selectedHoldingsByCoin: Set<string>;
    preHarvesting: CapitalGains;
    postHarvesting: CapitalGains;
    holdings: Holding[];
    loading: boolean;
    error: string | null;
}
