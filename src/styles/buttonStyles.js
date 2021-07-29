const buttonStyles = ({ addComponents, theme }) => {


	const btn = {
		'.btn-icon': {
			fontSize: theme( 'fontSize.2xl' ),
		},
	}

	addComponents( btn );
}

module.exports = buttonStyles;