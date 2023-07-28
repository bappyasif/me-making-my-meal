import { useEffect, useState } from "react"
import { ViewedMealType } from "./mealsSlice"
import { useAppSelector } from "../../hooks"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export const MostPopularMeals = () => {
    const [meals, setMeals] = useState<ViewedMealType[]>([])

    const mealsViewed = useAppSelector(state => state.meal.mealsViewed);

    // console.log(mealsViewed, "mealsViewed!!")

    const readyView = () => {
        if (mealsViewed.length > 0 && mealsViewed.length < 4) {
            setMeals(mealsViewed)
        }
    }

    const content = (
        meals.map(item => <Link to={`/meals/${item.id}`}>{item.name}</Link>)
    )

    useEffect(() => {
        readyView()
    }, [mealsViewed])

    const {t} = useTranslation()

    return (
        <div>
            <h2 className="text-4xl">{t("Most Popular Meals")}</h2>
            {/* <div className="flex gap-4 text-2xl">{content}</div> */}
            <div className="flex gap-4 text-2xl">{meals.length ? content : <h2>No Items Been Viewed Yet....</h2>}</div>
        </div>
    )
}
