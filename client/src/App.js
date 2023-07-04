import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Default } from './pages/public'
import { publicRoutes } from './routes'

function App() {
    return (
        <div className="w-full min-h-screen">
            <Routes>
                <Route path="/" element={<Default />}>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component
                        return (
                            <Route key={index} path={route.path} element={<Page />}>
                                {route.child &&
                                    route.child.map((el, index) => {
                                        const ChildPage = el.component
                                        return <Route key={index} path={el.path} element={<ChildPage />} />
                                    })}
                            </Route>
                        )
                    })}
                </Route>
            </Routes>
        </div>
    )
}

export default App
