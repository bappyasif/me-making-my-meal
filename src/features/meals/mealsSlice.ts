import { createSlice } from "@reduxjs/toolkit"
import { fetchMealDetails, fetchViewedMealsFromFirebase } from "../../data_fetching"
import { addDataIntoDocumentSubCollection, updateSinglePropertyInFirebaseSubCollectionDocument } from "../../firebase/utils"
// import { useConfirmUserAuth } from "../../hooks/forComponents"

export type IAMType = {
    text: string
}

export type MealInfoType = {
    // [index: string] : string
    mealId: string,
    cuisine: string,
    category: string,
    mealName: string,
    mealThumb: string,
    mealSource: string,
    mealTags: string,
    mealTube: string,
    instructions: string,
}

export type forMealInitState = {
    meal: MealInfoType,
    ingredients: IAMType[],
    measures: IAMType[],
    // count: number
    mealsViewed: ViewedMealType[]
}

// export type MealsType = {
//     lists: MealNameType[]
// }

export type ViewedMealType = {
    id: string,
    name: string,
    imgSrc: string,
    count: number
}

const initMealsState: forMealInitState = {
    // count: 0,
    ingredients: [],
    measures: [],
    meal: {
        category: "",
        cuisine: "",
        mealId: "",
        mealName: "",
        mealSource: "",
        mealTags: "",
        mealThumb: "",
        mealTube: "",
        instructions: "",
    },
    mealsViewed: []
}

const mealsSlice = createSlice({
    initialState: initMealsState,
    name: "meals",
    reducers: {
        increaseMealCount: (state, action) => {
            const { id, name, update, imgSrc } = action.payload;

            const foundItem = state.mealsViewed.findIndex(item => item.id === action.payload.id)

            if (foundItem !== -1) {
                state.mealsViewed = state.mealsViewed.map(item => {
                    if (item.id === id) {
                        // item.count = item.count ? item.count + 1 : 1
                        item.count += 1
                        if(update) {
                            // update firebase subcollection document
                            updateSinglePropertyInFirebaseSubCollectionDocument("Meals", "Meal", name)
                            // console.log("UPDATING FIREBASE")
                        } 
                        // else {
                        //     // add to firebase subcollection
                        //     addDataIntoDocumentSubCollection("Meals", "Meal", item.name, item)
                        // }
                        // addDataIntoDocumentSubCollection("Meals", "Meal", item.name, item)
                    }
                    return item
                })
            } else {
                // modifying payload data to match mealViewType
                const moddedData:ViewedMealType = {
                    id: id,
                    imgSrc: imgSrc,
                    name: name,
                    count: 1
                }

                // updating store with new meal entry
                state.mealsViewed.push(moddedData)
                
                // add to firebase subcollection
                addDataIntoDocumentSubCollection("Meals", "Meal", name, moddedData )
            }

            // kepping it sorted so that data retrival from components gets easier with highest counts
            state.mealsViewed = state.mealsViewed.sort((a,b) => a.count < b.count ? 1 : a.count === b.count ? 0 : -1 )

            // const { ready } = useConfirmUserAuth()

            // ready && addDataIntoCollection("4M", {meals: [...state.mealsViewed]}, "meals")
            // addDataIntoCollection("4M", { meals: [...state.mealsViewed] }, "meals")
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchMealDetails.fulfilled, (state, action) => {
            action.payload.meals.map((item: any) => {
                const meal: MealInfoType = {
                    category: item.strCategory,
                    cuisine: item.strArea,
                    mealId: item.idMeal,
                    mealName: item.strMeal,
                    mealSource: item.strSource,
                    mealTags: item.strTags,
                    mealThumb: item.strMealThumb,
                    mealTube: item.strYoutube,
                    instructions: item.strInstructions
                }
                let ingredients = []
                let measures = []
                for (let key in item) {
                    // console.log(["Ingredient"].includes(key), ["Measure"].includes(key))
                    if (key.includes("Ingredient") && item[key]) {
                        ingredients.push({ text: item[key] })
                    } else if (key.includes("Measure") && item[key]) {
                        measures.push({ text: item[key] })
                    }
                }
                // console.log(meal, "ITEM", ingredients, measures)
                state.meal = meal
                state.ingredients = ingredients
                state.measures = measures
            })

            // state.mealsViewed = action.payload?.mealsViewed
            // console.log(action.payload, "meal details")
        }),
        // builder.addCase(fetchViewedMealsList.fulfilled, (state, action) => {
        //     // inserting dat from firbase sorted to access highest counted meals easier
        //     state.mealsViewed = action.payload?.meals.sort((a:any,b:any) => a.count < b.count ? 1 : a.count === b.count ? 0 : -1 ) || []
        // })
        builder.addCase(fetchViewedMealsFromFirebase.fulfilled, (state, action) => {
            const {meals} = action.payload
            // inserting dat from firbase sorted to access highest counted meals easier
            state.mealsViewed = meals.sort((a:any,b:any) => a.count < b.count ? 1 : a.count === b.count ? 0 : -1 ) as ViewedMealType[] || []
        })
    }
})

export const { increaseMealCount } = mealsSlice.actions

const MealsReducer = mealsSlice.reducer;

export default MealsReducer