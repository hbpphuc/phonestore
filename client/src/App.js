import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Cookies from 'js-cookie'

import { publicR, privateR, adminR } from './routes'
import { publicRoutes } from './routes/paths'
import { Default, NotFound, Signup } from './pages/public'
import { Admin, NotFoundAdmin } from 'pages/admin'
import { Private } from 'pages/private'
import { setWidth } from 'redux/app/appSlice'

import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import { Icon } from 'components'

function App() {
    const { isLoggedIn, curUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()

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
