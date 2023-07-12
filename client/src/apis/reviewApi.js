import httpRequest from '../utils/httpRequest'

export const getReviewOnProduct = async (id) => {
    try {
        const res = await httpRequest.get(`products/${id}/reviews`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
