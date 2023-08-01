import { createSlice } from "@reduxjs/toolkit"
import { fetchCuisineMeals, fetchCuisines, fetchCuisinesFromFirebase } from "../../data_fetching"
import { MealItemType } from "../category/categorySlice"
import { addDataIntoDocumentSubCollection } from "../../firebase/utils"

export type CuisineNameType = {
    name: string,
    count: number
}

export type CuisinesListType = {
    list: CuisineNameType[]
}

type InitialStateForCuisinesType = {
    list: CuisineNameType[],
    meals: MealItemType[]
}

// const initialStateForCuisines: CuisinesListType = {
//     list: []
// }
const initialStateForCuisines: InitialStateForCuisinesType = {
    list: [],
    meals: []
}

const areaSlice = createSlice({
    initialState: initialStateForCuisines,
    name: "area",
    reducers: {
        inCreaseCountForCuisine: (state, action) => {
            state.list = state.list.map(item => {
                if (item.name === action.payload) {
                    item.count += 1;
                    addDataIntoDocumentSubCollection("Cuisines", "Cuisine", item.name, item)
                }
                return item
            })
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCuisines.fulfilled, (state, action) => {
            // console.log(action.payload.meals)
            state.list = action.payload.meals?.map((item: any) => {
                
                if(item?.strArea) {
                    const { strArea } = item;
                    return {
                        name: strArea,
                        count: 0
                    }
                } else {
                    // console.log(item, "IETEMIETEN")
                    return item
                }
            })
        }),
        builder.addCase(fetchCuisineMeals.fulfilled, (state, action) => {
            state.meals = action.payload.meals.map((item:any) => {
                const mealItem : MealItemType = {
                    id: item.idMeal,
                    mealImg: item.strMealThumb,
                    mealName: item.strMeal
                }

                return mealItem
            })
            // console.log(action.payload, "meals cuisines")
        }),
        builder.addCase(fetchCuisinesFromFirebase.fulfilled, (state, action) => {
            const {cuisines} = action.payload

            state.list = state.list.map(item => {
                const chk = cuisines.findIndex(cuisine => cuisine.name === item.name)
                // console.log(chk, "CHECK!!")
                if(chk !== -1) {
                    item.count = cuisines[chk].count
                    // item = cuisines[chk] as CuisineNameType
                    // console.log(item, "CHANGED!!")
                }
                return item
            })
        })
    }
});

export const { inCreaseCountForCuisine } = areaSlice.actions

const CuisineReducer = areaSlice.reducer;

export default CuisineReducer