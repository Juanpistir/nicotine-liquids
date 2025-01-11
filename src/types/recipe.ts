export interface Ingredient {
  name: string;
  percentage: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  totalMl: number;
  nicotineStrength: number;
}

export interface RecipeFormData {
  name: string;
  description: string;
  ingredients: Ingredient[];
  totalMl: number;
  nicotineStrength: number;
}
