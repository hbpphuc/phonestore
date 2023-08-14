import httpRequest from '../utils/httpRequest'

export const getAllProduct = async ({ sort, color, brand, page, limit }) => {
    try {
        const res = await httpRequest.get('products', {
            params: { sort, color, brand, page, limit },
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

export const createProduct = async (data) => {
    try {
        const res = await httpRequest.post('products', data, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const updateProduct = async (id, data) => {
    try {
        const res = await httpRequest.put(`products/${id}`, data, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const deleteProduct = async (id) => {
    try {
        const res = await httpRequest.delete(`products/${id}`, { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const searchProduct = async (name) => {
    try {
        const res = await httpRequest.get(`products/search`, { params: { name } })
        return res.data
    } catch (error) {
        console.log(error)
    }
}
