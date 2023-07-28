import { useEffect } from "react";
// import { increment } from "../features/slices";
import { useAppDispatch, useAppSelector } from "../hooks"
import { useToGetCategories } from "../hooks/forComponents";
import { fetchCategories } from "../data_fetching";
import { CategoriesList, FirstEightList } from "../features/categories/CategoriesList";
import { CuisinesList, FirstNineCuisines } from "../features/area/CuisinesList";
import { IngredientsList } from "../features/ingredients/IngredientsList";
import { RandomMeal } from "../features/randoms/RandomMeal";
import { MostPopularCategory } from "../features/categories/MostPopularCategory";
import { MostPopularCuisine } from "../features/area/MostPopularCuisine";
import { MostPopularIngredients } from "../features/ingredients/MostPopularIngredients";
import { MostPopularMeals } from "../features/meals/MostPopularMeals";

export const HomePage = () => {
  // const count = useAppSelector(state => state.counter.count)

  return (
    <div className="flex flex-col gap-16">
      {/* <h1>Home</h1> */}
      {/* <CategoriesList /> */}
      <div className="flex justify-around">
        <MostPopularCategory />
        <MostPopularCuisine />
        {/* <MostPopularIngredients /> */}
      </div>
      <RandomMeal />
      <div className="flex justify-around">
        <MostPopularIngredients />
        <MostPopularMeals />
      </div>
      <FirstEightList />
      <FirstNineCuisines />
      {/* <CuisinesList /> */}
      {/* <IngredientsList /> */}
      {/* <button onClick={() => dispatch(increment())}>Increment</button> */}
    </div>
  )
}
