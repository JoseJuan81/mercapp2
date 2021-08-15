const buttonStyles = ({ addComponents, theme }) => {


	const btn = {
		'.btn': {
			borderRadius: theme( 'spacing.1' ),
			height: theme( 'spacing.16' ),
			width: '100%',
		},

		'.btn-icon': {
			fontSize: theme( 'fontSize.2xl' ),
		},
	}

	addComponents( btn );
}

module.exports = buttonStyles;