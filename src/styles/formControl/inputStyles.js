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
            borderRadius: '0',
			paddingLeft: '0',

			'&:focus': {
                'outline': 'none',
                borderBottom: '1px solid' + theme('colors.lime.300'),
                transition: '1'
			}
		},
	}

	addComponents( input );
}

module.exports = inputStyles;