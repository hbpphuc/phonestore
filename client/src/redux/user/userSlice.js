import { createSlice } from '@reduxjs/toolkit'
import { getCurrentUser } from './userAction'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        curUser: null,
        isLoading: false,
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        logout(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn
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

export const { login, logout } = userSlice.actions

export default userSlice.reducer
