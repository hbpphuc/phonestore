import httpRequest from '../utils/httpRequest'

export const requestSignup = async (data) => {
    try {
        const res = await httpRequest.post('users/sendRequest', data, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const login = async (data) => {
    try {
        const res = await httpRequest.post('users/login', data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const forgotPassword = async (data) => {
    try {
        const res = await httpRequest.post('users/forgotPassword', data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const resetPassword = async (data, token) => {
    try {
        const res = await httpRequest.put(`users/resetPassword/${token}`, data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
