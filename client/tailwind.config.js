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
            },
            colors: {
                main: '#505050',
                primary: '#0eb1f2',
                secondary: '#8b8b8b',
            },
        },
    },
    plugins: [],
}
