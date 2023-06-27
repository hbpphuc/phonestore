import httpRequest from '../utils/httpRequest'

export const getAllCategory = async () => {
    try {
        const res = await httpRequest.get('categories')
        return res.data
    } catch (error) {
        console.log(error)
    }
}
