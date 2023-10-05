import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import appSlice from './app/appSlice'
import orderSlice from './order/orderSlice'
import userSlice from './user/userSlice'

const persistConfig = {
    key: 'DIGITALWORLD',
    storage,
}

const config = {
    ...persistConfig,
    whitelist: ['isLoggedIn', 'productInCart'],
}

const reducer = combineReducers({
    app: appSlice,
    order: persistReducer(config, orderSlice),
    user: persistReducer(config, userSlice),
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store)
