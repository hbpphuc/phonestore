import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import appSlice from './app/appSlice'
import userSlice from './user/userSlice'

const persistConfig = {
    key: 'DIGITALWORLD',
    storage,
}

const userConfig = {
    ...persistConfig,
    whitelist: ['isLoggedIn'],
}

const reducer = combineReducers({
    app: appSlice,
    user: persistReducer(userConfig, userSlice),
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store)
