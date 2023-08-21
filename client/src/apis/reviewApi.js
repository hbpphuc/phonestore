import httpRequest from '../utils/httpRequest'

export const getReviewOnProduct = async (id) => {
    try {
        const res = await httpRequest.get(`products/${id}/reviews`)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const createReviewOnProduct = async (id, data) => {
    try {
        const res = await httpRequest.post(`products/${id}/reviews`, data, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}
