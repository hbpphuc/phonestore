import httpRequest from '../utils/httpRequest'

export const getCheckoutSession = async (data) => {
    try {
        const res = await httpRequest.post('orders/checkout', data, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const createOrder = async (data) => {
    try {
        const res = await httpRequest.post('orders', data, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getUserOrders = async () => {
    try {
        const res = await httpRequest.get('orders/userOrder', { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}
