export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  date: string;
  category: string;
  slugLink: string;
};

// Curated posts bundled with the app. New posts created via the /api/blogs
// endpoint are stored separately (see lib/blogStore.ts) and merged in at
// render time on the blog listing page.
export const staticPosts: BlogPost[] = [
  {
    id: 1,
    slug: "oleoresins-and-spice-oils-why-indias-natural-flavour-exports-are-booming-worldwide",
    title:
      "Oleoresins and Spice Oils: Why India's Natural Flavour Exports Are Booming Worldwide",
    description:
      "India's oleoresins and spice oils are transforming global food, pharma, and cosmetics industries. As the world's largest producer and exporter of spices, India supplies premium turmeric oleoresin, pepper oleoresin, chilli oleoresin, and pure spice essential oils to manufacturers across the US, Europe, and Asia.",
    thumbnail: "/Images/blog/oleoresins-spice-oils-hero.jpg",
    author: "Editorial Team",
    date: "01 Aug 2026",
    category: "Series",
    slugLink:
      "/blog/oleoresins-and-spice-oils-why-indias-natural-flavour-exports-are-booming-worldwide",
  },
  {
    id: 2,
    slug: "turmeric-oleoresin-the-golden-extract-powering-global-food-health-beauty-industries",
    title:
      "Turmeric Oleoresin: The Golden Extract Powering Global Food, Health & Beauty Industries",
    description:
      "If there's one Indian spice extract quietly showing up in products across supermarket shelves worldwide, it's turmeric oleoresin. Behind the vivid orange-yellow hue in sauces, snacks, supplements, and skincare, chances are there's a concentrated dose of Indian turmeric doing the work.",
    thumbnail: "/Images/blog/turmeric-oleoresin-hero.jpg",
    author: "Editorial Team",
    date: "08 Aug 2026",
    category: "Series",
    slugLink:
      "/blog/turmeric-oleoresin-the-golden-extract-powering-global-food-health-beauty-industries",
  },
  {
    id: 3,
    slug: "ginger-oleoresin-the-concentrated-heat-behind-the-worlds-favourite-flavours",
    title:
      "Ginger Oleoresin: The Concentrated Heat Behind the World's Favourite Flavours",
    description:
      "Ginger is one of the most recognisable flavours on the planet — sharp, warm, and unmistakable in everything from ginger ale to Asian stir-fries to wellness shots. But behind many of those products isn't fresh ginger root at all. It's ginger oleoresin, a concentrated extract that's become a staple ingredient for food, beverage, and pharmaceutical manufacturers worldwide.",
    thumbnail: "/Images/blog/ginger-oleoresin-hero.jpg",
    author: "Editorial Team",
    date: "15 Aug 2026",
    category: "Series",
    slugLink: "/blog/ginger-oleoresin-the-concentrated-heat-behind-the-worlds-favourite-flavours",
  },
  {
    id: 4,
    slug: "paprika-oleoresin-india-guide",
    title:
      "Paprika Oleoresin: The Natural Red Colourant Replacing Synthetic Dyes Worldwide",
    description:
      "Open almost any packet of processed meat, cheese snack, or ready-made sauce with a rich red-orange colour, and there's a good chance paprika oleoresin is responsible. It's one of the most widely used natural colourants in the food industry — and demand for it has never been higher.",
    thumbnail: "/Images/blog/paprika-oleoresin-hero.jpg",
    author: "Editorial Team",
    date: "22 Aug 2026",
    category: "Series",
    slugLink: "/blog/paprika-oleoresin-india-guide",
  },
  {
    id: 5,
    slug: "pepper-oleoresin-the-concentrated-extract-behind-the-king-of-spices",
    title: "Pepper Oleoresin: The Concentrated Extract Behind \"The King of Spices\"",
    description:
      "Black pepper has been called the king of spices for centuries, and today its concentrated form — pepper oleoresin — is doing quiet, heavy lifting across the global flavour, pharmaceutical, and nutraceutical industries.",
    thumbnail: "/Images/blog/pepper-oleoresin-hero.jpg",
    author: "Editorial Team",
    date: "29 Aug 2026",
    category: "Series",
    slugLink: "/blog/pepper-oleoresin-the-concentrated-extract-behind-the-king-of-spices",
  },
];

export function findStaticPostBySlug(slug: string): BlogPost | null {
  return staticPosts.find((p) => p.slug === slug) ?? null;
}
