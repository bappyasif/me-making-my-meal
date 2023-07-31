import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { useToGetFourPopularItems, useToGetFourRandomItems, useToIncreaseCountsFromMostLikedItems } from "../../hooks/forComponents"
import { useTranslation } from "react-i18next"
import { fetchIngredientsFromFirebase } from "../../data_fetching"
import { useEffect } from "react"

export const MostPopularIngredients = () => {
    const ingredients = useAppSelector(state => state.ingredient.list)
    // console.log(ingredients, "|INGREDIENTSSSS")
    // const {names} = useToGetFourRandomItems(ingredients)
    // figure it out how!!
    const { names } = useToGetFourPopularItems(ingredients)

    const { handleClick } = useToIncreaseCountsFromMostLikedItems("ingredients")

    const renderContent = (
        names.map(name => {
            return (
                <Link onClick={() => handleClick(name)} key={name} to={`/ingredients/${name || "Lime"}`}>{name || "Lime"}</Link>
            )
        })
    )

    // const dispatch = useAppDispatch()

    // useEffect(() => {
    //     // dispatch(fetchIngredientsFromFirebase())
    // }, [])

    const { t } = useTranslation()

    return (
        <div>
            <h2 className="text-4xl">{t("Most Popular Ingredients")}</h2>
            <div className="flex gap-4 text-2xl">{renderContent}</div>
        </div>
    )
}


// export const MostPopularIngredients = () => {
//     const ingredients = useAppSelector(state => state.ingredient.list)
//     // console.log(ingredients, "|INGREDIENTSSSS")
//     const { highestCount } = useToGetHighestCount({ data: ingredients })

//     const { item } = useToGetRandomItem({ data: ingredients }, highestCount)

//     let name = ""

//     if (item) {
//         name = item.name
//     }

//     console.log(item, "ITEM!!!!!")
//     return (
//         <div>
//             <h2>MostPopularIngredients - {name || "Chicken"} -- {ingredients.length} - {highestCount}</h2>
//         </div>
//     )
// }
