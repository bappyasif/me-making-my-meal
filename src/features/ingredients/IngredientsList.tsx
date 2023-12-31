import { Link } from "react-router-dom"
import { useAppDispatch } from "../../hooks"
import { useForNextAndPrevTraversal, useConfirmUserAuth, useToCheckDataExistsOnFirebase, useToGetIngredients } from "../../hooks/forComponents"
import { IngredientsType, increaseCountForIngredient } from "./ingredientSlice"
import { useTranslation } from "react-i18next"

export const IngredientsList = () => {
  return <RenderList />
}

export const RenderList = () => {
  const list = useToGetIngredients()

  const { handleNext, handlePrev, showNow, startsEnds, disableBtn } = useForNextAndPrevTraversal(list, 100)

  const content = (
    (showNow as IngredientsType[]).map((item) => <RenderIngredient name={item.name} key={item.name} />)
  )

  const listContent = (
    <div className="flex flex-col gap-y-4 items-center">
      <div className="grid xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-4 xxs:text-xl md:text-2xl">
        {content}
      </div>
      {
        list.length > 100
          ? <PrevAndNextButtons btnName={disableBtn} handleNext={handleNext} handlePrev={handlePrev} />
          : null
      }
    </div>
  )

  const { t } = useTranslation()

  const headingsContent = (
    <div className="flex justify-between gap-x-2 items-baseline">
      <h1 className="xxs:text-2xl md:text-4xl xl:text-6xl">{t("Total")} - {list.length} - {t("Ingredients")} {t("Found")}</h1>

      <h2 className="xxs:text-lg md:text-xl xl:text-2xl">{t("Currently Showing")} {startsEnds[0]} - {startsEnds[1] < list.length ? startsEnds[1] : list.length} </h2>
    </div>
  )

  return (
    <div className="flex flex-col gap-y-8 z-10">
      {headingsContent}

      {listContent}
    </div>
  )
}

export const PrevAndNextButtons = ({ handleNext, handlePrev, btnName }: { handleNext: () => void, handlePrev: () => void, btnName: string }) => {
  return (
    <div className="flex gap-4">
      <button className={`${btnName === "Prev" ? "pointer-events-none bg-slate-600" : ""}`} disabled={btnName === "Prev"} onClick={handlePrev}>Prev</button>
      <button className={`${btnName === "Next" ? "pointer-events-none bg-slate-600" : ""}`} disabled={btnName === "Next"} onClick={handleNext}>Next</button>
    </div>
  )
}

const RenderIngredient = ({ name }: { name: string }) => {
  const dispatch = useAppDispatch();

  const { ready } = useConfirmUserAuth()

  const { found } = useToCheckDataExistsOnFirebase("Ingredients", "Ingredient", name)

  const handleClick = (ingredientName: string) => {
    ready && dispatch(increaseCountForIngredient({ name: ingredientName, update: found }))
  }

  return (
    <div className="xxs:h-fit md:h-20 bg-slate-600 px-2 flex justify-center items-center text-center opacity-80">
      <Link className="text-slate-200 hover:text-blue-200 w-96" onClick={() => handleClick(name)}
        to={`/ingredients/${name.toLocaleLowerCase().split(" ").join("-")}`}
      >{name}</Link>
    </div>
  )
}