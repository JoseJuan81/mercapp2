const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const buttonStyles = require('./src/styles/buttonStyles');
const inputStyles = require('./src/styles/formControl/inputStyles');
const layoutStyles = require('./src/styles/layout');
const menuMobileStyles = require('./src/styles/menuMobileStyles');

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
				mercapp: 'Nunito'
			},
			maxHeight: theme => ({
				...theme('height')
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
