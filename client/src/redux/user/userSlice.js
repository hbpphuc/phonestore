import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        curUser: null,
        token: null,
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn
            state.curUser = action.payload.userData
            state.token = action.payload.token
        },
    },
    // extraReducers: (builder) => {
    //     // categories
    //     builder.addCase(actions.getAllCategories.pending, (state, action) => {
    //         state.isLoading = true
    //     })

    //     builder.addCase(actions.getAllCategories.fulfilled, (state, action) => {
    //         state.isLoading = false
    //         state.categories = action.payload
    //     })

    //     builder.addCase(actions.getAllCategories.rejected, (state, action) => {
    //         state.isLoading = false
    //     })
    // },
})

export const { login } = userSlice.actions

export default userSlice.reducer
