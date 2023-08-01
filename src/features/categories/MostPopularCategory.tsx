import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks";
import { useToGetFourPopularItems, useToIncreaseCountsFromMostLikedItems } from "../../hooks/forComponents";
import { Link } from "react-router-dom";

export const MostPopularCategory = () => {
  const categories = useAppSelector(state => state.categories.list)

  const {names} = useToGetFourPopularItems(categories)

  const {handleClick} = useToIncreaseCountsFromMostLikedItems("categories")

  const {t} = useTranslation()

  const renderContent = (
    names?.map(name => (
      <Link onClick={() => handleClick(name)} key={name} to={`/categories/${name || "Beef"}`}>{t(`${name}`) || "Beef"}</Link>
    ))
  )

  return (
    <div>
      <h2 className="xxs:text-xl md:text-2xl lg:text-4xl text-center">{t("Most Popular Categories")}</h2>
      <div className="flex gap-4 xxs:text-xl md:text-2xl flex-wrap">{renderContent}</div>
    </div>
  )
}