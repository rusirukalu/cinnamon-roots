import type { PhotoItem, ItineraryItem, JourneyStage, FaqItem, PackageOption } from "./types";

export const SITE_METADATA = {
  website: "https://cinnamonroots.com/",
  brand: "Ceylon Cinnamon Roots",
  host: "Deshan Chathuranga",
  address: "No. 53, Palassa, Thiththagalla, Ahangama, Galle, Sri Lanka",
  locality: "Palassa, Thiththagalla, Ahangama, Galle",
  location: "Ahangama, Galle · Sri Lanka",
  whatsappUrl: "https://wa.me/94751458653",
  whatsappNumber: "+94 75 145 8653",
  googleMapsUrl: "https://goo.gl/maps/aKqmMmr2SuCDDxhG9",
  excursionHubs: ["Galle", "Ahangama", "Koggala", "Weligama"],
  duration: "Approximately 1 to 1.5 hours",
  groupSizes: "Flexible group sizes (from couples to 30+ guest groups)",
  inclusions: [
    "A friendly stroll through the cinnamon plantation",
    "Hands-on demos on harvesting and bark preparation",
    "A fun, skilled cinnamon-peeling demonstration",
    "Chatting with local growers and artisan interaction",
    "Easy tips on drying, quality grading & merchant trade",
    "Hands-on participation under artisan supervision",
    "Warm, freshly brewed cinnamon tea",
    "A tasty locally prepared cinnamon snack",
    "A little cinnamon gift to take home",
    "A handy informational brochure",
  ],
};

export const PACKAGES: PackageOption[] = [
  {
    id: "the-together",
    name: "The Together",
    guestLabel: "For 2 guests",
    priceLkr: 16700,
    priceDisplay: "LKR 16,700 TOTAL",
    description:
      "A shared cinnamon experience for couples, friends and travel companions who want to discover the traditions behind Sri Lanka's famous spice.",
  },
  {
    id: "the-collective",
    name: "The Collective",
    guestLabel: "For 10 guests",
    priceLkr: 57500,
    priceDisplay: "LKR 57,500 TOTAL",
    description:
      "A shared cultural experience for families, friends and organized tour groups looking to discover the people, traditions and process behind Ceylon cinnamon.",
  },
  {
    id: "the-collective-plus",
    name: "The Collective Plus",
    guestLabel: "For 11 or more guests",
    priceLkr: 5000,
    priceDisplay: "LKR 5,000 PER GUEST",
    isPerGuest: true,
    description:
      "A group-friendly option for larger organized tours, travel agencies and tour operators seeking an authentic local experience for their guests.",
  },
  {
    id: "partner-operator",
    name: "Tour Operator Partnership",
    guestLabel: "Chauffeur & Agency Guides",
    priceLkr: null,
    priceDisplay: "Partner / Net Rates Available",
    description:
      "Agreed partner/net rates allowing tour operators, DMCs, hotels, and guides to include their own margin when selling to guests.",
  },
];

export const PHOTOS: Record<string, PhotoItem> = {
  // Hero background placeholder (kept separate per user instruction to plan hero separately)
  forest: {
    id: "forest",
    image: "https://images.unsplash.com/photo-1703566324597-9aa71bbab450",
    page: "https://unsplash.com/photos/a-lush-green-forest-filled-with-lots-of-trees-qi7sSLz74zQ",
    author: "Sadeep Jayashankha",
    alt: "Sunlit rainforest canopy and ferns in Sri Lanka",
    caption: "A study in Sri Lankan green",
    position: "50% 60%",
  },

  // Complete Collection of 8 Authentic Original Photographs
  artisanGrove: {
    id: "artisan-grove",
    src: "/images/artisan-grove.jpg",
    alt: "Master artisan working with cinnamon quills in the Palassa plantation grove",
    caption: "The Master Artisan at Work · Palassa Grove",
    isOriginal: true,
  },
  cinnamonOil: {
    id: "cinnamon-oil",
    src: "/images/cinnamon-bark-oil.jpg",
    alt: "Pure Ceylon Cinnamon Bark Oil and hand-rolled quills at Ceylon Cinnamon Roots",
    caption: "Pure Cinnamon Bark Oil & Hand-Rolled Quills",
    isOriginal: true,
  },
  outerSkinScraping: {
    id: "outer-skin-scraping",
    src: "/images/outer-skin-scraping.jpg",
    alt: "Artisan demonstrating the removal of the rough outer bark layer with a traditional blade",
    caption: "Removing the First Rough Skin",
    isOriginal: true,
  },
  barkRubbing: {
    id: "bark-rubbing",
    src: "/images/bark-rubbing.jpg",
    alt: "Artisan rubbing the harvested cinnamon branch on a specialized stand to loosen the inner bark",
    caption: "Rubbing the Cinnamon Bark",
    isOriginal: true,
  },
  cinnamonPeeling: {
    id: "cinnamon-peeling",
    src: "/images/cinnamon-peeling.jpg",
    alt: "Master artisan demonstrating the skilled process of peeling paper-thin Ceylon cinnamon bark",
    caption: "Traditional Cinnamon Peeling",
    isOriginal: true,
  },
  coupleRefreshments: {
    id: "couple-refreshments",
    src: "/images/couple-refreshments.jpg",
    alt: "Travelers enjoying freshly brewed cinnamon tea, sweet treats, and conversation with the artisan at Ceylon Cinnamon Roots",
    caption: "Warm Cinnamon Tea, Treats & Artisan Conversation",
    isOriginal: true,
  },
  couplePeelingDemo: {
    id: "couple-peeling-demo",
    src: "/images/couple-peeling-demo.jpg",
    alt: "Travelers closely observing the delicate peeling process demonstrated by the local artisan",
    caption: "Discovering the Living Craft Behind Every Quill",
    isOriginal: true,
  },
  groupTourCollective: {
    id: "group-tour-collective",
    src: "/images/group-tour-collective.jpg",
    alt: "International group of travelers gathered around the artisan in the plantation grove at Ceylon Cinnamon Roots",
    caption: "The Collective Experience · Palassa Plantation",
    isOriginal: true,
  },
};

export const GALLERY_PHOTOS: PhotoItem[] = [
  PHOTOS.groupTourCollective,
  PHOTOS.coupleRefreshments,
  PHOTOS.artisanGrove,
  PHOTOS.cinnamonPeeling,
  PHOTOS.barkRubbing,
  PHOTOS.outerSkinScraping,
  PHOTOS.couplePeelingDemo,
  PHOTOS.cinnamonOil,
];

export const ITINERARY: ItineraryItem[] = [
  {
    title: "A warm welcome",
    minutes: "10",
    text: "Arrive at Palassa, Thiththagalla, settle in and meet host Deshan Chathuranga and the story behind Ceylon Cinnamon Roots.",
  },
  {
    title: "The story of Ceylon cinnamon",
    minutes: "10",
    text: "Discover the heritage of authentic Ceylon cinnamon (Cinnamomum verum) and its distinctive place in Sri Lankan life and global spice history.",
  },
  {
    title: "The cinnamon journey",
    minutes: "50",
    text: "The heart of your experience. Walk the plantation, discover branch harvesting, and witness outer bark scraping, rubbing, peeling, and quill making with a skilled artisan.",
    featured: true,
  },
  {
    title: "Taste & discover",
    minutes: "17",
    text: "Ask questions, share discoveries, and enjoy warm cinnamon tea and locally prepared authentic cinnamon treats.",
  },
  {
    title: "A meaningful farewell",
    minutes: "03",
    text: "Receive a special cinnamon gift to take home and an informative brochure, leaving with a genuine connection to the craft.",
  },
];

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    title: "Explore the living tree.",
    text: "Walk through the cinnamon plantation in Palassa and discover the plant, its botanical characteristics, and fragrant aroma.",
    tag: "01 · Explore",
  },
  {
    title: "Harvest with care.",
    text: "Learn how suitable branches are selected from the grove, traditionally harvested, and prepared for processing.",
    tag: "02 · Harvest",
  },
  {
    title: "Removing the first rough skin.",
    text: "See how the rough outer layer is carefully scraped off using a traditional curved knife.",
    tag: "03 · Scrape",
    imageSrc: "/images/outer-skin-scraping.jpg",
  },
  {
    title: "Rubbing the cinnamon bark.",
    text: "Observe how the branch is rubbed with a specialized stand to warm and loosen the inner bark before peeling.",
    tag: "04 · Rub",
    imageSrc: "/images/bark-rubbing.jpg",
  },
  {
    title: "Delicate cinnamon peeling.",
    text: "Watch a local producer demonstrate the skilled process of peeling continuous, paper-thin sheets of cinnamon bark.",
    tag: "05 · Peel",
    imageSrc: "/images/cinnamon-peeling.jpg",
  },
  {
    title: "Connect & take home.",
    text: "Participate under artisan supervision, learn drying and grading, ask questions, and enjoy freshly prepared cinnamon products.",
    tag: "06 · Connect",
  },
];

export const FAQS: FaqItem[] = [
  {
    q: "Where is Ceylon Cinnamon Roots located?",
    a: "The experience is hosted at No. 53, Palassa, Thiththagalla, Ahangama, Galle, Sri Lanka. It is ideally situated for day excursions from Galle, Ahangama, Koggala, and Weligama.",
  },
  {
    q: "What packages and pricing are available?",
    a: "We offer 'The Together' for 2 guests at LKR 16,700 total; 'The Collective' for 10 guests at LKR 57,500 total; and 'The Collective Plus' for 11+ guests at a fixed LKR 5,000 per guest. Dedicated partner/net rates are also available for tour operators and chauffeur guides.",
  },
  {
    q: "How long does the experience take?",
    a: "The experience lasts approximately 1 to 1.5 hours (60 to 90 minutes). Timing and activities can be adjusted according to group requirements, weather, and tour itineraries.",
  },
  {
    q: "What is included with my visit?",
    a: "Your visit includes a guided plantation stroll, harvesting demonstrations, rough skin scraping, bark rubbing, delicate peeling shows, hands-on guest participation, grower interactions, warm cinnamon tea, local cinnamon snacks, a complimentary take-home gift, and an informational brochure.",
  },
  {
    q: "Can I participate in peeling the cinnamon myself?",
    a: "Yes! Where safe and appropriate, guests are encouraged to try bark rubbing, scraping, and quill assembly under the direct supervision of our local artisans.",
  },
  {
    q: "How can I book or contact the host?",
    a: "You can prepare an enquiry on this site and send it directly via WhatsApp to host Deshan Chathuranga at +94 75 145 8653, or submit the booking form for email confirmation.",
  },
  {
    q: "Do you cater to tour operators and chauffeur guides?",
    a: "Yes. We work closely with destination management companies, travel agencies, private chauffeur guides, and hotel concierges with agreed partner/net rates allowing operators to include their own margins.",
  },
  {
    q: "What refreshments and dietary considerations are provided?",
    a: "Freshly brewed warm cinnamon tea and locally prepared cinnamon treats are served. Please mention any dietary requirements or allergies in your booking message.",
  },
];

export const NAV_LINKS = [
  ["The experience", "#experience"],
  ["Our heritage", "#heritage"],
  ["The plantation", "#plantation"],
  ["Packages", "#booking"],
  ["Gallery", "#gallery"],
] as const;
