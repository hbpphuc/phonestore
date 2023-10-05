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
import { useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2'
import Select from 'react-select'
import { Icon } from '../../components'
import * as apis from '../../apis'
import { month, optionsChart } from '../../utils/constant'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

const Dashboard = () => {
    const { deviceWidth } = useSelector((state) => state.app)

    const [stats, setStats] = useState(null)
    const [oStats, setOStats] = useState(null)
    const [monPlan, setMonPlan] = useState(null)

    const totalSaleCount = oStats?.reduce((acc, cur) => acc + cur.totalSale, 0)
    const totalSalePrice = oStats?.reduce((acc, cur) => acc + cur._id.totalPrice, 0)

    const curYear = new Date().getFullYear()

    const [year, setYear] = useState({ label: curYear, value: curYear })

    useEffect(() => {
        const fetchApi = async () => {
            await Promise.all([apis.getStats(), apis.getOrderStats(), apis.getMonthlyPlan({ year: year.value })]).then(
                ([stats, oStats, mPlan]) => {
                    setStats(stats.data)
                    setOStats(oStats.data.stats)
                    setMonPlan(mPlan.data.plan)
                }
            )
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
        <div className="w-full h-full mt-[60px]">
            <div className="w-full flex justify-between items-center px-[10px]">
                <h1 className="h-[48px] lg:h-[75px] flex justify-between items-center text-lg md:text-2xl lg:text-3xl font-semibold uppercase">
                    Dashboard
                </h1>
            </div>
            <div className="w-full h-full flex flex-col justify-start items-center text-white px-[10px]">
                <div className="w-full flex flex-col flex-wrap md:flex-row justify-start lg:justify-between lg:items-center gap-[15px]">
                    <div className="w-full flex-1 flex bg-adminMain rounded shadow-[0_0_1px_rgba(0,0,0,.125)-0_1px_3px_rgba(0,0,0,.2)] p-2">
                        <span className="w-[70px] h-16 flex justify-center items-center bg-[#17a2b8] rounded">
                            <Icon.GrProductHunt size={30} />
                        </span>
                        <div className="px-[10px] flex flex-col justify-center md:justify-start leading-[1.8]">
                            <span>Products</span>
                            <span className="font-bold">{stats?.pStats[0].numProduct}</span>
                        </div>
                    </div>
                    <div className="w-full flex-1 flex bg-adminMain rounded shadow-[0_0_1px_rgba(0,0,0,.125)-0_1px_3px_rgba(0,0,0,.2)] p-2">
                        <span className="w-[70px] h-16 flex justify-center items-center bg-[#28a745] rounded">
                            <Icon.FaUsers size={30} />
                        </span>
                        <div className="px-[10px] flex flex-col justify-center md:justify-start leading-[1.8]">
                            <span>Members</span>
                            <span className="font-bold">{stats?.uStats[0].numUser}</span>
                        </div>
                    </div>
                    <div className="w-full flex-1 flex bg-adminMain rounded shadow-[0_0_1px_rgba(0,0,0,.125)-0_1px_3px_rgba(0,0,0,.2)] p-2">
                        <span className="w-[70px] h-16 flex justify-center items-center bg-[#dc3545] rounded">
                            <Icon.ImCart size={30} />
                        </span>
                        <div className="px-[10px] flex flex-col justify-center md:justify-start leading-[1.8]">
                            <span>Sales</span>
                            <span className="font-bold">{totalSaleCount}</span>
                        </div>
                    </div>
                    <div className="w-full flex-1 flex bg-adminMain rounded shadow-[0_0_1px_rgba(0,0,0,.125)-0_1px_3px_rgba(0,0,0,.2)] p-2">
                        <span className="w-[70px] h-16 flex justify-center items-center bg-[#ffc107] rounded">
                            <Icon.RiHandCoinFill size={30} color="black" />
                        </span>
                        <div className="px-[10px] flex flex-col justify-center md:justify-start leading-[1.8]">
                            <span>Total Revenue</span>
                            <span className="font-bold">${totalSalePrice}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full h-max mt-[15px] flex justify-center bg-adminMain rounded overflow-hidden relative">
                    <div className="w-[90vw] h-[240px] sm:h-[280px] md:h-[360px] lg:h-[480px] bg-adminMain rounded overflow-hidden relative">
                        <Line options={optionsChart} data={data} />
                    </div>
                    <div className="absolute right-5 top-2">
                        <Select
                            value={year}
                            onChange={setYear}
                            options={yearOpt}
                            placeholder="Year"
                            isSearchable={false}
                            components={{
                                IndicatorSeparator: () => null,
                                IndicatorsContainer: () => null,
                            }}
                            className="w-[80px] md:w-[120px] font-semibold text-sm text-primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
