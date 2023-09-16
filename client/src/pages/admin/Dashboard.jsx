import React, { useState, useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import Select from 'react-select'
import { Icon } from 'components'
import * as apis from 'apis'
import { month, optionsChart } from 'utils/constant'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

const Dashboard = () => {
    const [stats, setStats] = useState(null)
    const [oStats, setOStats] = useState(null)
    const [monPlan, setMonPlan] = useState(null)

    const totalSaleCount = oStats?.reduce((acc, cur) => acc + cur.totalSale, 0)
    const totalSalePrice = oStats?.reduce((acc, cur) => acc + cur._id.totalPrice, 0)

    const curYear = new Date().getFullYear()

    const [year, setYear] = useState({ label: curYear, value: curYear })

    useEffect(() => {
        const fetchApi = async () => {
            const stats = await apis.getStats()
            const oStats = await apis.getOrderStats()
            const mPlan = await apis.getMonthlyPlan({ year: year.value })
            setStats(stats.data)
            setOStats(oStats.data.stats)
            setMonPlan(mPlan.data.plan)
        }
        fetchApi()
    }, [year])

    optionsChart.scales.y.max = totalSalePrice

    const data = {
        labels: month.map((item) => item.char),
        datasets: [
            {
                fill: true,
                label: 'Profit',
                data: month?.map((i) => monPlan?.find((item) => item.month === i.num)?.totalSale),
                borderColor: '#0eb1f2',
                backgroundColor: 'rgba(52, 152, 219, 0.5)',
            },
        ],
    }

    oStats?.forEach((item) => optionsChart.plugins.tooltip.callbacks.label(item._id.totalPrice))

    const yearOpt = [
        { label: curYear - 2, value: curYear - 2 },
        { label: curYear - 1, value: curYear - 1 },
        { label: curYear, value: curYear },
        { label: curYear + 1, value: curYear + 1 },
        { label: curYear + 2, value: curYear + 2 },
    ]

    return (
        <div className="w-full h-auto mt-[60px]">
            <div className="w-full flex justify-between items-center px-4">
                <h1 className="h-[75px] flex justify-between items-center text-3xl font-semibold uppercase">
                    Dashboard
                </h1>
            </div>
            <div className="w-full h-auto flex flex-col justify-center items-center text-white px-4">
                <div className="w-full flex justify-between items-center gap-[15px]">
                    <div className="max-w-[25%] flex-1 flex bg-adminMain rounded shadow-[0_0_1px_rgba(0,0,0,.125)-0_1px_3px_rgba(0,0,0,.2)] p-2">
                        <span className="w-[70px] h-16 flex justify-center items-center bg-[#17a2b8] rounded">
                            <Icon.GrProductHunt size={30} />
                        </span>
                        <div className="px-[10px] flex flex-col justify-between leading-[1.8]">
                            <span>Products</span>
                            <span className="font-bold">{stats?.pStats[0].numProduct}</span>
                        </div>
                    </div>
                    <div className="max-w-[25%] flex-1 flex bg-adminMain rounded shadow-[0_0_1px_rgba(0,0,0,.125)-0_1px_3px_rgba(0,0,0,.2)] p-2">
                        <span className="w-[70px] h-16 flex justify-center items-center bg-[#28a745] rounded">
                            <Icon.FaUsers size={30} />
                        </span>
                        <div className="px-[10px] flex flex-col justify-between leading-[1.8]">
                            <span>Members</span>
                            <span className="font-bold">{stats?.uStats[0].numUser}</span>
                        </div>
                    </div>
                    <div className="max-w-[25%] flex-1 flex bg-adminMain rounded shadow-[0_0_1px_rgba(0,0,0,.125)-0_1px_3px_rgba(0,0,0,.2)] p-2">
                        <span className="w-[70px] h-16 flex justify-center items-center bg-[#dc3545] rounded">
                            <Icon.ImCart size={30} />
                        </span>
                        <div className="px-[10px] flex flex-col justify-between leading-[1.8]">
                            <span>Sales</span>
                            <span className="font-bold">{totalSaleCount}</span>
                        </div>
                    </div>
                    <div className="max-w-[25%] flex-1 flex bg-adminMain rounded shadow-[0_0_1px_rgba(0,0,0,.125)-0_1px_3px_rgba(0,0,0,.2)] p-2">
                        <span className="w-[70px] h-16 flex justify-center items-center bg-[#ffc107] rounded">
                            <Icon.RiHandCoinFill size={30} color="black" />
                        </span>
                        <div className="px-[10px] flex flex-col justify-between leading-[1.8]">
                            <span>Total Revenue</span>
                            <span className="font-bold">${totalSalePrice}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[560px] flex justify-between mt-[15px] bg-adminMain rounded overflow-hidden relative">
                    <Line options={optionsChart} data={data} />
                    <div className="absolute left-1/2 top-4">
                        <Select
                            value={year}
                            onChange={setYear}
                            options={yearOpt}
                            placeholder="Year"
                            isSearchable={false}
                            className="w-[120px] font-semibold text-sm text-primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
