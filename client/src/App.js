import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import jwtDecode from 'jwt-decode'

import { publicR, privateR, adminR } from './routes'
import { publicRoutes } from './routes/paths'
import { Alert, Default, NotFound } from './pages/public'
import { Admin, NotFoundAdmin } from './pages/admin'
import { Private } from './pages/private'
import { setWidth } from './redux/app/appSlice'
import { Icon } from './components'
import * as apis from './apis'

import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import Cookies from 'js-cookie'

function App() {
    const { isLoggedIn, curUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const accessToken = Cookies.get('jwt')

    const [showTop, setShowTop] = useState(false)
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleScroll = () => {
            setShowTop(window.scrollY >= 700)
        }
        const handleResize = (e) => {
            setDeviceWidth(e.target.innerWidth)
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        dispatch(setWidth(deviceWidth))
    }, [deviceWidth])

    useEffect(() => {
        let intervalId

        const refreshToken = async () => {
            await apis.refreshToken()
        }

        if (accessToken)
            intervalId = setInterval(() => {
                if (!(jwtDecode(accessToken).exp < new Date().getTime() / 1000)) refreshToken()
            }, 10 * 60 * 1000)

        return () => clearInterval(intervalId)
    }, [])

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

                    <Route
                        path={publicRoutes.signup}
                        element={<Alert successMsg="Now you can log in!" errMsg="Can not sign up. Please try again!" />}
                    />
                    <Route
                        path={publicRoutes.ggLogin}
                        element={
                            <Alert
                                successMsg="Logged in by Google account!"
                                errMsg="Can not Log in. Please try again!"
                                isOAuth
                            />
                        }
                    />

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

            {showTop && (
                <button
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="p-[8px_4px] flex justify-center items-center bg-glassmorphism fixed right-5 bottom-5 text-main rounded-md"
                >
                    <Icon.MdVerticalAlignTop size={deviceWidth > 640 ? 40 : 32} />
                </button>
            )}
        </>
    )
}

export default App
