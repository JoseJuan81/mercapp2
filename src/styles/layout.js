const layoutStyles = ({ addComponents, theme }) => {


	const layout = {
		'.layout__container': {
            height: '100vh',
            paddingTop: theme( 'spacing.16' ),
			margin: '0 auto',
			maxWidth: '1280px',
			width: '100%',
		},
		'.layout__page': {
			height: '100%',
			paddingBottom: theme( 'spacing.16' ),
			overflow: 'auto'
		}
	}

	addComponents( layout );
}

module.exports = layoutStyles;