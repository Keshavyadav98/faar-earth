export type Product = {
  id: string;
  name: string;
  category:
    | "Edible Seeds"
    | "Cold Pressed Oils"
    | "Essential Oils"
    | "Pulses"
    | "Sweeteners"
    | "Private Label Solutions"
    | "Freeze Dried Fruits & Vegetables";
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
    image: "/Images/Spices.jpeg",
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
    id: "pulses",
    name: "Pulses",
    category: "Pulses",
    image: "/Images/pulses.jpg",
    description: "Sun-dried, sorted pulses and lentils supplied in bulk with consistent quality and moisture control.",
  },
  {
    id: "sweeteners",
    name: "Sweeteners",
    category: "Sweeteners",
    image: "/Images/sweeteners.jpeg",
    description: "Naturally derived sweeteners processed and packed to meet global food industry standards.",
  },
  {
    id: "private-label-solutions",
    name: "Private Label Solutions",
    category: "Private Label Solutions",
    image: "/Images/private label.png",
    description: "End-to-end private label and retail packaging solutions tailored to your brand's specifications.",
  },
  {
    id: "freeze-dried-fruits-vegetables",
    name: "Freeze Dried Fruits & Vegetables",
    category: "Freeze Dried Fruits & Vegetables",
    image: "/Images/freeze dried.jpg",
    description: "Freeze-dried fruits and vegetables that retain natural flavour, colour and nutrients.",
  },
];

export const categores = [
  {
    nameKey: "categories.editableSeeds",
    taglineKey: "categories.discoverMore",
    image: "/Images/black-sesame-seeds-with-oil.jpeg",
  },
  {
    nameKey: "categories.coldPressedOils",
    taglineKey: "categories.discoverMore",
    image: "/Images/almond-oil-bottle-white-background.jpeg",
  },
  {
    nameKey: "categories.whiteLabelling",
    taglineKey: "categories.discoverMore",
    image: "/Images/private label.png",
  },
];
