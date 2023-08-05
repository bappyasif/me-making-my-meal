import { Link } from "react-router-dom"
import { useAppDispatch } from "../../hooks"
import { useConfirmUserAuth, useToCheckDataExistsOnFirebase, useToGetIngredients } from "../../hooks/forComponents"
import { IngredientsType, increaseCountForIngredient } from "./ingredientSlice"
import { useEffect, useState } from "react"

export const IngredientsList = () => {
  const list = useToGetIngredients()

  // console.log(list, "ingredients!!")

  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="xxs:text-2xl md:text-4xl">Total - {list.length} - Ingredients Found</h1>
      <RenderList />
    </div>
  )
}

export const RenderList = () => {
  const [startsEnds, setStartsEnds] = useState<number[]>([0, 100])
  const [showNow, setShowNow] = useState<IngredientsType[]>([])

  const list = useToGetIngredients()

  const handleNext = () => {
    const newStart = startsEnds[1];
    const newEnd = newStart + 100;
    if (newStart < list.length) {
      const readyList = list.slice(newStart, newEnd)
      setShowNow(readyList)
      setStartsEnds([newStart, newEnd])
      // console.log(newStart, newEnd, "next block")
    }
  }

  const handlePrev = () => {
    const newStart = startsEnds[0] - 100;
    const newEnd = startsEnds[0]
    if (newStart >= 0) {
      const readyList = list.slice(newStart, newEnd)
      setShowNow(readyList)
      setStartsEnds([newStart, newEnd])
      // console.log(newStart, newEnd, "prev block")
    }
  }

  useEffect(() => {
    list && setShowNow(list.slice(0, 100))
  }, [list])

  const content = (
    showNow.map((item) => <RenderIngredient name={item.name} key={item.name} />)
  )

  return (
    <div className="flex flex-col gap-y-4 items-center">
      <div className="grid xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-4 xxs:text-xl md:text-2xl">
        {content}
      </div>
      <PrevAndNextButtons handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  )
}

const PrevAndNextButtons = ({ handleNext, handlePrev }: { handleNext: () => void, handlePrev: () => void }) => {
  return (
    <div className="flex gap-4">
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}

const RenderIngredient = ({name}: {name:string}) => {
  const dispatch = useAppDispatch();

  const { ready } = useConfirmUserAuth()

  const { found } = useToCheckDataExistsOnFirebase("Ingredients", "Ingredient", name)

  const handleClick = (ingredientName: string) => {
    ready && dispatch(increaseCountForIngredient({name: ingredientName, update: found}))
  }

  return (
    <div className="xxs:h-fit md:h-20 bg-slate-600 px-2 flex justify-center items-center text-center opacity-80">
      <Link className="text-slate-200 hover:text-blue-200 w-96" onClick={() => handleClick(name)} 
      to={`/ingredients/${name.toLocaleLowerCase().split(" ").join("-")}`}
      >{name}</Link>
    </div>
  ) 
}