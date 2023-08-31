import httpRequest from '../utils/httpRequest'

export const getAllBrand = async () => {
    try {
        const res = await httpRequest.get('brands')
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getBrand = async ({ id }) => {
    console.log(id)
    try {
        const res = await httpRequest.get(`brands/${id}`)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
