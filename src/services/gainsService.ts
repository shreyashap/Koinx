import { CAPITAL_GAINS_DATA } from "../constants/mock-data";
import { type CapitalGains } from "../types/harvesting";

/**
 * Mock service to fetch capital gains data.
 * Simulates an API call with a delay.
 */
export const fetchCapitalGains = async (): Promise<CapitalGains> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(CAPITAL_GAINS_DATA);
        }, 500);
    });
};
