import httpRequest from '../utils/httpRequest'

export const getAllProduct = async (sort) => {
    try {
        const res = await httpRequest.get('products', {
            params: { sort },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async ({ id }) => {
    try {
        const res = await httpRequest.get(`products/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getProductBySlug = async ({ slug }) => {
    try {
        const res = await httpRequest.get(`products/${slug}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
