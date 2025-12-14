// Bütün uygulama genelindeki ortak sliceları buraya uygulayacağım

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UserType } from '../types/Types'

export interface AppSliceType {
    currentUser: UserType | null,
    loading: boolean
}


const initialState: AppSliceType = {
    currentUser: null,
    loading: false
}


const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state: AppSliceType, actions: PayloadAction<boolean>) => {
            state.loading = actions.payload;
        },
        setCurrentUser: (state: AppSliceType, actions: PayloadAction<UserType>) => {
            state.currentUser = actions.payload;
        }

    }
})
export const { setLoading, setCurrentUser } = appSlice.actions

export default appSlice.reducer