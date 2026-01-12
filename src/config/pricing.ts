export const PRICING = {
  MONTHLY: {
    SYMBOL: "₹",
    OFFER_PRICE: "99",
    ORIGINAL_PRICE: "200",
    DURATION: "month",
    SAVINGS: "101",
    BILLING_CYCLE: "monthly",
  },
  YEARLY: {
    SYMBOL: "₹",
    OFFER_PRICE: "699",
    ORIGINAL_PRICE: "2400", // 200 * 12
    DURATION: "year",
    SAVINGS: "1701", // 2400 - 699
    BILLING_CYCLE: "yearly",
  },
} as const;

// Calculate percentage savings
export const SAVINGS_PERCENTAGE = {
  MONTHLY: Math.round(((200 - 99) / 200) * 100), // 50.5% ≈ 51%
  YEARLY: Math.round(((2400 - 699) / 2400) * 100), // 70.875% ≈ 71%
} as const;

// Helper function to get monthly equivalent for yearly price
export const getMonthlyEquivalent = (yearlyPrice: string) => {
  return (parseInt(yearlyPrice) / 12).toFixed(0);
};
