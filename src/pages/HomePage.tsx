import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks"
import { FirstEightList } from "../features/categories/CategoriesList";
import { FirstNineCuisines } from "../features/area/CuisinesList";
import { RandomMeal } from "../features/randoms/RandomMeal";
import { MostPopularCategory } from "../features/categories/MostPopularCategory";
import { MostPopularCuisine } from "../features/area/MostPopularCuisine";
import { MostPopularIngredients } from "../features/ingredients/MostPopularIngredients";
import { MostPopularMeals } from "../features/meals/MostPopularMeals";
import { fetchCategoriesFromFirebase, fetchCuisinesFromFirebase, fetchIngredientsFromFirebase } from "../data_fetching";

export const HomePage = () => {
  // const count = useAppSelector(state => state.counter.count)

  const dispatch = useAppDispatch()

  const [fo, setFo] = useState(false)
  const onFo = () => setFo(true)
  const offFo = () => setFo(false)

  const categories = useAppSelector(state => state.categories.list)

  // home page needed to fetch data after category fetche from api is done and have dataset ready before firebase call can take place, so that data update is reflected on page correctly
  useEffect(() => {
    fo && categories.length === 14 && dispatch(fetchCategoriesFromFirebase())
    fo && categories.length === 14 && offFo()
  }, [fo, categories])

  useEffect(() => {
    onFo();
    dispatch(fetchIngredientsFromFirebase())
    dispatch(fetchCuisinesFromFirebase())
  }, [])

  return (
    <div className="flex flex-col gap-y-16">
      <div className="flex xxs:flex-col xxs:gap-y-6 md:gap-x-6 md:flex-row justify-around items-center">
        <MostPopularCategory />
        <MostPopularCuisine />
      </div>
      <RandomMeal />
      <div className="flex xxs:flex-col xxs:gap-y-6 md:gap-x-6 md:flex-row justify-around items-center">
        <MostPopularIngredients />
        <MostPopularMeals />
      </div>
      <FirstEightList />
      <FirstNineCuisines />
    </div>
  )
}
