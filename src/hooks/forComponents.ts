import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "."
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategoriesFromAPI, fetchCuisines, fetchIngredients } from "../data_fetching";
import { CategoriesType, CategoryItemType, increaseCategoryItemCount } from "../features/categories/categoriesSlice";
import { CuisineNameType, CuisinesListType, inCreaseCountForCuisine } from "../features/area/areaSlices";
import { IngredientsType, increaseCountForIngredient } from "../features/ingredients/ingredientSlice";
import { annoymousAuth, readingDataFromFirestore } from "../firebase/utils";

export const useToGetCategories = () => {
    const list = useAppSelector(state => state.categories.list);
    // console.log(list, "catgories!!")
    const dispatch = useAppDispatch();
    // return {categories: categories}
    useEffect(() => {
        list.length ? null : dispatch(fetchCategoriesFromAPI())
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

// export const useToGetFourPopularItems = (list: (CategoryItemType | CuisineNameType | IngredientsType)[]) => {
//     const [names, setNames] = useState<string[]>([]);

//     const { highestCount } = useToGetHighestCount({ data: list })

//     const removeDuplicates = () => {
//         const filtered = names.filter(function (item, pos) {
//             return names.indexOf(item) == pos;
//         })

//         return filtered

//         // setNames(filtered)
//     }

//     const highestOnly = list.filter(item => item.count >= highestCount);

//     const lesserCountsItems = list.filter(item => item.count < highestCount)

//     const whenFewerHighestItems = () => {
//         highestOnly.forEach(item => {
//             setNames(prev => [...prev, item.name])
//         })
//     }

//     const allHighestToList = (items: (CategoryItemType | CuisineNameType | IngredientsType)[]) => {
//         const rnd = Math.floor(Math.random() * items.length)
//         const currItem = items[rnd]
//         const checkExists = names.findIndex(name => name === currItem.name)
//         if (checkExists === -1 && currItem.name) {
//             console.log("adding name", currItem.name, currItem)
//             setNames(prev => [...prev, currItem.name])
//         }
//     }

//     useEffect(() => {
//         highestCount !== undefined && names.length < 4 && highestOnly.length > 5 && allHighestToList(highestOnly)
//         highestCount !== undefined && names.length < 4 && highestOnly.length < 5 && whenFewerHighestItems()
//         highestOnly.length < 4 && lesserCountsItems.length && names.length < 5 && allHighestToList(lesserCountsItems)
//         // names.length > 0 && names.length < 4 && removeDuplicate()
//     }, [highestCount, names, lesserCountsItems])

//     // console.log(names, "names!!!!", highestOnly, lesserCountsItems.length)

//     return { names: removeDuplicates().slice(0,4) }
// }

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

    const notZerosButLessThanHighest = list.filter(item => item.count > 0 && item.count < highestCount).sort((a,b) => a.count < b.count ? -1 : 1)

    const addAllFromHighest = () => {
        highestOnly.forEach((item) => {
            if(names.length < 4) {
                setNames(prev => [...prev, item.name])
            }
        })
    }

    const addHasCountsItems = () => {
        notZerosButLessThanHighest.forEach(item => {
            if(names.length < 4) {
                setNames(prev => [...prev, item.name])
            }
        })
    }

    const needFewMoreItemToFill = () => {
        // console.log("FILL IT!!")
        const zeroCountsItems = list.filter(item => item.count === 0)
        zeroCountsItems.forEach(item => {
            const rnd = Math.random()
            if(names.length < 4 && rnd > .6) {
                setNames(prev => [...prev, item.name])
            }
        })
    }

    useEffect(() => {
        highestOnly.length && highestOnly.length < 4 && addAllFromHighest()
        notZerosButLessThanHighest.length && addHasCountsItems()
        highestOnly.length && highestOnly.length < 4 && names.length < 4 && needFewMoreItemToFill()
    }, [highestOnly, notZerosButLessThanHighest, highestCount])

    // console.log(highestOnly, notZerosButLessThanHighest)

    return { names: removeDuplicates().slice(0,4) }
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
                // console.log(user.user, "USER!!!!")
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

// export const useToFetchDataFromFirebase = async (documentName: string) => {
//     const fbResp = await readingDataFromFirestore("4M")
//     const filteredData = fbResp.filter(item => Object.keys(item)[0] === documentName)

//     return { filteredData }
// }
export const useToFetchDataFromFirebase = async (documentName: string) => {
    const fbResp = await readingDataFromFirestore("4M")
    const filteredData = fbResp.filter(item => Object.keys(item)[0] === documentName)

    // const subCollData = await readingDataFromFirestoreSubCollection("Categories", "Category")
    // console.log(subCollData)

    return { filteredData }
}

export const useToIncreaseCategoryAndCuisineCounts = (category: string, cuisine:string) => {
    const dispatch = useAppDispatch()

    const { ready } = useConfirmUserAuth()

    const navigate = useNavigate()

    const handleCategoryClick = () => {
        ready && dispatch(increaseCategoryItemCount(category))
        navigate(`/categories/${category}`)
    }

    const handleCuisineClick = () => {
        ready && dispatch(inCreaseCountForCuisine(cuisine))
        navigate(`/cuisines/${cuisine}`)
    }

    return {handleCategoryClick, handleCuisineClick}
}

export const useToIncreaseCountsFromMostLikedItems = (type: string) => {
    const dispatch = useAppDispatch();

//   const navigate = useNavigate()

  const { ready } = useConfirmUserAuth()

  const handleClick = (name: string) => {
    ready && type === "cuisines" && dispatch(inCreaseCountForCuisine(name))
    // type === "cuisines" && navigate(`/cuisines/${name}`)

    ready && type === "categories" && dispatch(increaseCategoryItemCount(name))
    // type === "categories" && navigate(`/categories/${name}`)

    ready && type === "ingredients" && dispatch(increaseCountForIngredient(name))
    // type === "ingredients" && navigate(`/ingredients/${name}`)

    // ready && type === "mostViewed" && dispatch(increaseMealCount(name))
    // // type === "mostViewed" && navigate(`/ingredients/${name}`)
    // ready && type === "mostViewed" && console.log(name, "MEALNAME")
  }

  return {
    handleClick
  }
}