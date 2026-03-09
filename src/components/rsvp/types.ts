export const TRAVEL_DATA = {
  Germany: {
    activities:
      "Tea tasting at Tocklai, river cruises on the Brahmaputra, and sunrise over Majuli Island.",
  },
  India: {
    activities:
      "Discover the Ahom temples, explore Kaziranga National Park, and taste authentic Assamese cuisine.",
  },
  Other: {
    activities:
      "Explore Majuli Island, visit local silk weavers, and discover the ancient Ahom heritage.",
  },
} as const;

export type CountryKey = keyof typeof TRAVEL_DATA;
