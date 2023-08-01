import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks"
import { useConfirmUserAuth, useToGetCategories } from "../../hooks/forComponents"
import { CategoryItemType, increaseCategoryItemCount } from "./categoriesSlice";
import { useTranslation } from "react-i18next";

export const CategoriesList = () => {
    const categories = useToGetCategories()

    const renderCategories = (
        categories?.map((item) => <RenderCategoryMeal count={item.count} id={item.id} imgSrc={item.imgSrc} name={item.name} key={item.id + item.name} />)
    )

    const { t } = useTranslation()

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-6xl">{t("Categories")} {t("List")}</h2>
            <div className="flex gap-4 justify-around flex-wrap w-full">{renderCategories}</div>
        </div>
    )
}

const RenderCategoryMeal = ({ ...item }: CategoryItemType) => {
    const { id, imgSrc, name } = item

    const dispatch = useAppDispatch();

    const { ready } = useConfirmUserAuth()

    const handleClicked = (itemName: string) => {
        ready && dispatch(increaseCategoryItemCount(itemName))
    }

    const { t } = useTranslation()

    return (
        <div key={id} className="xxs:w-36 sm:w-48 md:w-60 xxs:h-fit lg:w-96 lg:h-fit aspect-auto flex flex-col gap-4" onClick={() => handleClicked(`${name}`)}>
            <h2 className="text-center xxs:text-xl md:text-2xl lg:text-4xl">
                <Link
                    to={`/categories/${name}`}
                >
                    <h2>{t(`${name}`)}</h2>
                    <img src={`${imgSrc}`} alt={`${name}`} />
                </Link>
            </h2>
        </div>
    )
}

export const FirstEightList = () => {
    const categories = useToGetCategories()

    const renderCategories = (
        categories?.map((item, idx) => idx < 8 && <RenderCategoryMeal id={item.id} imgSrc={item.imgSrc} name={item.name} key={item.id + item.name} count={item.count} />)
    )

    const { t } = useTranslation()

    return (
        <div className="flex flex-col gap-y-8 w-full mx-auto">
            <div className="flex justify-between">
                <h2 className="xxs:text-xl md:text-2xl lg:text-4xl">{t(`Meal Categories`)}</h2>
                <Link className="xxs:text-xl md:text-2xl" to={"/categories"}>{t("See All")}</Link>
            </div>
            <div className="flex gap-x-4 gap-y-6 justify-around flex-wrap w-full">{renderCategories}</div>
        </div>
    )
}