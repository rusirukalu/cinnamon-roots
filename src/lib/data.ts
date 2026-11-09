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
  forest: {
    id: "forest",
    image: "https://images.unsplash.com/photo-1703566324597-9aa71bbab450",
    page: "https://unsplash.com/photos/a-lush-green-forest-filled-with-lots-of-trees-qi7sSLz74zQ",
    author: "Sadeep Jayashankha",
    alt: "Sunlit rainforest canopy and ferns at Sinharaja in Sri Lanka; supporting landscape imagery",
    caption: "A study in Sri Lankan green",
    position: "50% 60%",
  },
  quills: {
    id: "quills",
    image: "https://images.unsplash.com/photo-1720849433556-fb756c8fcdba",
    page: "https://unsplash.com/photos/a-close-up-of-a-bunch-of-cinnamon-sticks-22TJLSCQhOk",
    author: "Marek Studzinski",
    alt: "Close-up of curled cinnamon bark, showing the texture and layers",
    caption: "The quiet detail of cinnamon",
  },
  bundle: {
    id: "bundle",
    image: "https://images.unsplash.com/photo-1632644365325-3b4246e9b9b1",
    page: "https://unsplash.com/photos/cinnamon-sticks-tied-with-twine-on-a-white-wooden-surface-Ou1YhE9bw1Y",
    author: "Catia Climovich",
    alt: "Cinnamon sticks tied together with twine on a pale wooden surface",
    caption: "Texture, warmth & a familiar aroma",
  },
  spice: {
    id: "spice",
    image: "https://images.unsplash.com/photo-1622798337764-259682f03741",
    page: "https://unsplash.com/photos/cinnamon-sticks-and-cinnamon-powder-on-a-table-Xvjs1G812Yo",
    author: "Rens D",
    alt: "A still life of cinnamon sticks and ground cinnamon",
    caption: "A spice, seen a little differently",
  },
  tea: {
    id: "tea",
    image: "https://images.unsplash.com/photo-1643067077447-78239a403a18",
    page: "https://unsplash.com/photos/a-cup-of-tea-next-to-cinnamon-limes-limes-and-cinnamon-sticks-Sr-dbIWbap8",
    author: "Prchi Palwe",
    alt: "A cup of tea arranged with cinnamon, citrus and spices",
    caption: "A moment to slow down",
  },
  palms: {
    id: "palms",
    image: "https://images.unsplash.com/photo-1521706862577-47b053587f91",
    page: "https://unsplash.com/photos/palm-fronds-in-tropical-rainforest-9G1kXjqOq4U",
    author: "CHUTTERSNAP",
    alt: "Overlapping green palm fronds in a tropical rainforest",
    caption: "The language of the tropics",
  },
  landscape: {
    id: "landscape",
    image: "https://images.unsplash.com/photo-1712144234879-b2c4b4e54bb2",
    page: "https://unsplash.com/photos/a-lush-green-forest-filled-with-lots-of-trees-swhpF6VRGWc",
    author: "sander traa",
    alt: "Sunlit tropical hills and palms in southern Sri Lanka",
    caption: "Sri Lanka, beyond the familiar",
  },
  cake: {
    id: "cake",
    image: "https://images.unsplash.com/photo-1569775683473-c534979f35a9",
    page: "https://unsplash.com/photos/baked-bread-moBQMk---6g",
    author: "Yulia Khlebnikova",
    alt: "Sliced loaf cake on a pale board",
    caption: "The pleasure of a pause.",
  },
};

export const GALLERY_PHOTOS: PhotoItem[] = [
  {
    id: "sticks",
    image: "https://images.unsplash.com/photo-1611256243212-48a03787ea01",
    page: "https://unsplash.com/photos/brown-wooden-sticks-on-white-table-UGUy1i6_-GQ",
    author: "Diana Polekhina",
    alt: "Cinnamon sticks on a light surface, a photographic study of the spice",
    caption: "A familiar spice. A new perspective.",
  },
  {
    id: "bark",
    image: "https://images.unsplash.com/photo-1745090969926-b3f84175aa72",
    page: "https://unsplash.com/photos/cinnamon-sticks-in-brown-pile-Yfs8M0ofXgg",
    author: "Thibaud Constantin",
    alt: "A pile of cinnamon sticks with textured bark and curled edges",
    caption: "Beauty in the smallest details.",
  },
  {
    ...PHOTOS.forest,
    caption: "The green heart of Sri Lanka.",
  },
  PHOTOS.cake,
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
    title: "Prepare the bark.",
    text: "Observe the traditional removal of the rough outer skin followed by careful brass-rod rubbing to loosen the inner bark.",
    tag: "03 · Prepare",
  },
  {
    title: "The art of peeling.",
    text: "Watch a master local producer demonstrate the delicate, paper-thin peeling of pure Ceylon cinnamon bark.",
    tag: "04 · Peel",
  },
  {
    title: "Hands-on participation.",
    text: "Where safe and appropriate, take part in bark rubbing, scraping, and quill assembly under patient artisan supervision.",
    tag: "05 · Participate",
  },
  {
    title: "Grading & connection.",
    text: "Understand drying, grading, and the journey from grower to merchant. Ask questions and take home freshly prepared cinnamon.",
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
