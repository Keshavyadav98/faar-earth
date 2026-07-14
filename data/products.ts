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
    image: "/Images/macro-green-pumpkin-seeds-texture.jpeg",
    description: "Hulled, sun-dried pumpkin seeds packed with natural oils and minerals.",
  },
  {
    id: "sunflower-seeds",
    name: "Sunflower Seeds",
    category: "Edible Seeds",
    image: "/Images/bda6c30c-aed8-4544-81aa-173749df57a3.jpeg",
    description: "Premium grade sunflower seeds, cleaned and graded for bulk supply.",
  },
  {
    id: "flax-seeds",
    name: "Flax Seeds",
    category: "Edible Seeds",
    image: "/Images/almond-oil-bottle-white-background.jpeg",
    description: "Golden and brown flax seeds rich in omega-3 and dietary fibre.",
  },
  {
    id: "chia-seeds",
    name: "Chia Seeds",
    category: "Edible Seeds",
    image: "/Images/moringa-seed-oil.jpeg",
    description: "Farm-fresh chia seeds sourced responsibly for everyday nutrition.",
  },
  {
    id: "black-sesame",
    name: "Black Sesame Seeds",
    category: "Edible Seeds",
    image: "/Images/a993e52e-e34b-4a27-a738-c616a4ead5a7.jpeg",
    description: "Traditionally cleaned black sesame with a deep, nutty aroma.",
  },
  {
    id: "olive-oil",
    name: "Cold Pressed Olive Oil",
    category: "Cold Pressed Oils",
    image: "/Images/flax seeds image.jpeg",
    description: "Slow, cold-pressed olive oil that retains natural flavour and nutrients.",
  },
  {
    id: "mustard-oil",
    name: "Cold Pressed Mustard Oil",
    category: "Cold Pressed Oils",
    image: "/Images/henna-mehandi-powder-paste-prepared-hair-colouring-tattoo-hand-indian-weddings-festivals-selective-focus.jpeg",
    description: "Traditionally extracted mustard oil with a bold, pungent character.",
  },
  {
    id: "coconut-oil",
    name: "Cold Pressed Coconut Oil",
    category: "Cold Pressed Oils",
    image: "/Images/dietary-fiber-heap-psyllium-husk-powder-scoop-isolated-white.jpeg",
    description: "Virgin coconut oil extracted fresh, preserving natural sweetness.",
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
    name: "White Labelling",
    tagline: "Discover More",
    image: "/Images/essential-oil-black-cuminselectiv-focusb-nature-food.jpeg",
  },
  
];
