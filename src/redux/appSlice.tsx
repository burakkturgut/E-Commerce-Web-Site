// Bütün uygulama genelindeki ortak sliceları buraya uygulayacağım

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProductType, UserType, AppSliceType } from '../types/Types'
import { act } from 'react';

const initialState: AppSliceType = {
    currentUser: null,
    loading: false,
    drawer: false,
    product: []
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state: AppSliceType, actions: PayloadAction<boolean>) => {
            state.loading = actions.payload;
        },
        setDrawer: (state: AppSliceType, actions: PayloadAction<boolean>) => {
            state.drawer = actions.payload
        },
        setCurrentUser: (state: AppSliceType, actions: PayloadAction<UserType | null>) => {
            state.currentUser = actions.payload;
        },
        updateBalance: (state: AppSliceType, actions: PayloadAction<UserType>) => {
            const user: UserType = {
                id: actions.payload.id,
                username: actions.payload.username,
                password: actions.payload.password,
                balance: actions.payload.balance
                // yukardaki yöntem yerine object destructing yaparak sadece jepsini tek satırda yazabilridik
                // ->    ...action.payload
            }
            state.currentUser = user;
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser))
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
export const { setLoading, setDrawer, setCurrentUser, updateBalance, setProduct, filterProduct } = appSlice.actions

export default appSlice.reducer