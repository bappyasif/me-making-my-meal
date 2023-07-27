import { createSlice } from "@reduxjs/toolkit"
import { fetchFilterByCategory } from "../../data_fetching"

export type MealItemType = {
    id: string,
    mealName: string,
    mealImg: string
}

type CategoryMealsType = {
    meals: MealItemType[]
}

const initialStateForCategoryMeals: CategoryMealsType = {
    meals: []
}

const categoryMealsSlice = createSlice({
    initialState: initialStateForCategoryMeals,
    name: "category meals",
    reducers: {
        
    },
    extraReducers: builder => {
        builder.addCase(fetchFilterByCategory.fulfilled, (state, action) => {
            console.log(action.payload, "")
            state.meals = action.payload.meals.map((item:any) => {
                return {
                    id: item.idMeal,
                    mealName: item.strMeal,
                    mealImg: item.strMealThumb,
                    count: 0
                }
            })
        })
    }
})

const CategoryReducer = categoryMealsSlice.reducer;

export default CategoryReducer;