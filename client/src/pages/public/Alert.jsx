import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { publicRoutes } from '../../routes/paths'
import { login } from '../../redux/user/userSlice'

const Alert = ({ successMsg, errMsg, isOAuth }) => {
    const { status } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (status === 'success')
            Swal.fire('OK', successMsg, 'success')
                .then(() => navigate(`/${publicRoutes.home}`))
                .then(() => isOAuth && dispatch(login({ isLoggedIn: true })))

        if (status === 'fail') Swal.fire('Oops!', errMsg, 'error').then(() => navigate(`/${publicRoutes.home}`))
    }, [])
    return <div className="w-creen h-creen bg-gray-200"></div>
}

export default Alert
