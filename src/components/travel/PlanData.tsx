export interface ScheduleDay {
  date: string;
  activity: string;
}

export interface Plan {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  days: ScheduleDay[];
}

export const WeddingPlans: Plan[] = [
  {
    id: "relaxed",
    title: "The Leisurely Tour",
    subtitle: "For the serene traveler",
    color: "#B98C8C", // Dusty Rose
    days: [
      { date: "30 Nov", activity: "Arrival in Delhi" },
      { date: "01 Dec", activity: "Rest & Boutique Sightseeing" },
      { date: "02 Dec", activity: "Private Car to the Taj Mahal" },
      { date: "03 Dec", activity: "Flight to Jorhat" },
      { date: "04 Dec", activity: "5PM: Mehendi & Shoori" },
      { date: "05 Dec", activity: "Local Silk Shopping & Tea Rest" },
      { date: "06 Dec", activity: "2PM: Reception & Rituals" },
      { date: "07 Dec", activity: "Departure for Delhi" },
    ],
  },
  {
    id: "exploration",
    title: "The Explorer's Route",
    subtitle: "Culture and River Mist",
    color: "#c9a961", // Antique Gold
    days: [
      { date: "29 Nov", activity: "Arrival in Delhi" },
      { date: "30 Nov", activity: "Taj Mahal Day Trip" },
      { date: "01 Dec", activity: "Flight To Guwahati" },
      { date: "02 Dec", activity: "Elephant and Jeep Safari" },
      { date: "03 Dec", activity: "Arrival to Jorhat" },
      { date: "04 Dec", activity: "5PM: Mehendi & Shoori" },
      { date: "05 Dec", activity: "Tea Rest & Local Exploration" },
      { date: "06 Dec", activity: "2PM: Reception & Rituals" },
      { date: "07 Dec", activity: "Majuli and Tea" },
      { date: "08 Dec", activity: "Travel to Guwahati" },
      { date: "09 Dec", activity: "Umananda Temple & Souvenirs" },
    ],
  },
  {
    id: "intense",
    title: "The Grand Expedition",
    subtitle: "The full Assamese experience",
    color: "#1a2849", // Navy
    days: [
      { date: "03 Dec", activity: "Delhi Arrival & Night Flight to Jorhat" },
      { date: "04 Dec", activity: "5PM: Mehendi & Shoori" },
      { date: "05 Dec", activity: "Early Majuli Trip & Mask Making" },
      { date: "06 Dec", activity: "2PM: Reception & Rituals" },
      { date: "07 Dec", activity: "Kaziranga Dawn Safari" },
      { date: "08 Dec", activity: "Guwahati City Tour & Dinner Cruise" },
      { date: "09 Dec", activity: "Kamakhya Temple & Flight to Delhi" },
      { date: "10 Dec", activity: "International Departure" },
    ],
  },
];
