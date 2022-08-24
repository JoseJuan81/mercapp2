const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const buttonStyles = require('./src/styles/buttonStyles');
const productGrid = require('./src/styles/productGrid');
const inputStyles = require('./src/styles/formControl/inputStyles');
const layoutStyles = require('./src/styles/layout');
const menuMobileStyles = require('./src/styles/menuMobileStyles');

module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				amber: colors.amber,
				lime: colors.lime,
				rose: colors.rose,
				sky: colors.sky,
				violet: colors.violet,
				warmGray: colors.warmGray
            },
			fill: {
				amber: colors.amber,
				lime: colors.lime,
				rose: colors.rose,
				sky: colors.sky,
				violet: colors.violet,
				warmGray: colors.warmGray
            },
			fontFamily: {
				mercapp: 'Nunito'
			},
			fontSize: {
				xxs: '0.65rem'
			},
			maxHeight: theme => ({
				...theme('height'),
				'78': '19.7rem',
				'infinity': '100rem'
			}),
			minHeight: theme => ({
				...theme('spacing')
			}),
			maxWidth: theme => ({
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
		plugin( productGrid ),
		plugin( inputStyles ),
		plugin( layoutStyles ),
		plugin( menuMobileStyles ),
	],
}
