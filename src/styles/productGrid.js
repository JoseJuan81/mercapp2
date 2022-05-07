const productGrid = ({ addComponents, theme }) => {


	const grid = {
		'.product__grid': {
            display: 'grid',
			gridGap: theme('spacing.3'),
			gridTemplateColumns: 'repeat(auto-fill, minmax(10rem, 1fr))',
			justifyContent: 'center',
			gridTemplateRows: 'masonry'
		}
	}

	addComponents( grid );
}

module.exports = productGrid;