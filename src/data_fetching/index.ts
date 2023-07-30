import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";
import { readingDataFromFirestore, readingDataFromFirestoreSubCollection } from "../firebase/utils";
import { useToFetchDataFromFirebase } from "../hooks/forComponents";

const CATEGORIES_URL = "https://www.themealdb.com/api/json/v1/1/categories.php"

const AREA_URL = "https://www.themealdb.com/api/json/v1/1/list.php?a=list"


// export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
//     const response = await fetch(CATEGORIES_URL);
//     return response.json()
// })

// export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
//     const { filteredData } = await useToFetchDataFromFirebase("categories")

//     if (filteredData?.length) {
//         return { categories: filteredData[0].categories }
//     } else {
//         const response = await fetch(CATEGORIES_URL);
//         return response.json()
//     }
// })
// export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
//     const { filteredData } = await useToFetchDataFromFirebase("categories")
    
//     const subCollData = await readingDataFromFirestoreSubCollection("Categories", "Category")

//     const response = await fetch(CATEGORIES_URL);

//     console.log(subCollData, await response.json())

//     if (filteredData?.length) {
//         return { categories: filteredData[0].categories }
//     } else {
//         const response = await fetch(CATEGORIES_URL);
//         return response.json()
//     }
// })
export const fetchCategoriesFromAPI = createAsyncThunk("fetchCategories", async () => {
    const { filteredData } = await useToFetchDataFromFirebase("categories")
    
    const subCollData = await readingDataFromFirestoreSubCollection("Categories", "Category")

    const response = await fetch(CATEGORIES_URL);
    return response.json()

    console.log(subCollData, await response.json())

    if (filteredData?.length) {
        return { categories: filteredData[0].categories }
    } else {
        const response = await fetch(CATEGORIES_URL);
        return response.json()
    }
})

export const fetchCategoriesFromFirebase = createAsyncThunk("fetchCategoriesFromFirebase", async () => {
    
    const subCollData = await readingDataFromFirestoreSubCollection("Categories", "Category")

    return { categories: subCollData }
})

// export const fetchCuisines = createAsyncThunk("meals/ferchCuisines", async () => {
//     const fbResp = await readingDataFromFirestore("4M")
//     const onlyCuisines = fbResp.filter(item => Object.keys(item)[0] === "cuisines")
//     // console.log(onlyCuisines[0].cuisines, "FIREBASE CUISINES")


//     // const response = await fetch(AREA_URL);
//     // return response.json()
//     return {meals: onlyCuisines[0].cuisines}
// })

export const fetchCuisines = createAsyncThunk("meals/ferchCuisines", async () => {
    // const fbResp = await readingDataFromFirestore("4M")
    // const onlyCuisines = fbResp.filter(item => Object.keys(item)[0] === "cuisines")
    // console.log(onlyCuisines[0].cuisines, "FIREBASE CUISINES")

    const { filteredData } = await useToFetchDataFromFirebase("cuisines")

    if (filteredData?.length) {
        return { meals: filteredData[0].cuisines }
    } else {
        const response = await fetch(AREA_URL);
        return response.json()
    }
})

export const fetchFilterByCategory = createAsyncThunk("fetchMealsByCategory", async (category: string) => {
    // const category2 = useAppSelector(state => state.category.viewCategory);
    const CATEGORY_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    console.log(category, CATEGORY_URL, "urls@!")
    const response = await fetch(CATEGORY_URL);
    return response.json()
})

export const fetchMealDetails = createAsyncThunk("fetchMealById", async (mealId: string) => {
    const MEAL_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    console.log(mealId, MEAL_URL)
    const response = await fetch(MEAL_URL);
    return response.json()
})

export const fetchViewedMealsList = createAsyncThunk("fetchViwedMeals", async () => {
    const { filteredData } = await useToFetchDataFromFirebase("meals")

    if (filteredData?.length) {
        return { meals: filteredData[0].meals }
    }
})

export const fetchCuisineMeals = createAsyncThunk("fetchCuisineMeals", async (cuisineName: string) => {
    const CUISINE_MEALS_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisineName}`

    const response = await fetch(CUISINE_MEALS_URL);
    return response.json()
})

// export const fetchIngredients = createAsyncThunk("fetchIngredients", async () => {
//     const INGREDIENTS_URL = "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
//     const response = await fetch(INGREDIENTS_URL);
//     return response.json()
// });

export const fetchIngredients = createAsyncThunk("fetchIngredients", async () => {
    const { filteredData } = await useToFetchDataFromFirebase("ingredients")

    if (filteredData?.length) {
        return { meals: filteredData[0].ingredients }
    } else {
        const INGREDIENTS_URL = "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
        const response = await fetch(INGREDIENTS_URL);
        return response.json()
    }
});

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