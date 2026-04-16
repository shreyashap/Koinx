/**
 * Formats a number as INR currency.
 * e.g., 125000 -> ₹1,25,000
 */
export const formatINR = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);
};

/**
 * Formats a number with +/- sign for gains/losses.
 */
export const formatGain = (amount: number): string => {
    const formatted = formatINR(Math.abs(amount));
    return amount >= 0 ? `+${formatted}` : `-${formatted}`;
};
