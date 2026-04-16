/**
 * Formats a number as USD currency.
 * e.g., 125000 -> $ 1,25,000
 */
export const formatINR = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(amount).replace("$", "$ ");
};

/**
 * Formats a number with +/- sign for gains/losses.
 */
export const formatGain = (amount: number): string => {
    const formatted = formatINR(Math.abs(amount));
    return amount >= 0 ? `+${formatted}` : `-${formatted}`;
};
