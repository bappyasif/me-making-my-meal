import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useToGetFourPopularItems, useToGetFourRandomItems, useToIncreaseCountsFromMostLikedItems } from "../../hooks/forComponents";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchCategoriesFromFirebase } from "../../data_fetching";

export const MostPopularCategory = () => {
  const categories = useAppSelector(state => state.categories.list)

  // const { names } = useToGetFourRandomItems(categories)
  const {names} = useToGetFourPopularItems(categories)

  const {handleClick} = useToIncreaseCountsFromMostLikedItems("categories")

  const renderContent = (
    names?.map(name => (
      <Link onClick={() => handleClick(name)} key={name} to={`/categories/${name || "Beef"}`}>{name || "Beef"}</Link>
    ))
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCategoriesFromFirebase())
  }, [])

  // console.log(names, "names!!")

  const {t} = useTranslation()

  return (
    <div>
      <h2 className="text-4xl">{t("Most Popular Categories")}</h2>
      <div className="flex gap-4 text-2xl">{renderContent}</div>
    </div>
  )
}