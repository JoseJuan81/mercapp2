const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const inputStyles = require('./src/styles/formControl/inputStyles');
const buttonStyles = require('./src/styles/buttonStyles');
const menuMobileStyles = require('./src/styles/menuMobileStyles');
const layoutStyles = require('./src/styles/layout');

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
			},
			maxHeight: theme => ({
				...theme('spacing')
			}),
			minHeight: theme => ({
				...theme('spacing')
			}),
			minWidth: theme => ({
				...theme('spacing')
			})
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		plugin( buttonStyles ),
		plugin( inputStyles ),
		plugin( layoutStyles ),
		plugin( menuMobileStyles ),
	],
}
