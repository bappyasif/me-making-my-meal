import { Link, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchFilterByCategory } from "../../data_fetching";
import { MealItemType } from "./categorySlice";
import { useConfirmUserAuth, useToCheckDataExistsOnFirebase, useToDispatchFetching } from "../../hooks/forComponents";
import { useTranslation } from "react-i18next";
import { increaseMealCount } from "../meals/mealsSlice";

export const CategoryViewPage = () => {
    useToDispatchFetching(fetchFilterByCategory)

    const { name } = useParams()
    const { t } = useTranslation()

    return (
        <div className="z-10">
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
        <div className="grid xxs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-x-4 gap-y-4">{renderMeals}</div>
    )
}

export const RenderMeal = ({ ...item }: MealItemType) => {
    const { id, mealImg, mealName } = item;

    const dispatch = useAppDispatch();

    const { ready } = useConfirmUserAuth()

    const { found } = useToCheckDataExistsOnFirebase("Meals", "Meal", mealName)

    const clickHandler = () => {        
        ready && dispatch(increaseMealCount({ id, name: mealName, imgSrc: mealImg, update: found }))
    }

    return (
        <Link
            className="flex flex-col gap-x-4 text-center xxs:text-xl md:text-2xl lg:text-4xl w-fit opacity-80"
            onClick={clickHandler}
            to={`/meals/${id}`}
        >
            <h2 className="text-center bg-slate-600 px-4 text-slate-200 hover:text-slate-400 flex justify-center place-items-center xxs:h-fit xxs:text-xl xl:text-2xl xxs:w-fit sm:w-full mx-auto">{mealName.length > 15 ? mealName.slice(0, 15) + "...." : mealName}</h2>
            <img className="xxs:w-3/4 lg:w-96 h-fit mx-auto" src={`${mealImg}`} alt={`${mealName}`} />
        </Link>
    )
}