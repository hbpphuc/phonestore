import httpRequest from '../utils/httpRequest'

export const getPost = async (slug) => {
    try {
        const res = await httpRequest.get(`posts/${slug}`)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
