import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { publicR, adminR } from './routes'
import { publicRoutes } from './routes/paths'
import { Default, NotFound, Signup } from './pages/public'
import { Admin } from 'pages/admin'

function App() {
    return (
        <div className="w-full min-h-screen">
            <Routes>
                <Route path="/" element={<Default />}>
                    {publicR.map((route, index) => {
                        const Page = route.component
                        return <Route key={index} path={route.path} element={<Page />} />
                    })}
                    <Route path="*" element={<NotFound />} />
                </Route>

                <Route path={publicRoutes.signup} element={<Signup />} />

                <Route path="/admin" element={<Admin />}>
                    {adminR.map((route, index) => {
                        const Page = route.component
                        return <Route key={index} path={route.path} element={<Page />} />
                    })}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
