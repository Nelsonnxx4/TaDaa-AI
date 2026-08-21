export type AppScreen = "home" | "ingredients" | "cook" | "pantry" | "profile";

export type Ingredient = {
  id: string;
  name: string;
  quantity: string;
  category: string;
  owned: boolean;
};

export type CookingStep = {
  id: string;
  title: string;
  body: string;
  durationSeconds?: number;
};

export type Recipe = {
  id: string;
  name: string;
  imageUrl: string;
  time: string;
  servings: number;
  cost: string;
  rating: number;
  tags: string[];
  summary: string;
  ingredients: Ingredient[];
  steps: CookingStep[];
};

export type Store = {
  id: string;
  name: string;
  distance: string;
  rating: number;
  eta: string;
  available: string[];
};

export type PantryItem = {
  id: string;
  name: string;
  quantity: string;
  category: string;
  expiresInDays?: number;
  imageUrl: string;
};
