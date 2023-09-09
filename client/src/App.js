import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Cookies from 'js-cookie'

import { publicR, privateR, adminR } from './routes'
import { publicRoutes } from './routes/paths'
import { Default, NotFound, Signup } from './pages/public'
import { Admin, NotFoundAdmin } from 'pages/admin'
import { Private } from 'pages/private'

import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'

function App() {
    const { isLoggedIn, curUser } = useSelector((state) => state.user)

    const { signupToken } = Cookies.get()

    return (
        <>
            <div className="w-full min-h-screen">
                <Routes>
                    <Route path="/" element={<Default />}>
                        {publicR.map((route, index) => {
                            const Page = route.component
                            return <Route key={index} path={route.path} element={<Page />} />
                        })}
                        {isLoggedIn && curUser && (
                            <Route path="/me" element={<Private />}>
                                {privateR.map((route, index) => {
                                    const Page = route.component
                                    return <Route key={index} path={route.path} element={<Page />} />
                                })}
                            </Route>
                        )}
                        <Route path="*" element={<NotFound />} />
                    </Route>

                    <Route path={publicRoutes.signup} element={<Signup />} />

                    {isLoggedIn && curUser?.data?.role === 'admin' && (
                        <Route path="/admin" element={<Admin />}>
                            {adminR.map((route, index) => {
                                const Page = route.component
                                return <Route key={index} path={route.path} element={<Page />} />
                            })}
                            <Route path="*" element={<NotFoundAdmin />} />
                        </Route>
                    )}
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
                theme="light"
            />
        </>
    )
}

export default App
