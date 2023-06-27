import { createSlice } from '@reduxjs/toolkit'
import * as actions from './action'

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        isLoading: false,
        categories: null,
    },
    reducers: {},
    extraReducers: (builder) => {
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
    },
})

export const {} = rootSlice.actions

export default rootSlice.reducer
