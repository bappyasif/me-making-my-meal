import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks";
import { useToGetFourPopularItems, useToGetFourRandomItems } from "../../hooks/forComponents";
import { Link } from "react-router-dom";

export const MostPopularCategory = () => {
  const categories = useAppSelector(state => state.categories.list)

  // const { names } = useToGetFourRandomItems(categories)
  const {names} = useToGetFourPopularItems(categories)

  const renderContent = (
    names?.map(name => (
      <Link key={name} to={`/categories/${name || "Beef"}`}>{name || "Beef"}</Link>
    ))
  )

  // console.log(names, "names!!")

  const {t} = useTranslation()

  return (
    <div>
      <h2 className="text-4xl">{t("Most Popular Categories")}</h2>
      <div className="flex gap-4 text-2xl">{renderContent}</div>
    </div>
  )
}