import httpRequest from '../utils/httpRequest'

export const addToCart = async (data) => {
    try {
        const res = await httpRequest.post('users/sendRequest', data, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}
