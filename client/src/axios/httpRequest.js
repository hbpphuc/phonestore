import axios from 'axios'
import Cookies from 'js-cookie'

const httpRequest = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL })

let accessToken = Cookies.get('jwt')

// Request interceptor for API calls
httpRequest.interceptors.request.use(async (config) => {
    try {
        if (!accessToken) return config

        config.headers = { x_authorization: accessToken }

        return config
    } catch (error) {
        console.log(error)
    }
})

export default httpRequest
