import { useEffect, useState } from "react"
import { ViewedMealType } from "./mealsSlice"
import { useAppSelector } from "../../hooks"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export const MostPopularMeals = () => {
    const [meals, setMeals] = useState<ViewedMealType[]>([])

    const mealsViewed = useAppSelector(state => state.meal.mealsViewed);

    const whenManyItemsViewed = () => {
        // it needs to be done from "reducer" function as this effects "immutable" data, and it needs to be handled from deignated reducer function instead
        // let sorted = mealsViewed.sort((a,b) => a.count > b.count ? 1 : a.count === b.count ? 0 : -1 )
        
        const topFour = mealsViewed.slice(0,4)
        // setMeals(topFour)
        // console.log(topFour, "MANYYY")
        setMeals(topFour)
    }

    const readyView = () => {
        if (mealsViewed.length > 0 && mealsViewed.length < 4) {
            setMeals(mealsViewed)
        } else {
            whenManyItemsViewed()
        }
    }

    const content = (
        meals.map(item => <Link key={item.name} to={`/meals/${item.id}`}>{item.name}</Link>)
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
