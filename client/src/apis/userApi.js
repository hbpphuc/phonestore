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
        const res = await httpRequest.post('users/login', data, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const logout = async () => {
    try {
        const res = await httpRequest.get('users/logout', { withCredentials: true })
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
        const res = await httpRequest.update(`users/resetPassword/${token}`, data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const updateMe = async (data) => {
    try {
        const res = await httpRequest.put(`users/updateMe`, data, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const updatePassword = async (data) => {
    try {
        const res = await httpRequest.put(`users/updatePassword`, data, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getCurrentUser = async () => {
    try {
        const res = await httpRequest.get('users/me', { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getAllUser = async (q, page, limit) => {
    try {
        const res = await httpRequest.get('users', { params: { q, page, limit }, withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const updateUser = async (id, data) => {
    try {
        const res = await httpRequest.put(`users/${id}`, data, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const deleteUser = async (id) => {
    try {
        const res = await httpRequest.delete(`users/${id}`, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const addToCart = async (data) => {
    try {
        const res = await httpRequest.put('users/updateCart', data, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const addToWishlist = async ({ pId }) => {
    try {
        const res = await httpRequest.put('users/addToWishlist', { pId }, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getUserWishlist = async () => {
    try {
        const res = await httpRequest.get('users/getUserWishlist', { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}
