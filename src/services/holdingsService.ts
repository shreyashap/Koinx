import { HOLDINGS_DATA } from "../constants/mock-data";
import { type Holding } from "../types/harvesting";

/**
 * Mock service to fetch holdings data.
 * Simulates an API call with a delay.
 */
export const fetchHoldings = async (): Promise<Holding[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(HOLDINGS_DATA);
        }, 500); // 500ms delay
    });
};
