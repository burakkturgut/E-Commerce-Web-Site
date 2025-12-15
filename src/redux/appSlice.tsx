// Bütün uygulama genelindeki ortak sliceları buraya uygulayacağım

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProductType, UserType } from '../types/Types'

export interface AppSliceType {
    currentUser: UserType | null,
    loading: boolean,
    product: ProductType[]
}


const initialState: AppSliceType = {
    currentUser: null,
    loading: false,
    product: []
}


const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state: AppSliceType, actions: PayloadAction<boolean>) => {
            state.loading = actions.payload;
        },
        setCurrentUser: (state: AppSliceType, actions: PayloadAction<UserType | null>) => {
            state.currentUser = actions.payload;
        },
        setProduct: (state: AppSliceType, actions: PayloadAction<ProductType[]>) => {
            state.product = actions.payload
        }
    }
})
export const { setLoading, setCurrentUser, setProduct } = appSlice.actions

export default appSlice.reducer