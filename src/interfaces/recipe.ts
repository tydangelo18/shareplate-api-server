import { RecipeType } from "src/utils/enums";

export interface Recipe {
  id: string;
  post_id: string;
  type: RecipeType;
  link?: string;
  ingredients: string[];
  content: string;
}
