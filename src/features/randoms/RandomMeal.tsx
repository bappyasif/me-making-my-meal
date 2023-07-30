import { Link, useNavigate } from "react-router-dom"
import { fetchOneRandomMeal } from "../../data_fetching"
import { useToDispatchFetching, useToGetAnRandomMeal, useToIncreaseCategoryAndCuisineCounts } from "../../hooks/forComponents"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export const RandomMeal = () => {
    const [wait, setWait] = useState<boolean>(true)

    const {t} = useTranslation()

    useToDispatchFetching(fetchOneRandomMeal)

    const { category, cuisine, mealId, mealName, mealThumb } = useToGetAnRandomMeal()

    useEffect(() => {
        const timer = setTimeout(() => setWait(false), 999)
        return () => clearTimeout(timer)
    }, [])

    // const navigate = useNavigate()

    // const handleCategoryClick = () => navigate(`/categories/${category}`)

    // const handleCuisineClick = () => navigate(`/cuisines/${cuisine}`)

    const { handleCategoryClick, handleCuisineClick } = useToIncreaseCategoryAndCuisineCounts(category, cuisine)

    const content = (
        wait
            ? null
            :
            <div className="flex flex-col items-center">
                <Link to={`/meals/${mealId}`} className="text-2xl mx-auto">
                    <p>{mealName}</p>
                    <img className="aspect-square w-96 h-96" src={mealThumb} alt={mealName} />
                </Link>
                {/* <img className="aspect-square w-96 h-96" src={mealThumb} alt={mealName} /> */}
                <div className="self-start">
                    <button onClick={handleCategoryClick}>{t(`${category}`)}</button>
                    <button onClick={handleCuisineClick}>{t(`${cuisine}`)}</button>
                </div>
            </div>
    )

    return (
        <div className="flex flex-col items-center">
            <h1>{t("Randomly Selected Food")}</h1>
            {/* <RenderMealBasicInfo /> */}
            {content}
        </div>
    )
}
