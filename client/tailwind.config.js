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
            },
        },
    },
    plugins: [],
}
