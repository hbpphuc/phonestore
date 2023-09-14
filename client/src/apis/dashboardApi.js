import httpRequest from 'utils/httpRequest'

export const getStats = async () => {
    try {
        const res = await httpRequest.get('dashboard/stats')
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getOrderStats = async () => {
    try {
        const res = await httpRequest.get('dashboard/orderStats')
        return res.data
    } catch (error) {
        return error.response.data
    }
}

// export const getProductStats = async () => {
//     try {
//         const res = await httpRequest.get('dashboard/productStat')
//         return res.data
//     } catch (error) {
//         return error.response.data
//     }
// }
