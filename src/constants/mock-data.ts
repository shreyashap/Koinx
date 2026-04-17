import { type Holding, type CapitalGains } from "../types/harvesting";

export const HOLDINGS_DATA: Holding[] = [
    {
        coin: "BTC",
        coinName: "Bitcoin",
        logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg",
        totalHolding: 0.63776,
        currentPrice: 85320.15,
        averageBuyPrice: 42000.00,
        stcg: { balance: 0.33776, gain: -1200 },
        ltcg: { balance: 0.3, gain: 2400 },
    },
    {
        coin: "ETH",
        coinName: "Ethereum",
        logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
        totalHolding: 5.6736,
        currentPrice: 1620.15,
        averageBuyPrice: 1200.00,
        stcg: { balance: 2.332, gain: 55320.15 },
        ltcg: { balance: 3.3416, gain: 8239.29 },
    },
    {
        coin: "USDT",
        coinName: "Tether",
        logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg",
        totalHolding: 3096.54,
        currentPrice: 1.15,
        averageBuyPrice: 1.00,
        stcg: { balance: 2011.23, gain: -1200 },
        ltcg: { balance: 1085.31, gain: 2400 },
    },
    {
        coin: "MATIC",
        coinName: "Polygon",
        logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg",
        totalHolding: 2210,
        currentPrice: 2.31,
        averageBuyPrice: 1.80,
        stcg: { balance: 802, gain: -1200 },
        ltcg: { balance: 1408, gain: 2400 },
    },
    {
        coin: "SOL",
        coinName: "Solana",
        logo: "https://cryptologos.cc/logos/solana-sol-logo.svg",
        totalHolding: 154,
        currentPrice: 147.58,
        averageBuyPrice: 90.00,
        stcg: { balance: 54, gain: -800 },
        ltcg: { balance: 100, gain: 1500 },
    },
];

export const CAPITAL_GAINS_DATA: CapitalGains = {
    stcg: {
        profits: 1540,
        losses: 743,
    },
    ltcg: {
        profits: 1200,
        losses: 650,
    },
};
