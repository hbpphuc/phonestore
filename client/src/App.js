import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { publicR, adminR } from './routes'
import { publicRoutes } from './routes/paths'
import { Default, NotFound, Signup } from './pages/public'
import { NotFoundAdmin } from './pages/admin'
import { Admin } from 'pages/admin'

function App() {
    return (
        <>
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
                        <Route path="*" element={<NotFoundAdmin />} />
                    </Route>
                </Routes>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default App
