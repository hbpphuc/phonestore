import axios from 'axios'

const httpRequest = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL })

export const get = async (path, option = {}) => {
    const response = await httpRequest.get(path, option)
    return response.data
}

export const post = async (path, data = {}, config) => {
    const response = await httpRequest.post(path, data, config)
    return response.data
}

export const put = async (path, data = {}, config) => {
    const response = await httpRequest.put(path, data, config)
    return response.data
}

export const destroy = async (path, data = {}) => {
    const response = await httpRequest.delete(path, data)
    return response.data
}

export default httpRequest
