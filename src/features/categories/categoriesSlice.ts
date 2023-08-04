import { createSlice } from "@reduxjs/toolkit"
import { fetchCategoriesFromAPI, fetchCategoriesFromFirebase } from "../../data_fetching";
import { addDataIntoDocumentSubCollection, updateSinglePropertyInFirebaseSubCollectionDocument } from "../../firebase/utils";

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

type initialStateForCategoriesType = {
    list: CategoryItemType[],
    viewCategory: string,
    // fffNow: boolean
}

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
                const {name, update} = action.payload;
                if (item.name === name) {
                    item.count = item.count ? item.count + 1 : 1
                    // item.count += 1
                    // addDataIntoDocumentSubCollection("Categories", "Category", item.name, item)

                    if(update) {
                        // update firebase subcollection document
                        updateSinglePropertyInFirebaseSubCollectionDocument("Categories", "Category", item.name)
                        // console.log("UPDATING FIREBASE")
                    } else {
                        // add to firebase subcollection
                        addDataIntoDocumentSubCollection("Categories", "Category", item.name, item)
                    }
                }
                return item
            })
        },
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

            state.list = state.list.map(item => {
                const chk = categories.findIndex(category => category.name === item.name)
                // console.log(chk, "CHECK!!")
                if(chk !== -1) {
                    item.count = categories[chk].count
                    // item = categories[chk] as CategoryItemType
                    // console.log(item, "CHANGED!!")
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