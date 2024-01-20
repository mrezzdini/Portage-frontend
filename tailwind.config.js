module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    lightest: '#d4e9ff',
                    lighter: '#a4d0fc',
                    light: '#2E3249',
                    DEFAULT: '#D8D83D',
                    dark: 'rgba(46, 50, 73, 0.7)',
                    darker: '#014282',
                },
                secondary: {
                    lighter: '#fae0ca',
                    light: '#f39e58',
                    DEFAULT: '#8a8a06',
                    dark: '#bf5d0d',
                    darker: '#632d01',
                },
                gray: {
                    750: '#8a8a06',
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('tailwind-scrollbar')({ nocompatible: true }),
    ],
};
