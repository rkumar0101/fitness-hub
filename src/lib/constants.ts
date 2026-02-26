export const BRAND = {
  name: "Fitness Hub",
  phoneE164: "919999999999", // ✅ apna WhatsApp number: 91 + 10 digits (no +, no spaces)
  cityLine: "Your City, India",
  addressLine: "Your full address here",
  mapEmbedUrl: "https://www.google.com/maps?q=New%20Delhi&output=embed",
  hours: {
    weekdays: "Mon–Sat: 6:00 AM – 10:00 PM",
    sunday: "Sun: 7:00 AM – 12:00 PM",
  },
};

export const NAV_LINKS = [
  { id: "plans", label: "Plans" },
  { id: "trainers", label: "Trainers" },
  { id: "schedule", label: "Schedule" },
  { id: "reviews", label: "Reviews" },
  { id: "location", label: "Location" },
  { id: "faq", label: "FAQ" },
] as const;

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Fitness Hub, I want a free trial. My goal is _____. Preferred time: _____.";