import { createAsyncThunk } from '@reduxjs/toolkit'
import * as apis from '../../apis'

export const getAllCategories = createAsyncThunk('categories', async (data, { rejectWithValue }) => {
    const res = await apis.getAllCategory()

    if (res.status !== 'success') return rejectWithValue(res)

    return res.data
})

export const getAllProduct = createAsyncThunk('products', async (data, { rejectWithValue }) => {
    const res = await apis.getAllProduct()

    if (res.status !== 'success') return rejectWithValue(res)

    return res.data
})
