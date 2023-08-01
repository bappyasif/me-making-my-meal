import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../hooks"
import { useConfirmUserAuth, useToGetCuisines } from "../../hooks/forComponents"
import { inCreaseCountForCuisine } from "./areaSlices"
import { useTranslation } from "react-i18next"

export const CuisinesList = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-6xl">{t("Cuisines")} {t("List")}</h2>
      {/* <div className="flex flex-wrap justify-around gap-4">{renderCuisines}</div> */}
      <RenderCuisinesList fullList={true} />
    </div>
  )
}

export const FirstNineCuisines = () => {
  // const navigate = useNavigate();

  // const handleClick = () => navigate("/cuisines")

  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-y-8 xxs:w-full lg:w-5/6 mx-auto">
      <div className="flex justify-between">
        <h2 className="xxs:text-xl md:text-2xl lg:text-4xl">{t("Meal Cuisines")}</h2>
        {/* <Link className="text-2xl" to={"/cuisines"}>{t("See All Available Cuisines")}</Link> */}
        <Link className="xxs:text-xl md:text-2xl" to={"/cuisines"}>{t("See All")}</Link>
      </div>
      <RenderCuisinesList fullList={false} />
      {/* <button onClick={handleClick}>See All</button> */}
    </div>
  )
}

type RenderType = {
  fullList: boolean
}

const RenderCuisinesList = ({ fullList }: RenderType) => {
  const cuisines = useToGetCuisines()

  const dispatch = useAppDispatch();

  const navigate = useNavigate()

  const { ready } = useConfirmUserAuth()

  const handleClick = (name: string) => {
    ready && dispatch(inCreaseCountForCuisine(name))
    navigate(`/cuisines/${name}`)
  }

  const { t } = useTranslation()

  const renderCuisines = (
    cuisines.map((item, idx) => {
      const { name } = item;
      return (
        (!fullList && idx < 12) || (fullList)
          ?
          <button onClick={() => handleClick(name)} key={name} className="xxs:text-xl md:text-2xl xxs:w-36 sm:w-48 md:w-60 lg:w-80 h-fit flex flex-col items-center gap-y-4">{t(`${name}`)}</button>
          : null
      )
    })
  )

  return (
    <div className="flex flex-wrap justify-around gap-4">{renderCuisines}</div>
  )
}