import httpRequest from '../axios/httpRequest'

export const getAllCoupon = async () => {
    try {
        const res = await httpRequest.get('coupons', { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}
