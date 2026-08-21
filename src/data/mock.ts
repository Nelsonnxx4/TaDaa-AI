import type { PantryItem, Recipe, Store } from "@/types/app";

export const heroImage =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=80";

export const recipes: Recipe[] = [
  {
    id: "creamy-garlic-pasta",
    name: "Creamy Garlic Pasta",
    imageUrl:
      "https://images.unsplash.com/photo-1645112411341-6c4fd023882c?auto=format&fit=crop&w=900&q=80",
    time: "20 mins",
    servings: 2,
    cost: "$18",
    rating: 4.8,
    tags: ["Under 20 Mins", "Italian", "Comfort"],
    summary:
      "Silky garlic cream sauce, parmesan, herbs, and pantry pasta for a fast weeknight dinner.",
    ingredients: [
      {
        id: "pasta",
        name: "Linguine",
        quantity: "8 oz",
        category: "Pantry Staples",
        owned: true,
      },
      {
        id: "cream",
        name: "Heavy cream",
        quantity: "1 cup",
        category: "Dairy",
        owned: false,
      },
      {
        id: "garlic",
        name: "Fresh garlic",
        quantity: "4 cloves",
        category: "Vegetables",
        owned: true,
      },
      {
        id: "parmesan",
        name: "Parmesan",
        quantity: "1/2 cup",
        category: "Dairy",
        owned: false,
      },
      {
        id: "parsley",
        name: "Parsley",
        quantity: "1 bunch",
        category: "Vegetables",
        owned: false,
      },
    ],
    steps: [
      {
        id: "boil",
        title: "Boil the pasta",
        body: "Salt a pot of water generously and cook the linguine until just shy of al dente.",
        durationSeconds: 480,
      },
      {
        id: "toast",
        title: "Bloom the garlic",
        body: "Warm olive oil in a skillet, add minced garlic, and stir until fragrant without browning.",
        durationSeconds: 90,
      },
      {
        id: "sauce",
        title: "Build the sauce",
        body: "Pour in cream, simmer gently, then fold in parmesan until the sauce turns glossy.",
        durationSeconds: 180,
      },
      {
        id: "finish",
        title: "Toss and finish",
        body: "Add pasta with a splash of cooking water, toss until coated, then finish with parsley.",
      },
    ],
  },
  {
    id: "protein-bowl",
    name: "Green Protein Bowl",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    time: "25 mins",
    servings: 2,
    cost: "$22",
    rating: 4.7,
    tags: ["High Protein", "Vegetarian", "Fresh"],
    summary:
      "A bright bowl with quinoa, avocado, greens, chickpeas, and lemon tahini dressing.",
    ingredients: [
      {
        id: "quinoa",
        name: "Cooked quinoa",
        quantity: "2 cups",
        category: "Pantry Staples",
        owned: true,
      },
      {
        id: "chickpeas",
        name: "Chickpeas",
        quantity: "1 can",
        category: "Proteins",
        owned: false,
      },
      {
        id: "avocado",
        name: "Avocado",
        quantity: "1 ripe",
        category: "Vegetables",
        owned: true,
      },
      {
        id: "greens",
        name: "Mixed greens",
        quantity: "4 cups",
        category: "Vegetables",
        owned: false,
      },
    ],
    steps: [
      {
        id: "warm",
        title: "Warm the grains",
        body: "Fluff quinoa in a skillet with a spoonful of olive oil and a pinch of salt.",
        durationSeconds: 120,
      },
      {
        id: "dressing",
        title: "Whisk the dressing",
        body: "Combine tahini, lemon juice, water, garlic, and salt until smooth.",
      },
      {
        id: "assemble",
        title: "Assemble the bowl",
        body: "Layer quinoa, chickpeas, avocado, and greens, then drizzle with dressing.",
      },
    ],
  },
  {
    id: "miso-salmon",
    name: "Miso Salmon Plate",
    imageUrl:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
    time: "30 mins",
    servings: 2,
    cost: "$28",
    rating: 4.9,
    tags: ["High Protein", "Dinner", "Japanese"],
    summary:
      "Glazed salmon with rice, crisp vegetables, and a sweet-savory miso finish.",
    ingredients: [
      {
        id: "salmon",
        name: "Salmon fillets",
        quantity: "2 fillets",
        category: "Proteins",
        owned: false,
      },
      {
        id: "miso",
        name: "White miso",
        quantity: "2 tbsp",
        category: "Pantry Staples",
        owned: false,
      },
      {
        id: "rice",
        name: "Steamed rice",
        quantity: "2 cups",
        category: "Pantry Staples",
        owned: true,
      },
      {
        id: "broccoli",
        name: "Broccoli",
        quantity: "1 head",
        category: "Vegetables",
        owned: true,
      },
    ],
    steps: [
      {
        id: "glaze",
        title: "Mix the glaze",
        body: "Whisk miso, honey, soy sauce, and a splash of warm water until smooth.",
      },
      {
        id: "roast",
        title: "Roast salmon",
        body: "Brush salmon with glaze and roast until flaky and caramelized around the edges.",
        durationSeconds: 720,
      },
      {
        id: "plate",
        title: "Plate it",
        body: "Serve over rice with broccoli and spoon extra glaze on top.",
      },
    ],
  },
  {
    id: "taco-night",
    name: "Street Taco Night",
    imageUrl:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80",
    time: "25 mins",
    servings: 4,
    cost: "$24",
    rating: 4.6,
    tags: ["Family", "Fast", "Spicy"],
    summary:
      "Warm tortillas, seasoned protein, crisp toppings, lime, and a quick salsa finish.",
    ingredients: [
      {
        id: "tortillas",
        name: "Corn tortillas",
        quantity: "12",
        category: "Pantry Staples",
        owned: false,
      },
      {
        id: "beef",
        name: "Ground beef",
        quantity: "1 lb",
        category: "Proteins",
        owned: false,
      },
      {
        id: "lime",
        name: "Limes",
        quantity: "2",
        category: "Vegetables",
        owned: true,
      },
      {
        id: "cilantro",
        name: "Cilantro",
        quantity: "1 bunch",
        category: "Vegetables",
        owned: false,
      },
    ],
    steps: [
      {
        id: "brown",
        title: "Brown the protein",
        body: "Cook beef with taco seasoning until browned and juicy.",
        durationSeconds: 420,
      },
      {
        id: "warm-tortillas",
        title: "Warm tortillas",
        body: "Toast tortillas in a dry pan until soft with a few golden spots.",
      },
      {
        id: "top",
        title: "Top and serve",
        body: "Fill tortillas, add cilantro and lime, then serve while warm.",
      },
    ],
  },
];

export const inspirationChips = [
  "Under 20 Mins",
  "High Protein",
  "Italian",
  "Vegetarian",
  "Family",
];

export const stores: Store[] = [
  {
    id: "fresh-market",
    name: "Fresh Market",
    distance: "1.2 km",
    rating: 4.7,
    eta: "8 min",
    available: ["Heavy cream", "Parmesan", "Parsley", "Salmon fillets"],
  },
  {
    id: "green-grocer",
    name: "Green Grocer",
    distance: "1.8 km",
    rating: 4.5,
    eta: "11 min",
    available: ["Mixed greens", "Avocado", "Cilantro", "Limes"],
  },
  {
    id: "city-supermart",
    name: "City Supermart",
    distance: "2.4 km",
    rating: 4.6,
    eta: "14 min",
    available: ["Corn tortillas", "Ground beef", "White miso", "Chickpeas"],
  },
];

export const pantryItems: PantryItem[] = [
  {
    id: "milk",
    name: "Whole Milk",
    quantity: "1 carton",
    category: "Dairy",
    expiresInDays: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "avocado",
    name: "Avocado",
    quantity: "2 left",
    category: "Vegetables",
    imageUrl:
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "chicken",
    name: "Chicken Breast",
    quantity: "1 lb",
    category: "Proteins",
    imageUrl:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rice",
    name: "Jasmine Rice",
    quantity: "3 cups",
    category: "Pantry Staples",
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
  },
];
