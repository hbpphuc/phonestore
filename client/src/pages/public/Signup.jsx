import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { routes } from 'routes/paths'

const Signup = () => {
    const { status } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (status === 'success')
            Swal.fire('Congratulation!', 'Now you can log in!', 'success').then(() => navigate(`/${routes.home}`))

        if (status === 'fail')
            Swal.fire('Oops!', 'Can not sign up. Please try again!', 'error').then(() => navigate(`/${routes.home}`))
    }, [])
    return <div className="w-creen h-creen bg-gray-200"></div>
}

export default Signup
