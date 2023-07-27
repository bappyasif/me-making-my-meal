import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootStateType } from "../app/store"

export const useAppDispatch: () => AppDispatch = useDispatch

// recommended method
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
