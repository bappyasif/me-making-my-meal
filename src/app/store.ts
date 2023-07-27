import { configureStore } from "@reduxjs/toolkit";
// import SliceReducer from "../features/slices";
import IngredientsReducer from "../features/ingredients/ingredientSlice";
import CategoryReducer from "../features/category/categorySlice";
import CuisineReducer from "../features/area/areaSlices";
import RandomMealReducer from "../features/randoms/randomMealsSlice";
import MealsReducer from "../features/meals/mealsSlice";
import CategoriesReducer from "../features/categories/categoriesSlice";

const store = configureStore({
    reducer: {
        // [index:string]: Reducer<InitType>,
        // counter: SliceReducer,
        cuisine: CuisineReducer,
        categories: CategoriesReducer,
        category: CategoryReducer,
        ingredient: IngredientsReducer,
        randomMeal: RandomMealReducer,
        meal: MealsReducer
    }
})

export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store