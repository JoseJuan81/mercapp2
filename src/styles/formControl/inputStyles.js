const inputStyles = ({ addComponents, theme }) => {


	const input = {
		'.input-form': {
			border: `1px solid ${theme('colors.warmGray.300')}`,
			borderRadius: theme('spacing.1'),
			height: theme('spacing.12'),
			paddingLeft: theme('spacing.4'),
			width: '100%',

			'&:focus': {
				'outline': 'none'
			}
		},
		'.input-transparent': {
			border: '0px none',
			paddingLeft: '0',

			'&:focus': {
				'outline': 'none'
			}
		}
	}

	addComponents( input );
}

module.exports = inputStyles;