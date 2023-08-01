import { useEffect, useState } from "react"
import { ViewedMealType, increaseMealCount } from "./mealsSlice"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useConfirmUserAuth } from "../../hooks/forComponents"

export const MostPopularMeals = () => {
    const [meals, setMeals] = useState<ViewedMealType[]>([])

    const mealsViewed = useAppSelector(state => state.meal.mealsViewed);

    const whenManyItemsViewed = () => {
        // it needs to be done from "reducer" function as this effects "immutable" data, and it needs to be handled from deignated reducer function instead
        // let sorted = mealsViewed.sort((a,b) => a.count > b.count ? 1 : a.count === b.count ? 0 : -1 )
        
        const topFour = mealsViewed.slice(0,4)

        setMeals(topFour)
    }

    const readyView = () => {
        if (mealsViewed.length > 0 && mealsViewed.length < 4) {
            setMeals(mealsViewed)
        } else {
            whenManyItemsViewed()
        }
    }

    // const {handleClick} = useToIncreaseCountsFromMostLikedItems("mostViewed")
    const { ready } = useConfirmUserAuth()

    const dispatch = useAppDispatch()
    
    const handleClick = (item: ViewedMealType) => {
        ready && dispatch(increaseMealCount(item))
    }

    const content = (
        meals.map(item => <Link onClick={() => handleClick(item)} key={item.name} to={`/meals/${item.id}`}>{item.name}</Link>)
    )

    useEffect(() => {
        readyView()
    }, [mealsViewed])

    const {t} = useTranslation()

    return (
        <div>
            <h2 className="xxs:text-xl md:text-2xl lg:text-4xl text-center">{t("Most Popular Meals")}</h2>
            <div className="flex gap-4 xxs:text-xl md:text-2xl flex-wrap justify-center">{meals.length ? content : <h2>No Items Been Viewed Yet....</h2>}</div>
        </div>
    )
}
