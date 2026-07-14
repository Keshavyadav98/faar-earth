export type Product = {
  id: string;
  name: string;
  category: "Seeds" | "Spices" | "Nuts" | "Oils" | "Nature-derived Food Additives" | "Plant-based Protein Powders" | "Plant Extracts" | "Dietary Fibre";
  image: string;
  description: string;
};

// Add or remove products freely — the "View all Products" modal
// and gallery both render however many entries exist here.
export const products: Product[] = [
  {
    id: "pumpkin-seeds",
    name: "Pumpkin Seeds",
    category: "Seeds",
    image: "/Images/macro-green-pumpkin-seeds-texture.jpeg",
    description: "Hulled, sun-dried pumpkin seeds packed with natural oils and minerals.",
  },
  {
    id: "sunflower-seeds",
    name: "Sunflower Seeds",
    category: "Spices",
    image: "https://picsum.photos/seed/sunflowerseeds/600/450",
    description: "Premium grade sunflower seeds, cleaned and graded for bulk supply.",
  },
  {
    id: "flax-seeds",
    name: "Flax Seeds",
    category: "Seeds",
    image: "https://picsum.photos/seed/flaxseeds/600/450",
    description: "Golden and brown flax seeds rich in omega-3 and dietary fibre.",
  },
  {
    id: "chia-seeds",
    name: "Chia Seeds",
    category: "Seeds",
    image: "https://picsum.photos/seed/chiaseeds/600/450",
    description: "Farm-fresh chia seeds sourced responsibly for everyday nutrition.",
  },
];

export const categories = [
  {
    name: "Edible Seeds",
    tagline: "Discover More",
    image: "/Images/black-sesame-seeds-with-oil.jpeg",
  },
  {
    name: "Cold Pressed Oils",
    tagline: "Discover More",
    image: "/Images/almond-oil-bottle-white-background.jpeg",
  },
  {
    name: "Essential Oils",
    tagline: "Discover More",
    image: "/Images/essential-oil-black-cuminselectiv-focusb-nature-food.jpeg",
  },
  
];
