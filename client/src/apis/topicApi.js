import httpRequest from '../axios/httpRequest'

export const getAllTopic = async () => {
    try {
        const res = await httpRequest.get('topics')
        return res.data
    } catch (error) {
        return error.response.data
    }
}
