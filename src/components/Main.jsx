import React from "react";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../ai";
import MistralRecipe from "./MistralRecipe";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  async function getRecipe() {
    const result = await getRecipeFromMistral(ingredients);
    setRecipe(result);
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. tomato"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} handleClick={getRecipe} />
      )}

      {<MistralRecipe recipe={recipe} />}
    </main>
  );
}
