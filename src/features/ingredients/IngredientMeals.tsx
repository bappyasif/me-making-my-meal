import { useParams } from "react-router-dom"
import { fetchMealsByIngredient } from "../../data_fetching"
import { useToDispatchFetching } from "../../hooks/forComponents"
import { useAppSelector } from "../../hooks"
import { RenderMeal } from "../category/CategoryViewPage"
import { useTranslation } from "react-i18next"

export const IngredientMeals = () => {
    // const { name } = useParams()
    // useToDispatchFetching(fetchMealsByIngredient, name || "")
    useToDispatchFetching(fetchMealsByIngredient)

    const meals = useAppSelector(state => state.ingredient.meals)

    const renderMeals = (
        meals.map(item => <RenderMeal id={item.id} mealImg={item.mealImg} mealName={item.mealName} key={item.id} />)
    )

    const { name } = useParams()

    // const normalizedSlug = name?.split("-").join(" ")
    const normalizedSlug = name?.split("-").map(word => word[0].toUpperCase()+word.slice(1)).join(" ")

    console.log(name, "slug!!", normalizedSlug)

    const list = useAppSelector(state => state.ingredient.list)
    
    // const ingredientDescription = list.find(item => item.name === name)?.description
    const ingredientDescription = list.find(item => item.name === normalizedSlug)?.description

    const {t} = useTranslation()

    return (
        <div className="flex flex-col gap-y-8">
            {
                ingredientDescription
                    ?
                    <>
                        <h1>{t("About")} : {t(`${normalizedSlug}`)}</h1>
                        <p className="text-justify text-2xl">{ingredientDescription}</p>
                    </>
                    : null
            }
            <h1>{t(`${normalizedSlug}`)} : {t("Meals Cooked With")}</h1>
            <div className="flex flex-wrap justify-between gap-8">{renderMeals}</div>
            {/* <div className="grid xxs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-4 xxs:text-xl md:text-2xl">{renderMeals}</div> */}
        </div>
    )
}
