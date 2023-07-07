import httpRequest from '../utils/httpRequest'

export const registerMail = async (data) => {
    try {
        const res = await httpRequest.post('users/signup', data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const signup = async (data) => {
    try {
        const res = await httpRequest.post('users/signup/:token', data)
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
