// Bütün uygulama genelindeki ortak sliceları buraya uygulayacağım

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProductType, UserType, AppSliceType } from '../types/Types'

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
        },
        filterProduct: (state: AppSliceType, actions: PayloadAction<string>) => {
            const tempList: ProductType[] = []
            state.product.map((product: ProductType) => {
                if (product.title.toLowerCase().includes(actions.payload.toLowerCase())) {
                    tempList.push(product)
                }
            })

            state.product = [...tempList]
        }
    }
})
export const { setLoading, setCurrentUser, setProduct, filterProduct } = appSlice.actions

export default appSlice.reducer