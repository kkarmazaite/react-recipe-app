export interface Meal {
  dateModified: string;
  idMeal: string;
  strArea: string;
  strCategory: string;
  strCountry: string;
  strCreativeCommonsConfirmed: string | null;
  strImageSource: string | null;

  strInstructions: string;
  strMeal: string;
  strMealAlternate: string | null;
  strMealThumb: string;

  strSource: string;
  strTags: string | null;
  strYoutube: string;

  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}
