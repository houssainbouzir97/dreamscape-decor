export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  image: string;
  sizes: { label: string; dimensions: string; price: number }[];
  material: string;
  badge?: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "DSC-001",
    name: "Tree of Life",
    slug: "tree-of-life",
    description: "Un arbre de vie majestueux avec des oiseaux en vol, symbole de croissance et de liberté. Une pièce intemporelle pour votre intérieur.",
    category: "Nature",
    image: "DSC-001",
    sizes: [
      { label: "40×40 cm", dimensions: "40x40", price: 60 },
      { label: "60×60 cm", dimensions: "60x60", price: 85 },
      { label: "80×80 cm", dimensions: "80x80", price: 105 },
    ],
    material: "Alucobond",
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: "DSC-002",
    name: "Birds of Life",
    slug: "birds-of-life",
    description: "Un triptyque élégant représentant des oiseaux perchés sur des branches, apportant vie et nature à votre mur.",
    category: "Nature",
    image: "DSC-002",
    sizes: [
      { label: "110×65 cm", dimensions: "110x65", price: 115 },
      { label: "120×72 cm", dimensions: "120x72", price: 139 },
      { label: "145×85 cm", dimensions: "145x85", price: 165 },
    ],
    material: "Alucobond",
    inStock: true,
  },
  {
    id: "DSC-003",
    name: "Branch of Life",
    slug: "branch-of-life",
    description: "Des oiseaux posés sur une branche, une scène naturelle et apaisante qui ajoute du charme à tout espace.",
    category: "Nature",
    image: "DSC-003",
    sizes: [
      { label: "90×45 cm", dimensions: "90x45", price: 75 },
      { label: "100×49 cm", dimensions: "100x49", price: 100 },
      { label: "113×56 cm", dimensions: "113x56", price: 115 },
    ],
    material: "Alucobond",
    inStock: true,
  },
  {
    id: "DSC-004",
    name: "Sunset of Freedom",
    slug: "sunset-of-freedom",
    description: "Un coucher de soleil poétique avec des mouettes en vol. Une œuvre qui évoque la liberté et la sérénité.",
    category: "Nature",
    image: "DSC-004",
    sizes: [
      { label: "70×40 cm", dimensions: "70x40", price: 60 },
      { label: "90×50 cm", dimensions: "90x50", price: 85 },
      { label: "118×65 cm", dimensions: "118x65", price: 111 },
    ],
    material: "Alucobond",
    badge: "Populaire",
    inStock: true,
  },
  {
    id: "DSC-005",
    name: "Kissing Silhouette",
    slug: "kissing-silhouette",
    description: "Un triptyque artistique représentant deux visages entrelacés dans les branches d'un arbre. Parfait pour les couples.",
    category: "Abstrait",
    image: "DSC-005",
    sizes: [
      { label: "122×70 cm", dimensions: "122x70", price: 130 },
      { label: "152×87 cm", dimensions: "152x87", price: 159 },
      { label: "190×108 cm", dimensions: "190x108", price: 215 },
    ],
    material: "Alucobond",
    inStock: true,
  },
  {
    id: "DSC-006",
    name: "Window of Freedom",
    slug: "window-of-freedom",
    description: "Une fenêtre ouverte avec des oiseaux perchés, symbolisant la liberté et l'évasion. Un design unique et poétique.",
    category: "Nature",
    image: "DSC-006",
    sizes: [
      { label: "50×35 cm", dimensions: "50x35", price: 70 },
      { label: "49×70 cm", dimensions: "49x70", price: 85 },
      { label: "63×90 cm", dimensions: "63x90", price: 99 },
    ],
    material: "Alucobond",
    inStock: true,
  },
  {
    id: "DSC-007",
    name: "Khomssa",
    slug: "khomssa",
    description: "La main de Fatma, un symbole de protection et de bénédiction. Un design traditionnel avec une touche moderne.",
    category: "Islamique",
    image: "DSC-007",
    sizes: [
      { label: "60×49 cm", dimensions: "60x49", price: 55 },
      { label: "65×80 cm", dimensions: "65x80", price: 85 },
    ],
    material: "Alucobond",
    badge: "Nouveau",
    inStock: true,
  },
  {
    id: "DSC-008",
    name: "Circle of Life",
    slug: "circle-of-life",
    description: "Des oiseaux dans un cercle de branches et de feuilles. Un design harmonieux qui apporte nature et élégance.",
    category: "Nature",
    image: "DSC-008",
    sizes: [
      { label: "50×45 cm", dimensions: "50x45", price: 60 },
      { label: "60×55 cm", dimensions: "60x55", price: 85 },
      { label: "80×75 cm", dimensions: "80x75", price: 105 },
    ],
    material: "Alucobond",
    inStock: true,
  },
  {
    id: "DSC-009",
    name: "Harmony Panels",
    slug: "harmony-panels",
    description: "Un set de 3 panneaux bohème avec soleil, montagnes et arc-en-ciel. L'harmonie parfaite pour un intérieur chaleureux.",
    category: "Abstrait",
    image: "DSC-009",
    sizes: [
      { label: "111×54 cm", dimensions: "111x54", price: 105 },
      { label: "140×65 cm", dimensions: "140x65", price: 125 },
    ],
    material: "Alucobond",
    badge: "Exclusif",
    inStock: true,
  },
  {
    id: "DSC-010",
    name: "Cubist Faces",
    slug: "cubist-faces",
    description: "Un triptyque de visages cubistes modernes. Un art mural audacieux qui fait forte impression.",
    category: "Abstrait",
    image: "DSC-010",
    sizes: [
      { label: "122×60 cm", dimensions: "122x60", price: 110 },
      { label: "152×75 cm", dimensions: "152x75", price: 140 },
      { label: "182×90 cm", dimensions: "182x90", price: 175 },
    ],
    material: "Alucobond",
    inStock: true,
  },
  {
    id: "DSC-011",
    name: "Trio of Stillness",
    slug: "trio-of-stillness",
    description: "Un triptyque d'oiseaux perchés sur des branches, capturant un moment de calme et de sérénité. Art mural nature en métal découpé.",
    category: "Nature",
    image: "DSC-011",
    sizes: [
      { label: "126×72 cm", dimensions: "126x72", price: 115 },
      { label: "139×80 cm", dimensions: "139x80", price: 135 },
      { label: "152×87 cm", dimensions: "152x87", price: 160 },
    ],
    material: "Alucobond",
    inStock: true,
  },
  {
    id: "DSC-012",
    name: "Butterfly Dance",
    slug: "butterfly-dance",
    description: "Un set de 3 papillons en vol, apportant légèreté et poésie à votre décoration murale. Design élégant et aérien.",
    category: "Nature",
    image: "DSC-012",
    sizes: [
      { label: "44×35 cm", dimensions: "44x35", price: 69 },
    ],
    material: "Alucobond",
    inStock: true,
  },
  {
    id: "DSC-013",
    name: "Set Flying Birds",
    slug: "set-flying-birds",
    description: "Un ensemble de 5 oiseaux en vol, créant un mouvement dynamique sur votre mur. Parfait pour un intérieur moderne.",
    category: "Nature",
    image: "DSC-013",
    sizes: [
      { label: "30×20 cm", dimensions: "30x20", price: 45 },
    ],
    material: "Alucobond",
    inStock: true,
  },
  {
    id: "DSC-014",
    name: "Window Birds",
    slug: "window-birds",
    description: "Une fenêtre arrondie avec des oiseaux sur une branche et des plantes en pot. Un design charmant et accueillant.",
    category: "Nature",
    image: "DSC-014",
    sizes: [
      { label: "50×36 cm", dimensions: "50x36", price: 50 },
    ],
    material: "Alucobond",
    inStock: true,
  },
  {
    id: "DSC-015",
    name: "The Secret Ingredient",
    slug: "the-secret-ingredient",
    description: "\"The Secret Ingredient is Love\" — une phrase inspirante en métal découpé, idéale pour la cuisine ou la salle à manger.",
    category: "Citation",
    image: "DSC-015",
    sizes: [
      { label: "60×50 cm", dimensions: "60x50", price: 45 },
    ],
    material: "Alucobond",
    inStock: true,
  },
  {
    id: "DSC-016",
    name: "Solar Harmony Trio",
    slug: "solar-harmony-trio",
    description: "Un triptyque géométrique avec soleil, arcs et formes abstraites. Un art mural moderne et audacieux.",
    category: "Abstrait",
    image: "DSC-016",
    sizes: [
      { label: "150×50 cm", dimensions: "150x50", price: 99 },
    ],
    material: "Alucobond",
    inStock: true,
  },
  {
    id: "DSC-017",
    name: "World Map",
    slug: "world-map",
    description: "Une carte du monde en métal découpé avec les noms des pays. Une pièce imposante pour les amateurs de voyage.",
    category: "Abstrait",
    image: "DSC-017",
    sizes: [
      { label: "155×85 cm", dimensions: "155x85", price: 165 },
      { label: "182×105 cm", dimensions: "182x105", price: 200 },
    ],
    material: "Alucobond",
    inStock: true,
  },
  {
    id: "DSC-018",
    name: "Cat Window",
    slug: "cat-window",
    description: "Une fenêtre ouverte avec des oiseaux perchés sur les barreaux. Un design poétique et chaleureux pour tout espace.",
    category: "Nature",
    image: "DSC-018",
    sizes: [
      { label: "45×45 cm", dimensions: "45x45", price: 45 },
      { label: "60×60 cm", dimensions: "60x60", price: 75 },
      { label: "76×76 cm", dimensions: "76x76", price: 110 },
    ],
    material: "Alucobond",
    inStock: true,
  },
  {
    id: "DSC-019",
    name: "Geometric Shapes",
    slug: "geometric-shapes",
    description: "Un triptyque de formes géométriques abstraites — cercles, lignes et volumes. Art mural contemporain et sophistiqué.",
    category: "Abstrait",
    image: "DSC-019",
    sizes: [
      { label: "60×110 cm", dimensions: "60x110", price: 75 },
      { label: "70×127 cm", dimensions: "70x127", price: 99 },
      { label: "80×144 cm", dimensions: "80x144", price: 140 },
    ],
    material: "Alucobond",
    inStock: true,
  },
  {
    id: "DSC-020",
    name: "Sleeping Panda",
    slug: "sleeping-panda",
    description: "Un panda endormi sur une branche de bambou. Un design adorable, parfait pour une chambre d'enfant.",
    category: "Nature",
    image: "DSC-020",
    sizes: [
      { label: "60×48 cm", dimensions: "60x48", price: 65 },
      { label: "75×60 cm", dimensions: "75x60", price: 90 },
    ],
    material: "Alucobond",
    inStock: true,
  },
  {
    id: "DSC-021",
    name: "Little Miracle",
    slug: "little-miracle",
    description: "Une silhouette line-art d'une mère et son bébé, un symbole d'amour et de tendresse. Parfait pour une chambre d'enfant.",
    category: "Abstrait",
    image: "DSC-021",
    sizes: [
      { label: "90×49 cm", dimensions: "90x49", price: 85 },
    ],
    material: "Alucobond",
    badge: "Nouveau",
    inStock: true,
  },
  {
    id: "DSC-022",
    name: "Ethereal Muse",
    slug: "ethereal-muse",
    description: "Un portrait abstrait en lignes continues, capturant l'élégance et le mystère. Une pièce d'art contemporain pour votre intérieur.",
    category: "Abstrait",
    image: "DSC-022",
    sizes: [
      { label: "63×44 cm", dimensions: "63x44", price: 75 },
      { label: "70×49 cm", dimensions: "70x49", price: 104 },
      { label: "80×56 cm", dimensions: "80x56", price: 125 },
    ],
    material: "Alucobond",
    inStock: true,
  },
];

export const categories = ["Tous", "Nature", "Abstrait", "Islamique", "Citation"];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);

export const getProductImage = (imageKey: string) => {
  // Legacy function - prefer using imageMap from components directly
  return "";
};
