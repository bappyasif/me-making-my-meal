import { createSlice } from "@reduxjs/toolkit"
import { fetchCategoriesFromAPI, fetchCategoriesFromFirebase, fetchFilterByCategory } from "../../data_fetching";
import { addDataIntoCollection, addDataIntoDocumentSubCollection, updateSingleRecordInFirebaseCollection } from "../../firebase/utils";
// import { useConfirmUserAuth } from "../../hooks/forComponents";

// type CategoryState = {
//     Beef: number,
//     Breakfast: number,
//     Chicken: number,
//     Dessert: number,
//     Goat: number,
//     Lamb: number,
//     Miscellaneous: number,
//     Pasta: number,
//     Pork: number,
//     Seafood: number,
//     Side: number,
//     Starter: number,
//     Vegan: number,
//     Vegetarian: number
// }

// const initialStateForCategories: CategoryState = {
//     Beef: 0,
//     Breakfast: 0,
//     Chicken: 0,
//     Dessert: 0,
//     Goat: 0,
//     Lamb: 0,
//     Miscellaneous: 0,
//     Pasta: 0,
//     Pork: 0,
//     Seafood: 0,
//     Side: 0,
//     Starter: 0,
//     Vegan: 0,
//     Vegetarian: 0
// }

export type CategoryItemType = {
    // [index: string]: number
    count: number,
    id: string,
    imgSrc: string,
    name: string,
    description?: string
}

export type CategoriesType = {
    list: CategoryItemType[]
}

// type CategoryInitStateType = {
//     list: CategoryItemType[],

// }

type initialStateForCategoriesType = {
    list: CategoryItemType[],
    viewCategory: string,
    // fffNow: boolean
}

// const initialStateForCategories: CategoriesType = {
//     list: []
// }

const initialStateForCategories: initialStateForCategoriesType = {
    list: [],
    viewCategory: "",
    // fffNow: false
}

const categorySlice = createSlice({
    initialState: initialStateForCategories,
    name: "category",
    reducers: {
        increaseCategoryItemCount: (state, action) => {
            state.list = state.list.map((item) => {
                if (item.name === action.payload) {
                    item.count = item.count ? item.count + 1 : 1
                    // item.count += 1
                    addDataIntoDocumentSubCollection("Categories", "Category", item.name, item)
                }
                return item
            })

            // const { ready } = useConfirmUserAuth()

            // ready && addDataIntoCollection("4M", {categories: [...state.list]}, "categories")

            // addDataIntoCollection("4M", { categories: [...state.list] }, "categories")

            // updateSingleRecordInFirebaseCollection()
            // addDataIntoDocumentSubCollection()
        },

        // handleViewCategory: (state, action) => {
        //     state.viewCategory = action.payload
        // }
    },
    extraReducers: builder => {
        builder.addCase(fetchCategoriesFromAPI.fulfilled, (state, action) => {
            state.list = action.payload.categories.map((item: any) => {
                if (item?.idCategory) {
                    const { idCategory, strCategory, strCategoryDescription, strCategoryThumb } = item
                    return {
                        id: idCategory,
                        name: strCategory,
                        description: strCategoryDescription,
                        imgSrc: strCategoryThumb,
                        count: 0
                    }
                } else {
                    return item
                }
            })
            // console.log(state.list)
        }),
        builder.addCase(fetchCategoriesFromFirebase.fulfilled, (state, action) => {
            const {categories} = action.payload;
            // if(categories.length) {
            //     // state.fffNow = true
            // }
            // if(state.list.length === 0 && categories.length) {
            //     state.list = categories as CategoryItemType[]
            // }
            state.list = state.list.map(item => {
                const chk = categories.findIndex(category => category.name === item.name)
                // console.log(chk, "CHECK!!")
                if(chk !== -1) {
                    item.count = categories[chk].count
                    // item = categories[chk] as CategoryItemType
                    // console.log(item, "CHANGED!!")
                    // state.fffNow = false
                }
                return item
            })
            // state.list = [...new Set([...state.list, ...categories])] as CategoryItemType[]
            // console.log(categories, "FIREBASE", state.list.length)
        })
        // builder.addCase(fetchFilterByCategory.fulfilled, (state, action) => {
        //     console.log(action.payload, "category meals")
        // }),
        // builder.addCase(fetchFilterByCategory.rejected, (state, action) => {
        //     console.log(action.payload, "category meals - rejected")
        // })
    }
});

export const { increaseCategoryItemCount } = categorySlice.actions

const CategoriesReducer = categorySlice.reducer;

export default CategoriesReducer