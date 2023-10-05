import { createSlice } from '@reduxjs/toolkit'
import * as actions from './action'

const appSlice = createSlice({
    name: 'app',
    initialState: {
        isLoading: false,
        isShowModal: false,
        categories: null,
        products: null,
        cateId: null,
        deviceWidth: null,
    },
    reducers: {
        getCateId(state, action) {
            state.cateId = action.payload
        },
        setShowModal(state, action) {
            state.isShowModal = action.payload
        },
        setWidth(state, action) {
            state.deviceWidth = action.payload
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
    },
})

export const { getCateId, setShowModal, setWidth } = appSlice.actions

export default appSlice.reducer
