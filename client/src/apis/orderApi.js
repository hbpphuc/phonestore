import httpRequest from '../utils/httpRequest'

export const getCheckoutSession = async (data) => {
    try {
        const res = await httpRequest.post('orders/checkout', data, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}
