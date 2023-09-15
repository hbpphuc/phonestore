import httpRequest from 'utils/httpRequest'

export const getStats = async () => {
    try {
        const res = await httpRequest.get('dashboard/stats', { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getOrderStats = async () => {
    try {
        const res = await httpRequest.get('dashboard/orderStats', { withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getMonthlyPlan = async ({ year }) => {
    try {
        const res = await httpRequest.get('dashboard/monthlyPlan', { params: { year }, withCredentials: true })
        return res.data
    } catch (error) {
        return error.response.data
    }
}
