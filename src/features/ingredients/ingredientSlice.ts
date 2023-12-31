import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients, fetchIngredientsFromFirebase, fetchMealsByIngredient } from "../../data_fetching";
import { MealItemType } from "../category/categorySlice";
import { addDataIntoDocumentSubCollection, updateSinglePropertyInFirebaseSubCollectionDocument } from "../../firebase/utils";

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
            const {name, update} = action.payload;
            state.list = state.list.map(item => {
                if (item.name === name) {
                    item.count += 1
                    // console.log("count incremented", action.payload, item.name)
                    // addDataIntoDocumentSubCollection("Ingredients", "Ingredient", item.name, item)
                    if (update) {
                        // update firebase subcollection document
                        updateSinglePropertyInFirebaseSubCollectionDocument("Ingredients", "Ingredient", item.name)
                        // console.log("UPDATING FIREBASE")
                    } else {
                        // add to firebase subcollection
                        addDataIntoDocumentSubCollection("Ingredients", "Ingredient", item.name, item)
                    }
                }
                return item
            })
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchIngredients.fulfilled, (state, action) => {
            state.list = action.payload.meals.map((item: any) => {
                if (item.idIngredient) {
                    const ingredient: IngredientsType = {
                        id: item.idIngredient,
                        name: item.strIngredient,
                        description: item.strDescription,
                        count: 0
                    }

                    return ingredient
                }
                return item
            })
            // console.log(action.payload, "payload ingredients!!")
        }),
            builder.addCase(fetchMealsByIngredient.fulfilled, (state, action) => {
                state.meals = action.payload?.meals.map((item: any) => {
                    return {
                        id: item.idMeal,
                        mealName: item.strMeal,
                        mealImg: item.strMealThumb
                    }
                })
                // console.log(action.payload, "ingredient meals")
            }),
            builder.addCase(fetchIngredientsFromFirebase.fulfilled, (state, action) => {
                const { ingredients } = action.payload

                state.list = state.list.map(item => {
                    const chk = ingredients.findIndex(ingredient => ingredient.name === item.name)
                    // console.log(chk, "CHECK!!")
                    if (chk !== -1) {
                        item.count = ingredients[chk].count
                        // item = ingredients[chk] as IngredientsType
                        // console.log(item, "CHANGED!!")
                    }
                    return item
                })
            })
    }
});

export const { increaseCountForIngredient } = ingredientSlices.actions

const IngredientsReducer = ingredientSlices.reducer

export default IngredientsReducer