import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useConfirmUserAuth, useToGetFourPopularItems, useToGetFourRandomItems, useToIncreaseCountsFromMostLikedItems } from "../../hooks/forComponents";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCategoriesFromFirebase } from "../../data_fetching";
import { annoymousAuth } from "../../firebase/utils";

export const MostPopularCategory = () => {
  // const [fo, setFo] = useState(false)
  // const onFo = () => setFo(true)
  // const offFo = () => setFo(false)
  const categories = useAppSelector(state => state.categories.list)

  // const { names } = useToGetFourRandomItems(categories)
  const {names} = useToGetFourPopularItems(categories)

  const {handleClick} = useToIncreaseCountsFromMostLikedItems("categories")

  const renderContent = (
    names?.map(name => (
      <Link onClick={() => handleClick(name)} key={name} to={`/categories/${name || "Beef"}`}>{name || "Beef"}</Link>
    ))
  )

  // const {ready} = useConfirmUserAuth()

  // const fffNow = useAppSelector(state => state.categories.fffNow)

  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   fo && categories.length === 14 && dispatch(fetchCategoriesFromFirebase())
  //   fo && categories.length === 14 && offFo()
  // }, [fo, categories])

  // useEffect(() => {
  //   // names.length < 1 && dispatch(fetchCategoriesFromFirebase())
  //   // ready && dispatch(fetchCategoriesFromFirebase())
  //   // dispatch(fetchCategoriesFromFirebase())
  //   // onFo()
  // }, [])

  // console.log(names, "names!!")
  // console.log(categories, "CATEGROESSS")

  const {t} = useTranslation()

  return (
    <div>
      <h2 className="text-4xl">{t("Most Popular Categories")}</h2>
      <div className="flex gap-4 text-2xl">{renderContent}</div>
    </div>
  )
}