const colors = require('tailwindcss/colors')

module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				lime: colors.lime,
				rose: colors.rose,
				sky: colors.sky,
				warmGray: colors.warmGray
			},
			fontFamily: {
				poppins: 'Poppins'
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
