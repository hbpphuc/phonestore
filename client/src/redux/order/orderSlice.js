import { createSlice } from '@reduxjs/toolkit'
import * as orderAction from '../order/orderAction'

const appSlice = createSlice({
    name: 'order',
    initialState: {
        productInCart: 0,
    },
    reducers: {
        setProductInCart(state, action) {
            state.productInCart = action.payload
        },
    },
})

export const { setProductInCart } = appSlice.actions

export default appSlice.reducer
