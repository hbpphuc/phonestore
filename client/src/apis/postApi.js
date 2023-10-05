import httpRequest from '../axios/httpRequest'

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

export const createPost = async (data) => {
    try {
        const res = await httpRequest.post('posts', data, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const updatePost = async (id, data) => {
    try {
        const res = await httpRequest.put(`posts/${id}`, data, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const deletePost = async (id) => {
    try {
        const res = await httpRequest.delete(`posts/${id}`, { withCredentials: true })
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
