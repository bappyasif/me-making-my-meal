import { createSlice } from "@reduxjs/toolkit";
import { fetchOneRandomMeal } from "../../data_fetching";

type MealType = {
    category: string,
    cuisine: string,
    mealId: string,
    mealName: string,
    mealThumb: string
}


const initRandomMealState: MealType = {
    category: "",
    cuisine: "",
    mealId: "",
    mealName: "",
    mealThumb: ""
}

const randomMealSlice = createSlice({
    initialState: initRandomMealState,
    name: "random meals",
    reducers: {

    },

    extraReducers: builder => {
        builder.addCase(fetchOneRandomMeal.fulfilled, (state, action) => {
            // console.log(action.payload, "ITEM!!")
            action.payload.meals.map((item: any) => {
                const meal: MealType = {
                    category: item.strCategory,
                    cuisine: item.strArea,
                    mealId: item.idMeal,
                    mealName: item.strMeal,
                    mealThumb: item.strMealThumb
                }

                state.category = meal.category
                state.cuisine = meal.cuisine
                state.mealId = meal.mealId
                state.mealName = meal.mealName
                state.mealThumb = meal.mealThumb
            })
        })
    }
});

const RandomMealReducer = randomMealSlice.reducer

export default RandomMealReducer