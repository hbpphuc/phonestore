import { createSlice } from '@reduxjs/toolkit'
import { getCurrentUser } from './userAction'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        curUser: null,
        isLoading: false,
        isWishlist: false,
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        logoutt(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        wishlist(state, action) {
            state.isWishlist = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.curUser = action.payload
        })

        builder.addCase(getCurrentUser.rejected, (state) => {
            state.isLoading = false
        })
    },
})

export const { login, logoutt, wishlist } = userSlice.actions

export default userSlice.reducer
