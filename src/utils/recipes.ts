import { recipes } from "@/data/mock";
import type { Recipe } from "@/types/app";

function titleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function getRecipeForQuery(query: string): Recipe {
  const normalized = query.trim().toLowerCase();
  const match = recipes.find(
    (recipe) =>
      recipe.name.toLowerCase().includes(normalized) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(normalized)),
  );

  if (match || !normalized) {
    return match ?? recipes[0];
  }

  const base = recipes[0];
  return {
    ...base,
    id: `text-search-${normalized.replace(/\s+/g, "-")}`,
    name: titleCase(query),
    tags: ["Text Search", "Weeknight", "Ta-Daa Draft"],
    summary:
      "A fast MVP recipe draft based on your craving, ready to shop and cook with the guided flow.",
  };
}

export function getRecipeForRouteParams({
  query,
  recipeId,
}: {
  query?: string | string[];
  recipeId?: string | string[];
}) {
  const normalizedQuery = firstParam(query);
  const normalizedRecipeId = firstParam(recipeId);

  if (normalizedQuery) {
    return getRecipeForQuery(normalizedQuery);
  }

  return recipes.find((recipe) => recipe.id === normalizedRecipeId) ?? recipes[0];
}
