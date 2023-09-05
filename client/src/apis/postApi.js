import httpRequest from '../utils/httpRequest'

export const getAllPost = async () => {
    try {
        const res = await httpRequest.get('posts')
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getPost = async (slug) => {
    try {
        const res = await httpRequest.get(`posts/${slug}`)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const likePost = async (id) => {
    try {
        const res = await httpRequest.put(`posts/${id}/like`, {}, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const dislikePost = async (id) => {
    try {
        const res = await httpRequest.put(`posts/${id}/dislike`, {}, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}
