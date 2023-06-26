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
                main: '#0eb1f2',
                primary: '#505050',
                secondary: '#151515',
            },
            borderColor: {
                main: '#0eb1f2',
                primary: '#101010',
            },
        },
    },
    plugins: [],
}
