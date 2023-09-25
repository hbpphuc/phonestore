/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            width: {
                main: '1280px',
            },
            backgroundColor: {
                main: '#0eb1f2',
                adminMain: '#343a40',
                adminPrimary: '#454d55',
            },
            backgroundImage: {
                404: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
            },
            colors: {
                main: '#0eb1f2',
                primary: '#505050',
                secondary: '#151515',
            },
            borderColor: {
                main: '#0eb1f2',
                primary: '#101010',
                admin: '#4b545c',
            },
            keyframes: {
                'like-effect': {
                    '0%': {
                        '-webkit-transform': 'rotate(-10deg)',
                        transform: 'rotate(-30deg)',
                    },
                    '100%': {
                        '-webkit-transform': 'rotate(0)',
                        transform: 'rotate(0)',
                    },
                },
                'fade-in-effect': {
                    '0%': {
                        opacity: 0,
                        left: '-100px',
                    },
                    '100%': {
                        opacity: '100%',
                        left: '0',
                    },
                },
            },
            animation: {
                'like-effect': 'like-effect 1s',
                'fade-in-effect': 'fade-in-effect 1s',
            },
        },
    },
    plugins: [],
}
