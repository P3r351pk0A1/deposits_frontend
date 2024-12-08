import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { RootState } from "../store"

const dataSlice = createSlice({
    name: "data",
    
    // в initialState мы указываем начальное состояние нашего глобального хранилища
    initialState: {
        errorBoxStatus: false,
        errorBoxText :'',
        LoadingStatus: false,
    },
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
        setErrorBoxStatus(state, {payload}){
            state.errorBoxStatus = payload
        },
        setErrorBoxText(state, {payload}){
            state.errorBoxText = payload
        },
        setLoadingStatus(state, {payload}){
            state.LoadingStatus = payload
        }
    }
})

export const useErrorBoxStatus = () => useSelector((state: RootState) => state.data.errorBoxStatus);
export const useErrorBoxText = () => useSelector((state: RootState) => state.data.errorBoxText);
export const useLoadingStatus = () => useSelector((state: RootState) => state.data.LoadingStatus);

export const {
    setErrorBoxStatus: setErrorBoxStatusAction,
    setErrorBoxText: setErrorBoxTextAction,
    setLoadingStatus: setLoadingStatusAction
} = dataSlice.actions

export const { actions: dataActions, reducer: dataReducer } = dataSlice