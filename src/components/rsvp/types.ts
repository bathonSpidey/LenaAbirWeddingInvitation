export const TRAVEL_DATA = {
  Germany: {
    activities:
      "Tea tasting at Tocklai, river cruises on the Brahmaputra, and sunrise over Majuli Island.",
  },
  Other: {
    activities:
      "Explore Majuli Island, visit local silk weavers, and discover the ancient Ahom heritage.",
  },
} as const;

export type CountryKey = keyof typeof TRAVEL_DATA;
