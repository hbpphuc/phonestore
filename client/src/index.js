import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import ScrollToTop from './hooks/ScrollToTop'
import 'react-loading-skeleton/dist/skeleton.css'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <ScrollToTop />
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
    // </React.StrictMode>
)
