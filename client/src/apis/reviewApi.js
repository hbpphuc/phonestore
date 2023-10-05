import httpRequest from '../axios/httpRequest'

export const getReviewOnProduct = async (id) => {
    try {
        const res = await httpRequest.get(`products/${id}/reviews`)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getReview = async (id) => {
    try {
        const res = await httpRequest.get(`reviews/${id}`)
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

export const updateReviewOnProduct = async (pId, rId, data) => {
    try {
        const res = await httpRequest.patch(`products/${pId}/reviews/${rId}`, data, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const deleteReviewOnProduct = async (pId, rId) => {
    try {
        const res = await httpRequest.delete(`products/${pId}/reviews/${rId}`, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const createReplyReview = async (rId, data) => {
    try {
        const res = await httpRequest.put(`reviews/${rId}/reply/create`, data, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const deleteReplyReview = async (rId, repId) => {
    try {
        const res = await httpRequest.put(`reviews/${rId}/reply/delete/${repId}`, {}, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}
