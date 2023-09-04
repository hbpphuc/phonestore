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
