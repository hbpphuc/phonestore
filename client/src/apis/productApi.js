import httpRequest from '../utils/httpRequest'

export const getAllProduct = async () => {
    try {
        const res = await httpRequest.get('products')
        return res.data
    } catch (error) {
        console.log(error)
    }
}
