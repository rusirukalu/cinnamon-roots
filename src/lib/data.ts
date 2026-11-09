import type { PhotoItem, ItineraryItem, JourneyStage, FaqItem } from "./types";

export const SITE_METADATA = {
  website: "https://cinnamonroots.com/",
  location: "Sri Lanka",
};

export const PHOTOS: Record<string, PhotoItem> = {
  forest: {
    id: "forest",
    image: "https://images.unsplash.com/photo-1703566324597-9aa71bbab450",
    page: "https://unsplash.com/photos/a-lush-green-forest-filled-with-lots-of-trees-qi7sSLz74zQ",
    author: "Sadeep Jayashankha",
    alt: "Sunlit rainforest canopy and ferns at Sinharaja in Sri Lanka; supporting landscape imagery, not the plantation",
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
    alt: "A cup of tea arranged with cinnamon, citrus and spices; an editorial still life, not the served menu",
    caption: "A moment to slow down",
  },
  palms: {
    id: "palms",
    image: "https://images.unsplash.com/photo-1521706862577-47b053587f91",
    page: "https://unsplash.com/photos/palm-fronds-in-tropical-rainforest-9G1kXjqOq4U",
    author: "CHUTTERSNAP",
    alt: "Overlapping green palm fronds in a tropical rainforest; botanical supporting imagery",
    caption: "The language of the tropics",
  },
  landscape: {
    id: "landscape",
    image: "https://images.unsplash.com/photo-1712144234879-b2c4b4e54bb2",
    page: "https://unsplash.com/photos/a-lush-green-forest-filled-with-lots-of-trees-swhpF6VRGWc",
    author: "sander traa",
    alt: "Sunlit tropical hills and palms in Ella, Sri Lanka; a supporting landscape photograph, not the plantation",
    caption: "Sri Lanka, beyond the familiar",
  },
  cake: {
    id: "cake",
    image: "https://images.unsplash.com/photo-1569775683473-c534979f35a9",
    page: "https://unsplash.com/photos/baked-bread-moBQMk---6g",
    author: "Yulia Khlebnikova",
    alt: "Sliced coconut and ginger loaf cake on a pale board; an editorial food study, not the cinnamon cake served at the experience",
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
    text: "Arrive, settle in and meet the story behind your visit. A personal introduction to Ceylon Cinnamon Roots.",
  },
  {
    title: "The story of Ceylon cinnamon",
    minutes: "10",
    text: "Discover the heritage of Ceylon cinnamon and its place in Sri Lankan culture, agriculture and everyday life.",
  },
  {
    title: "The cinnamon journey",
    minutes: "70",
    text: "The heart of your experience. Explore the plantation, discover harvesting and try scraping, rubbing, peeling and quill-making with an artisan.",
    featured: true,
  },
  {
    title: "Taste & discover",
    minutes: "27",
    text: "Ask questions, share discoveries and enjoy cinnamon tea, drinks, cake and locally prepared cinnamon treats.",
  },
  {
    title: "A meaningful farewell",
    minutes: "03",
    text: "Take home souvenirs and memories, along with a new appreciation for the craft behind a familiar spice.",
  },
];

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    title: "Begin with the living tree.",
    text: "Explore the plantation and get to know the cinnamon tree before its bark becomes a familiar spice.",
    tag: "Explore",
  },
  {
    title: "Discover the harvest.",
    text: "Follow the artisan’s demonstration of traditional harvesting, then take part under their guidance.",
    tag: "Harvest",
  },
  {
    title: "Prepare with care.",
    text: "Try the traditional scraping and rubbing of the bark. Discover how patient preparation shapes the craft.",
    tag: "Prepare",
  },
  {
    title: "Find the feel of the peel.",
    text: "Experience peeling with the artisan beside you, learning through the movement of your own hands.",
    tag: "Peel",
  },
  {
    title: "A quill, made by hand.",
    text: "See how the bark is carefully prepared into quills and participate in quill-making with your guide.",
    tag: "Craft",
  },
];

export const FAQS: FaqItem[] = [
  {
    q: "What is included in the experience?",
    a: "Your visit includes a welcome, an introduction to Ceylon cinnamon heritage, plantation exploration, traditional demonstrations and hands-on participation, Q&A, cinnamon refreshments, souvenirs and farewell.",
  },
  {
    q: "How long is the experience?",
    a: "Allow approximately 120 minutes. The central Plantation to Quill journey takes 70 minutes, with time before and after for introductions, cinnamon heritage, refreshments, questions and farewell.",
  },
  {
    q: "How many people can join?",
    a: "The experience accommodates 1–10 guests. Include your guest count in your enquiry so arrangements can be discussed before your visit.",
  },
  {
    q: "Will I get to try the craft myself?",
    a: "Yes. This is a demonstration-led, interactive experience. Guests participate in harvesting, scraping, rubbing, peeling and quill-making under an artisan’s guidance.",
  },
  {
    q: "What refreshments are included?",
    a: "Cinnamon tea and drinks, cinnamon cake and locally prepared cinnamon treats are part of the experience. Include any dietary needs in your enquiry; suitability needs to be confirmed before booking.",
  },
  {
    q: "How do I book, and what does it cost?",
    a: "Use the enquiry form to prepare your preferred date and guest count. Package rates and availability need to be confirmed directly with the business. An enquiry is not a booking confirmation, and this site does not accept payment.",
  },
  {
    q: "Where is the plantation, and how do I get there?",
    a: "The experience is in Sri Lanka. The exact address, directions and any transport arrangements need to be confirmed directly with Ceylon Cinnamon Roots before you travel.",
  },
  {
    q: "What about accessibility, practical needs and cancellations?",
    a: "Please ask the business to confirm accessibility, suitable clothing, dietary arrangements and cancellation terms before booking. No unverified policies or access guarantees are published here.",
  },
];

export const NAV_LINKS = [
  ["The experience", "#experience"],
  ["Our heritage", "#heritage"],
  ["The plantation", "#plantation"],
  ["Gallery", "#gallery"],
] as const;
