import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { api} from '../api'
import {User} from '../api/Api'

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

export const fetchAuth = createAsyncThunk(
    'data/fetchAuth',
    async({username, password}: {username: string, password: string}) => {
        try{
            const response = await api.user.userLoginCreate({
                username: username,
                password: password,
                email: '',
                first_name: '',
                last_name: ''
            })
            return response.data
        }
        catch(error:any){
            throw new Error(error.response.data.status)
        }
    }
)

export const fetchLogOut = createAsyncThunk(
    'data/fetchLogOut',
    async() => {
        try{
            const response = await api.user.userLogoutCreate()
            return response.data
        } 
        catch(error:any){
            throw new Error(error.response.data.status)
        }
    }
)

export const fetchLK = createAsyncThunk(
    'data/fetchLK',
    async ({email, password, username, firstName, lastName}: {email: string, password: string, username: string, firstName: string, lastName: string},) => {
        try{
            const response = await api.user.userLkUpdate({
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
        user: {} as User,
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
        },
        setUser(state, {payload}){
            state.user = payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchReg.pending, (state) => {
            state.LoadingStatus = true
        });
        builder.addCase(fetchReg.fulfilled, (state) => {
            state.LoadingStatus = false
            state.errorBoxStatus = false
        });
        builder.addCase(fetchReg.rejected, (state, action) => {
            state.LoadingStatus = false
            state.errorBoxStatus = true
            state.errorBoxText = action.error.message || 'An unknown error occurred'
        });

        builder.addCase(fetchAuth.pending, (state) => {
            state.LoadingStatus = true
        });
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.user = action.payload
            state.LoadingStatus = false
            state.errorBoxStatus = false
        });
        builder.addCase(fetchAuth.rejected, (state, action) => {
            state.LoadingStatus = false
            state.errorBoxStatus = true
            state.errorBoxText = action.error.message || 'An unknown error occurred'
        });

        builder.addCase(fetchLogOut.pending, (state) =>{
            state.LoadingStatus = true
        });
        builder.addCase(fetchLogOut.fulfilled, (state) =>{
            state.user = {} as User
            state.LoadingStatus = false
            state.errorBoxStatus = false
        });
        builder.addCase(fetchLogOut.rejected, (state, action) =>{
            state.errorBoxStatus = true
            state.LoadingStatus = false
            state.errorBoxText = action.error.message || 'An unknown error occurred'
        });

        builder.addCase(fetchLK.pending, (state) => {
            state.LoadingStatus = true
        });
        builder.addCase(fetchLK.fulfilled, (state, action) => {
            state.user = action.payload  
            state.LoadingStatus = false
            state.errorBoxStatus = false
        });
        builder.addCase(fetchLK.rejected, (state, action) => {
            state.errorBoxStatus = true
            state.LoadingStatus = false
            state.errorBoxText = action.error.message || 'An unknown error occurred'
        });
}})

export const useErrorBoxStatus = () => useSelector((state: RootState) => state.data.errorBoxStatus);
export const useErrorBoxText = () => useSelector((state: RootState) => state.data.errorBoxText);
export const useLoadingStatus = () => useSelector((state: RootState) => state.data.LoadingStatus);
export const useUser = () => useSelector((state: RootState) => state.data.user);

// const dispatch = useDispatch();
// const navigate = useNavigate();

export const {
    setErrorBoxStatus: setErrorBoxStatusAction,
    setErrorBoxText: setErrorBoxTextAction,
    setLoadingStatus: setLoadingStatusAction,
    setUser: setUserAction,
} = dataSlice.actions

export const { actions: dataActions, reducer: dataReducer } = dataSlice