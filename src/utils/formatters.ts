/**
 * Formats a number as INR (₹)
 * @param value The amount to format
 */
export const formatINR = (value: number): string => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
};

/**
 * Returns the sign for a gain/loss amount
 * @param value The gain or loss amount
 */
export const getGainLossSign = (value: number): string => {
    return value >= 0 ? "+" : "-";
};
