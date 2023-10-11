import axios from 'axios'
import Cookies from 'js-cookie'

const httpRequest = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL })

const accessToken = Cookies.get('jwt')

httpRequest.interceptors.request.use(async (config) => {
    try {
        if (!accessToken) return config

        config.headers = { x_authorization: accessToken }

        return config
    } catch (error) {
        console.log(error)
    }
})

httpRequest.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status === 401 || error.response.data.message === 'jwt expired') {
            axios
                .get(`${process.env.REACT_APP_SERVER_URL}users/refreshToken`, {
                    withCredentials: true,
                    headers: { x_authorization: accessToken },
                })
                .then((response) => {
                    Cookies.set('jwt', response.data.accessToken)
                    window.location.reload()
                })
        }
        return Promise.reject(error)
    }
)

export default httpRequest
