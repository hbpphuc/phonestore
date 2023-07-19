import httpRequest from '../utils/httpRequest'

export const getAllBrand = async () => {
    try {
        const res = await httpRequest.get('brands')
        return res.data
    } catch (error) {
        return error.response.data
    }
}
