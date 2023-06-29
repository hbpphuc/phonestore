import { createSlice } from '@reduxjs/toolkit'
import * as actions from './action'

const appSlice = createSlice({
    name: 'app',
    initialState: {
        isLoading: false,
        categories: null,
        products: null,
        cateId: null,
    },
    reducers: {
        getCateId(state, action) {
            state.cateId = action.payload
        },
    },
    extraReducers: (builder) => {
        // categories
        builder.addCase(actions.getAllCategories.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(actions.getAllCategories.fulfilled, (state, action) => {
            state.isLoading = false
            state.categories = action.payload
        })

        builder.addCase(actions.getAllCategories.rejected, (state, action) => {
            state.isLoading = false
        })

        // products
        builder.addCase(actions.getAllProduct.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(actions.getAllProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.categories = action.payload
        })

        builder.addCase(actions.getAllProduct.rejected, (state, action) => {
            state.isLoading = false
        })
    },
})

export const { getCateId } = appSlice.actions

export default appSlice.reducer
