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
      <Link className="text-center bg-slate-600 px-4 text-slate-200 hover:text-slate-400 xxs:w-fit sm:w-48 flex items-center justify-center" title={name} onClick={() => handleClick(name)} key={name} to={`/categories/${name || "Beef"}`}>{t(`${name}`) || "Beef"}</Link>
    ))
  )

  return (
    <div className="xxs:w-full lg:w-1/2 flex flex-col gap-y-4 opacity-80">
      <h2 className="xxs:text-xl md:text-2xl lg:text-4xl text-center bg-slate-600 py-2 rounded-s-full">{t("Most Popular Categories")}</h2>
      <div className="flex gap-x-4 gap-y-2 xxs:text-xl md:text-2xl flex-wrap justify-center">{renderContent}</div>
    </div>
  )
}