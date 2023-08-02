import { Link, useParams } from "react-router-dom"
// import { useAppDispatch } from "../hooks"
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchFilterByCategory } from "../../data_fetching";
import { MealItemType } from "./categorySlice";
import { useConfirmUserAuth, useToDispatchFetching } from "../../hooks/forComponents";
import { useTranslation } from "react-i18next";
import { increaseMealCount } from "../meals/mealsSlice";
// import { fetchFilterByCategory } from "../data_fetching";

export const CategoryViewPage = () => {
    // const { name } = useParams()

    // const dispatch = useAppDispatch();

    // console.log(meals, "MEALS")
    useToDispatchFetching(fetchFilterByCategory)

    // useEffect(() => {
    //     dispatch(fetchFilterByCategory(name || ""))
    //     // dispatch(fetchFilterByCategory())
    // }, [name])

    const {name} = useParams()
    const {t} = useTranslation()

    return (
        <div>
            <h1>{t(`${name}`)} : {t("Meals List")}</h1>
            <CategoryMeals />
        </div>
    )
}

const CategoryMeals = () => {
    const meals = useAppSelector(state => state.category.meals)

    const renderMeals = (
        meals.map(item => <RenderMeal id={item.id} mealImg={item.mealImg} mealName={item.mealName} key={item.id} />)
    )

    return (
        <div className="flex flex-wrap gap-8">{renderMeals}</div>
    )
}

export const RenderMeal = ({ ...item }: MealItemType) => {
    const { id, mealImg, mealName } = item;
    
    const dispatch = useAppDispatch();

    const { ready } = useConfirmUserAuth()

    const clickHandler = () => {
        ready && dispatch(increaseMealCount({id, name: mealName, imgSrc: mealImg}))
        // console.log("DISPATCHED!!", {mealId:id, mealName, mealThumb: mealImg})
    }

    // const mealsViewed = useAppSelector(state => state.meal.mealsViewed);
    
    // console.log("meals viewed....", mealsViewed)

    return (
        <Link className="xxs:text-xl md:text-2xl mx-auto" onClick={clickHandler} to={`/meals/${id}`} key={id}>
            <div className="xxs:w-64 sm:w-96 xl:w-2/3 xxl:w-3/4 mx-auto">
                <h2 className="text-center bg-slate-600 px-4 text-slate-200 hover:text-slate-400">{mealName}</h2>
                <img className="w-full h-full" src={mealImg} alt={mealName} />
            </div>
        </Link>
    )
}