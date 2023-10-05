import { createAsyncThunk } from '@reduxjs/toolkit'
import * as apis from '../../apis'

export const getCurrentUser = createAsyncThunk('user', async (data, { rejectWithValue }) => {
    const res = await apis.getCurrentUser()

    if (res.status !== 'success') return rejectWithValue(res)

    return res.data
})

export const logout = createAsyncThunk('user', async (data, { rejectWithValue }) => {
    const res = await apis.getCurrentUser()

    if (res.status !== 'success') return rejectWithValue(res)

    return res.data
})
