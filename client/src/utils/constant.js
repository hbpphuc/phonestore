export const optSort = [
    {
        value: 'best',
        label: 'Best selling',
        query: 'best',
    },
    {
        value: 'low',
        label: 'Price low',
        query: 'price',
    },
    {
        value: 'high',
        label: 'Price high',
        query: '-price',
    },
]

export const optColor = [
    {
        value: 'black',
        label: 'Black',
    },
    {
        value: 'gold',
        label: 'Gold',
    },
    {
        value: 'white',
        label: 'White',
    },
    {
        value: 'blue',
        label: 'Blue',
    },
    {
        value: 'red',
        label: 'Red',
    },
    {
        value: 'purple',
        label: 'Purple',
    },
]

export const month = [
    { num: 1, char: 'Jan' },
    { num: 2, char: 'Feb' },
    { num: 3, char: 'Mar' },
    { num: 4, char: 'Apr' },
    { num: 5, char: 'May' },
    { num: 6, char: 'Jun' },
    { num: 7, char: 'Jul' },
    { num: 8, char: 'Aug' },
    { num: 9, char: 'Sep' },
    { num: 10, char: 'Oct' },
    { num: 11, char: 'Nov' },
    { num: 12, char: 'Dec' },
]

export const optionsChart = {
    aspectRatio: 16 / 9,
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Monthly Recap Report',
            color: '#fff',
            font: {
                size: 28,
                family: 'Comic Sans MS',
                weight: 'bold',
                lineHeight: 2,
            },
            align: 'start',
        },
        tooltip: {
            titleFont: {
                size: 18,
            },
            bodyFont: {
                size: 18,
            },
            callbacks: {
                // custom label khi hover
                label: (context) => `Earn: ${context}`,
            },
        },
        datalabels: {
            color: '#f00',
            labels: {
                value: {},
                title: {
                    color: '#ff0',
                },
            },
        },
    },
    layout: {
        padding: {
            left: 20,
            right: 20,
            bottom: 20,
        },
    },
    scales: {
        y: {
            ticks: {
                display: true,
                autoSkip: true,
                maxTicksLimit: 8,
            },
            grid: { color: 'gray', drawTicks: false },
            border: { dash: [2, 4] },
            min: 0,
        },
        x: {
            ticks: { color: '#a0a0a0' },
            grid: { color: 'transparent' },
        },
    },
}
