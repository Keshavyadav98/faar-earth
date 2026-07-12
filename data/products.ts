export type Product = {
  id: string;
  name: string;
  category: "Edible Seeds" | "Cold Pressed Oils" | "Essential Oils";
  image: string;
  description: string;
};

// Add or remove products freely — the "View all Products" modal
// and gallery both render however many entries exist here.
export const products: Product[] = [
  {
    id: "pumpkin-seeds",
    name: "Pumpkin Seeds",
    category: "Edible Seeds",
    image: "https://picsum.photos/seed/pumpkinseeds/600/450",
    description: "Hulled, sun-dried pumpkin seeds packed with natural oils and minerals.",
  },
  {
    id: "sunflower-seeds",
    name: "Sunflower Seeds",
    category: "Edible Seeds",
    image: "https://picsum.photos/seed/sunflowerseeds/600/450",
    description: "Premium grade sunflower seeds, cleaned and graded for bulk supply.",
  },
  {
    id: "flax-seeds",
    name: "Flax Seeds",
    category: "Edible Seeds",
    image: "https://picsum.photos/seed/flaxseeds/600/450",
    description: "Golden and brown flax seeds rich in omega-3 and dietary fibre.",
  },
  {
    id: "chia-seeds",
    name: "Chia Seeds",
    category: "Edible Seeds",
    image: "https://picsum.photos/seed/chiaseeds/600/450",
    description: "Farm-fresh chia seeds sourced responsibly for everyday nutrition.",
  },
  {
    id: "black-sesame",
    name: "Black Sesame Seeds",
    category: "Edible Seeds",
    image: "https://picsum.photos/seed/blacksesame/600/450",
    description: "Traditionally cleaned black sesame with a deep, nutty aroma.",
  },
  {
    id: "olive-oil",
    name: "Cold Pressed Olive Oil",
    category: "Cold Pressed Oils",
    image: "https://picsum.photos/seed/oliveoilfaar/600/450",
    description: "Slow, cold-pressed olive oil that retains natural flavour and nutrients.",
  },
  {
    id: "mustard-oil",
    name: "Cold Pressed Mustard Oil",
    category: "Cold Pressed Oils",
    image: "https://picsum.photos/seed/mustardoilfaar/600/450",
    description: "Traditionally extracted mustard oil with a bold, pungent character.",
  },
  {
    id: "sesame-oil",
    name: "Cold Pressed Sesame Oil",
    category: "Cold Pressed Oils",
    image: "https://picsum.photos/seed/sesameoilfaar/600/450",
    description: "Rich, aromatic sesame oil pressed without heat or chemicals.",
  },
  {
    id: "coconut-oil",
    name: "Cold Pressed Coconut Oil",
    category: "Cold Pressed Oils",
    image: "https://picsum.photos/seed/coconutoilfaar/600/450",
    description: "Virgin coconut oil extracted fresh, preserving natural sweetness.",
  },
  {
    id: "lavender-oil",
    name: "Lavender Essential Oil",
    category: "Essential Oils",
    image: "https://picsum.photos/seed/lavenderoilfaar/600/450",
    description: "Steam-distilled lavender oil with a calming, floral profile.",
  },
  {
    id: "tea-tree-oil",
    name: "Tea Tree Essential Oil",
    category: "Essential Oils",
    image: "https://picsum.photos/seed/teatreeoilfaar/600/450",
    description: "Pure tea tree oil, distilled for consistent potency and purity.",
  },
  {
    id: "eucalyptus-oil",
    name: "Eucalyptus Essential Oil",
    category: "Essential Oils",
    image: "https://picsum.photos/seed/eucalyptusoilfaar/600/450",
    description: "Fresh, camphoraceous eucalyptus oil for wellness applications.",
  },
];

export const categories = [
  {
    name: "Edible Seeds",
    tagline: "Discover More",
    image: "/Images/black-sesame-seeds-with-oil.jpg",
  },
  {
    name: "Cold Pressed Oils",
    tagline: "Discover More",
    image: "/Images/almond-oil-bottle-white-background.jpg",
  },
  {
    name: "Essential Oils",
    tagline: "Discover More",
    image: "/Images/essential-oil-black-cuminselectiv-focusb-nature-food.jpg",
  },
  
];
