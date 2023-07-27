import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../hooks"
import { useToGetCuisines } from "../../hooks/forComponents"
import { inCreaseCountForCuisine } from "./areaSlices"
import { useTranslation } from "react-i18next"

export const CuisinesList = () => {
  const {t} = useTranslation()

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

  const {t} = useTranslation()

  return (
    <div className="flex flex-col gap-8 w-5/6 mx-auto">
      <div className="flex justify-between">
        <h2 className="text-4xl">{t("Meal Cuisines")}</h2>
        {/* <Link className="text-2xl" to={"/cuisines"}>{t("See All Available Cuisines")}</Link> */}
        <Link className="text-2xl" to={"/cuisines"}>{t("See All")}</Link>
      </div>
      <h2></h2>
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

  const handleClick = (name: string) => {
    dispatch(inCreaseCountForCuisine(name))
    navigate(`/cuisines/${name}`)
  }

  const {t} = useTranslation()

  const renderCuisines = (
    cuisines.map((item, idx) => {
      const { name } = item;
      return (
        (!fullList && idx < 12) || (fullList)
          ?
          <button onClick={() => handleClick(name)} key={name} className="w-80 text-4xl">{t(`${name}`)} {item.count}</button>
          : null
      )
    })
  )

  return (
    <div className="flex flex-wrap justify-around gap-4">{renderCuisines}</div>
  )
}