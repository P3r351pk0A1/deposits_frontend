import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { api } from '../api'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../modules/Routes';

export const fetchReg = createAsyncThunk(
    'data/fetchReg',
    async ({email, password, username, firstName, lastName}: {email: string, password: string, username: string, firstName: string, lastName: string},) => {
        try{
            const response = await api.user.userRegCreate({
                email: email,
                password: password,
                username: username,
                first_name: firstName,
                last_name: lastName,
            })
            return response.data
    }
    catch(error:any){
        throw new Error(error.response.data.status)
    }
})



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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchReg.pending, (state) => {
            state.LoadingStatus = true
            console.log("p")
        });
        builder.addCase(fetchReg.fulfilled, (state) => {
            state.LoadingStatus = false
            state.errorBoxStatus = false
            console.log("f")
        });
        builder.addCase(fetchReg.rejected, (state, action) => {
            state.LoadingStatus = false
            state.errorBoxStatus = true
            state.errorBoxText = action.error.message || 'An unknown error occurred'
            console.log("r")
        });
    }
})

export const useErrorBoxStatus = () => useSelector((state: RootState) => state.data.errorBoxStatus);
export const useErrorBoxText = () => useSelector((state: RootState) => state.data.errorBoxText);
export const useLoadingStatus = () => useSelector((state: RootState) => state.data.LoadingStatus);

// const dispatch = useDispatch();
// const navigate = useNavigate();

export const {
    setErrorBoxStatus: setErrorBoxStatusAction,
    setErrorBoxText: setErrorBoxTextAction,
    setLoadingStatus: setLoadingStatusAction
} = dataSlice.actions

export const { actions: dataActions, reducer: dataReducer } = dataSlice