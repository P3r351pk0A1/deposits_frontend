import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { dataReducer } from "./slices/slice";

export const store = configureStore({
    reducer: combineReducers({
        data: dataReducer,
    }),
});




export type RootState = ReturnType<typeof store.getState>;