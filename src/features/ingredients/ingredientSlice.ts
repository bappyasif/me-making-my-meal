import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients, fetchMealsByIngredient } from "../../data_fetching";
import { MealItemType } from "../category/categorySlice";

export type IngredientsType = {
    // [index: string]: number;
    id: string,
    name: string,
    count: number,
    description?: string
}

export type IngredientsListType = {
    list: IngredientsType[]
}

export type InitIngredientStateType = {
    list: IngredientsType[],
    meals: MealItemType[]
}

const initIngredientState: InitIngredientStateType = {
    list: [],
    meals: []
}

const ingredientSlices = createSlice({
    initialState: initIngredientState,
    name: "ingredients",
    reducers: {
        increaseCountForIngredient: (state, action) => {
            state.list = state.list.map(item => {
                if (item.name === action.payload) {
                    item.count += 1
                    console.log("count incremented", action.payload, item.name)
                }
                return item
            })
            // console.log(state.list, "after increase!!")
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchIngredients.fulfilled, (state, action) => {
            state.list = action.payload.meals.map((item: any) => {
                const ingredient: IngredientsType = {
                    id: item.idIngredient,
                    name: item.strIngredient,
                    description: item.strDescription,
                    count: 0
                }

                return ingredient
            })
            console.log(action.payload, "payload ingredients!!")
        }),
            builder.addCase(fetchMealsByIngredient.fulfilled, (state, action) => {
                state.meals = action.payload.meals.map((item: any) => {
                    return {
                        id: item.idMeal,
                        mealName: item.strMeal,
                        mealImg: item.strMealThumb
                    }
                })
                console.log(action.payload, "ingredient meals")
            })
    }
});

export const { increaseCountForIngredient } = ingredientSlices.actions

const IngredientsReducer = ingredientSlices.reducer

export default IngredientsReducer