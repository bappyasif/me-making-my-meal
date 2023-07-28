import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "."
import { useParams } from "react-router-dom";
import { fetchCategories, fetchCuisines, fetchIngredients } from "../data_fetching";
import { CategoriesType, CategoryItemType } from "../features/categories/categoriesSlice";
import { CuisineNameType, CuisinesListType } from "../features/area/areaSlices";
import { IngredientsListType, IngredientsType, InitIngredientStateType } from "../features/ingredients/ingredientSlice";
import { annoymousAuth } from "../firebase/utils";

export const useToGetCategories = () => {
    const list = useAppSelector(state => state.categories.list);
    console.log(list, "catgories!!")
    const dispatch = useAppDispatch();
    // return {categories: categories}
    useEffect(() => {
        list.length ? null : dispatch(fetchCategories())
    }, [])

    return list
}

export const useToGetCuisines = () => {
    const list = useAppSelector(state => state.cuisine.list)
    const dispatch = useAppDispatch();
    // return {categories: categories}
    useEffect(() => {
        list.length ? null : dispatch(fetchCuisines())
    }, [])
    return list
}

export const useToGetIngredients = () => {
    const list = useAppSelector(state => state.ingredient.list)
    const dispatch = useAppDispatch();
    // return {categories: categories}
    useEffect(() => {
        list.length ? null : dispatch(fetchIngredients())
    }, [])
    return list
}

export const useToDispatchFetching = (fetchFunc: any) => {
    const { name, id } = useParams()
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchFunc(name || id))
    }, [])
}

export type DataType = {
    // data: (CuisineNameType | CategoryItemType | IngredientsType)[]
    data: (CuisineNameType | CategoryItemType)[]
    // data: CuisineNameType[]
}

export const useToGetHighestCount = (list: DataType) => {
    let highestCount = 0;

    list.data.forEach(item => item.count > highestCount ? highestCount = item.count : null)

    // useEffect(() => {
    //     list.data.forEach(item => item.count > highestCount ? highestCount = item.count : null)
    // }, [list.data])

    return { highestCount }
}

export const useToGetRandomItem = (list: DataType, highestCount: number) => {
    const filteredList = list.data.filter(item => item.count === highestCount)

    const [rando, setRando] = useState<number>(0)

    // console.log(list.data, "!!!!", filteredList.length, highestCount, filteredList[rando], )

    useEffect(() => {
        if (filteredList.length && !rando) {
            setRando(Math.round(Math.random() * filteredList.length))
        }
    }, [rando])

    return { item: filteredList[rando], filteredList }
}

export const useToGetHighestCountedList = (data: CuisinesListType | CategoriesType) => {
    // const cuisines = useToGetCuisines()

    let highestCount = 0;

    data.list.forEach(item => item.count > highestCount ? highestCount = item.count : null)

    const filteredList = data.list.filter(item => item.count === highestCount)

    const [rando, setRando] = useState<number>(0)

    useEffect(() => {
        if (filteredList.length) {
            setRando(Math.round(Math.random() * filteredList.length))
        }
    }, [filteredList, rando])

    return { rando, filteredList }
}

export const useToGetFourRandomItems = (categories: (CategoryItemType | CuisineNameType | IngredientsType)[]) => {
    const [names, setNames] = useState<string[]>([]);

    const { highestCount } = useToGetHighestCount({ data: categories })

    const { item, filteredList } = useToGetRandomItem({ data: categories }, highestCount)

    const chooseRandom = () => {
        const rnd = Math.round(Math.random() * filteredList.length)
        const chkExist = names.findIndex(name => name === filteredList[rnd]?.name)
        if (chkExist === -1 && filteredList[rnd]?.name) {
            setNames(prev => [...prev, filteredList[rnd]?.name])
        }
    }

    const chck = (nm: string) => {
        const chk = names.findIndex(name => name === nm)
        if (chk === -1 && names[0] !== undefined && nm !== "Beef") {
            setNames(prev => [...prev, item.name])
        }
    }

    const removeDuplicate = () => {
        const filtered = names.filter(function (item, pos) {
            return names.indexOf(item) == pos;
        })

        setNames(filtered)
    }

    useEffect(() => {
        item?.name !== undefined && chck(item.name)
    }, [item])

    useEffect(() => {
        names.length < 4 && removeDuplicate()
        filteredList.length && names.length < 4 && chooseRandom()
    }, [names, filteredList])

    return { names }
}

export const useToGetFourPopularItems = (list: (CategoryItemType | CuisineNameType | IngredientsType)[]) => {
    const [names, setNames] = useState<string[]>([]);

    const { highestCount } = useToGetHighestCount({ data: list })

    const removeDuplicates = () => {
        const filtered = names.filter(function (item, pos) {
            return names.indexOf(item) == pos;
        })

        return filtered

        // setNames(filtered)
    }

    const highestOnly = list.filter(item => item.count >= highestCount);

    const lesserCountsItems = list.filter(item => item.count < highestCount)

    const whenFewerHighestItems = () => {
        highestOnly.forEach(item => {
            setNames(prev => [...prev, item.name])
        })
    }

    const allHighestToList = (items: (CategoryItemType | CuisineNameType | IngredientsType)[]) => {
        const rnd = Math.floor(Math.random() * items.length)
        const currItem = items[rnd]
        const checkExists = names.findIndex(name => name === currItem.name)
        if (checkExists === -1 && currItem.name) {
            console.log("adding name", currItem.name, currItem)
            setNames(prev => [...prev, currItem.name])
        }
    }

    useEffect(() => {
        highestCount !== undefined && names.length < 4 && highestOnly.length > 5 && allHighestToList(highestOnly)
        highestCount !== undefined && names.length < 4 && highestOnly.length < 5 && whenFewerHighestItems()
        highestOnly.length < 5 && lesserCountsItems.length && names.length < 5 && allHighestToList(lesserCountsItems)
        // names.length > 0 && names.length < 4 && removeDuplicate()
    }, [highestCount, names])

    console.log(names, "names!!!!", highestOnly, lesserCountsItems.length)

    return { names: removeDuplicates() }
}

export const useToGetAnRandomMeal = () => {
    const category = useAppSelector(state => state.randomMeal.category)
    const cuisine = useAppSelector(state => state.randomMeal.cuisine)
    const mealId = useAppSelector(state => state.randomMeal.mealId)
    const mealName = useAppSelector(state => state.randomMeal.mealName)
    const mealThumb = useAppSelector(state => state.randomMeal.mealThumb)

    return { category, cuisine, mealId, mealName, mealThumb }
}

export const useConfirmUserAuth = () => {
    const [ready, setReady] = useState(false)

    const checkAuth = () => {
        annoymousAuth().then(user => {
            if (user?.user) {
                console.log(user.user, "USER!!!!")
                setReady(true)
            } else {
                setReady(false)
            }
        })
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return { ready }
}