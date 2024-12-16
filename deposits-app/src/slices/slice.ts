import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { api} from '../api'
import {User, MiningService, LinkServiceOrder, SingleMiningOrder} from '../api/Api'
import { MINING_SERVICES_MOCK } from '../modules/mock';

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

export const fetchAddMiningServiceToOrder = createAsyncThunk(
    'data/fetchAddMiningServiceToOrder',
    async (id: number) => {
        try{
            const response = await api.miningServices.miningServicesCreate2(id.toString())
            return response.data
        }
        catch(error:any){
            throw new Error(error.response.data.status)
        }
    }
)

export const fetchMiningServicesList = createAsyncThunk(
    'data/fetchMiningServicesList',
    async (name: string) => {
        try{
            const response = await api.miningServices.miningServicesList({name: name})
            return response.data
        }
        catch(error:any){
            throw new Error(error.response.data.status)
        }
    }
)

export const fetchGetMiningOrder = createAsyncThunk(
    'data/fetchGetMiningOrder',
    async (id: number) => {
        try{
            const response = await api.miningOrders.miningOrdersRead(id.toString())
            return response.data
        }
        catch(error:any){
            throw new Error(error.response.data.status)
        }
    }
)


interface DataState {
    mining_services: MiningService[];
    MServicesInCurOrder: LinkServiceOrder[];
    miningServisesInCurOrderCount: number;
    curOrderId: number | null;
    LoadingStatus: boolean;
    errorBoxStatus: boolean;
    errorBoxText: string;
    searchValue: string;
    user: User;
    miningOrder: SingleMiningOrder;
}

const initialState: DataState = {
    mining_services: [],
    MServicesInCurOrder: [],
    miningServisesInCurOrderCount: 0,
    curOrderId: 0,
    LoadingStatus: false,
    errorBoxStatus: false,
    errorBoxText :'',
    searchValue: '',
    user: {} as User,
    miningOrder: {} as SingleMiningOrder,
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    
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
        setSearchValue(state, {payload}){
            state.searchValue = payload
        }
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
            //обнуление всех состояний при логауте
            state.user = initialState.user
            state.mining_services = initialState.mining_services
            state.MServicesInCurOrder = initialState.MServicesInCurOrder
            state.miningServisesInCurOrderCount = initialState.miningServisesInCurOrderCount
            state.curOrderId = initialState.curOrderId
            state.LoadingStatus = initialState.LoadingStatus
            state.errorBoxStatus = initialState.errorBoxStatus
            state.errorBoxText = initialState.errorBoxText
            state.searchValue = initialState.searchValue
            state.miningOrder = initialState.miningOrder
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

        builder.addCase(fetchAddMiningServiceToOrder.pending, (state) => {
            state.LoadingStatus = true
        });
        builder.addCase(fetchAddMiningServiceToOrder.fulfilled, (state, action) => {
            state.miningServisesInCurOrderCount = action.payload.MiningServicesInUsersDraft
            state.LoadingStatus = false
            state.errorBoxStatus = false
        });
        builder.addCase(fetchAddMiningServiceToOrder.rejected, (state, action) => {
            state.errorBoxStatus = true
            state.LoadingStatus = false
            state.errorBoxText = action.error.message || 'An unknown error occurred'
        });

        builder.addCase(fetchMiningServicesList.pending, (state) => {
            state.LoadingStatus = true
        });
        builder.addCase(fetchMiningServicesList.fulfilled, (state, action) => {
            state.mining_services = action.payload.services
            state.miningServisesInCurOrderCount = action.payload.active_m_order.MiningServicesInUsersDraft
            state.curOrderId = action.payload.active_m_order.UsersDraftId
            state.MServicesInCurOrder = action.payload.MServicesInCurOrder      
            state.LoadingStatus = false
            state.errorBoxStatus = false
        });
        builder.addCase(fetchMiningServicesList.rejected, (state, action) => {
            state.errorBoxStatus = true
            state.LoadingStatus = false
            for (let i = 0; i < MINING_SERVICES_MOCK.Services.length; i++){
                if(MINING_SERVICES_MOCK.Services[i].name.includes(state.searchValue)){
                    state.mining_services.push(MINING_SERVICES_MOCK.Services[i])
                }
            }
            state.errorBoxText = action.error.message || 'An unknown error occurred'
        });

        builder.addCase(fetchGetMiningOrder.pending, (state) => {
            state.LoadingStatus = true
        });
        builder.addCase(fetchGetMiningOrder.fulfilled, (state, action) => {
            state.miningOrder = action.payload
            state.LoadingStatus = false
            state.errorBoxStatus = false
        });
        builder.addCase(fetchGetMiningOrder.rejected, (state, action) => {
            state.errorBoxStatus = true
            state.LoadingStatus = false
            state.errorBoxText = action.error.message || 'An unknown error occurred'
        });
}})

export const useErrorBoxStatus = () => useSelector((state: RootState) => state.data.errorBoxStatus);
export const useErrorBoxText = () => useSelector((state: RootState) => state.data.errorBoxText);
export const useLoadingStatus = () => useSelector((state: RootState) => state.data.LoadingStatus);
export const useUser = () => useSelector((state: RootState) => state.data.user);
export const useCurOrderId = () => useSelector((state: RootState) => state.data.curOrderId);
export const useMServicesInCurOrder = () => useSelector((state: RootState) => state.data.MServicesInCurOrder);
export const useminingServisesInCurOrderCount = () => useSelector((state: RootState) => state.data.miningServisesInCurOrderCount);
export const useSearchValue = () => useSelector((state: RootState) => state.data.searchValue);
export const useMiningServices = () => useSelector((state: RootState) => state.data.mining_services);
export const useMiningOrder = () => useSelector((state: RootState) => state.data.miningOrder);

// mining_services: MiningService[];
// MServicesInCurOrder: LinkServiceOrder[];
// miningServisesInCurOrderCount: number;
// curOrderId: number | null;
// LoadingStatus: boolean;
// errorBoxStatus: boolean;
// errorBoxText: string;
// searchValue: string;
// user: any; // Замените на правильный тип

// const dispatch = useDispatch();
// const navigate = useNavigate();

export const {
    setErrorBoxStatus: setErrorBoxStatusAction,
    setErrorBoxText: setErrorBoxTextAction,
    setLoadingStatus: setLoadingStatusAction,
    setUser: setUserAction,
    setSearchValue: setSearchValueAction
} = dataSlice.actions

export const { actions: dataActions, reducer: dataReducer } = dataSlice