import { createAsyncThunk } from "@reduxjs/toolkit";
import { readingDataFromFirestoreSubCollection } from "../firebase/utils";

const CATEGORIES_URL = "https://www.themealdb.com/api/json/v1/1/categories.php"

const AREA_URL = "https://www.themealdb.com/api/json/v1/1/list.php?a=list"


export const fetchCategoriesFromAPI = createAsyncThunk("fetchCategories", async () => {
    const response = await fetch(CATEGORIES_URL);
    return response.json()
})

export const fetchCategoriesFromFirebase = createAsyncThunk("fetchCategoriesFromFirebase", async () => {

    const subCollData = await readingDataFromFirestoreSubCollection("Categories", "Category")

    return { categories: subCollData }
})

export const fetchCuisines = createAsyncThunk("fetchCuisines", async () => {
    const response = await fetch(AREA_URL);
    return response.json()
})

export const fetchCuisinesFromFirebase = createAsyncThunk("fetchCuisinesFromFirebase", async () => {

    const subCollData = await readingDataFromFirestoreSubCollection("Cuisines", "Cuisine")

    return { cuisines: subCollData }
})

export const fetchFilterByCategory = createAsyncThunk("fetchMealsByCategory", async (category: string) => {
    const CATEGORY_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    // console.log(category, CATEGORY_URL, "urls@!")
    const response = await fetch(CATEGORY_URL);
    return response.json()
})

export const fetchMealDetails = createAsyncThunk("fetchMealById", async (mealId: string) => {
    const MEAL_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    // console.log(mealId, MEAL_URL)
    const response = await fetch(MEAL_URL);
    return response.json()
})

export const fetchViewedMealsFromFirebase = createAsyncThunk("fetchViewedMealsFromFirebase", async () => {

    const subCollData = await readingDataFromFirestoreSubCollection("Meals", "Meal")

    return { meals: subCollData }
})

export const fetchCuisineMeals = createAsyncThunk("fetchCuisineMeals", async (cuisineName: string) => {
    const CUISINE_MEALS_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisineName}`

    const response = await fetch(CUISINE_MEALS_URL);
    return response.json()
})

export const fetchIngredients = createAsyncThunk("fetchIngredients", async () => {
    const INGREDIENTS_URL = "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    const response = await fetch(INGREDIENTS_URL);
    return response.json()
});

export const fetchIngredientsFromFirebase = createAsyncThunk("fetchIngredientsFromFirebase", async () => {

    const subCollData = await readingDataFromFirestoreSubCollection("Ingredients", "Ingredient")

    return { ingredients: subCollData }
})

export const fetchMealsByIngredient = createAsyncThunk("fetchMealsByIngredient", async (name: string) => {
    const INGREDIENT_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
    const response = await fetch(INGREDIENT_URL);
    return response.json()
})

export const fetchOneRandomMeal = createAsyncThunk("fetchRandomMeal", async () => {
    const RANDOM_MEAL_URL = `https://www.themealdb.com/api/json/v1/1/random.php`
    const response = await fetch(RANDOM_MEAL_URL);
    // console.log(response.json(), "INGREIO RUNNNSNSNSNS")
    return response.json()
})