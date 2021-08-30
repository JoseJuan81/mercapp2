const layoutStyles = ({ addComponents, theme }) => {


	const layout = {
		'.layout__container': {
			height: 'calc(100vh - 64px)',
			width: '100%',
		},
		'.layout__page': {
			height: '100%',
			paddingBottom: theme( 'spacing.16' ),
			paddingTop: theme( 'spacing.4' ),
			overflow: 'auto'
		}
	}

	addComponents( layout );
}

module.exports = layoutStyles;