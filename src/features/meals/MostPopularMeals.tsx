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
        
        const topFour = mealsViewed.slice(0,6)

        setMeals(topFour)
    }

    const readyView = () => {
        if (mealsViewed.length > 0 && mealsViewed.length < 6) {
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
        meals.map(item => <Link className="text-center bg-slate-600 xxs:px-1 sm:px-4 text-slate-200 hover:text-slate-400 rounded xxs:w-fit sm:w-48" title={item.name} onClick={() => handleClick(item)} key={item.name} to={`/meals/${item.id}`}>{item.name.length > 11 ? item.name.slice(0,7)+"...." : item.name}</Link>)
    )

    useEffect(() => {
        readyView()
    }, [mealsViewed])

    const {t} = useTranslation()

    return (
        <div className="xxs:w-full lg:w-1/2 flex flex-col gap-y-4 opacity-80">
            <h2 className="xxs:text-xl md:text-2xl lg:text-4xl text-center bg-slate-600 py-2 rounded-e-full">{t("Most Popular Meals")}</h2>
            <div className="flex gap-x-4 gap-y-2 xxs:text-xl md:text-2xl flex-wrap justify-center">{meals.length ? content : <h2>No Items Been Viewed Yet....</h2>}</div>
        </div>
    )
}
