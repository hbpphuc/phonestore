import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Default, NotFound, Signup } from './pages/public'
import { publicRoutes } from './routes'
import { routes } from './routes/paths'

function App() {
    return (
        <div className="w-full min-h-screen">
            <Routes>
                <Route path="/" element={<Default />}>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component
                        return <Route key={index} path={route.path} element={<Page />} />
                    })}
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path={routes.signup} element={<Signup />} />
            </Routes>
        </div>
    )
}

export default App
