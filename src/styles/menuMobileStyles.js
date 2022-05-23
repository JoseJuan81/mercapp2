const menuMobileStyles = ({ addComponents, theme }) => {


	const menuMobile = {
		'.menu_mobile__container': {
            backgroundColor: 'white',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: theme( 'colors.warmGray.200' ),
            bottom: '0',
            display: 'grid',
            height: theme( 'spacing.16' ),
            left: '0',
            position: 'fixed',
            width: '100%',
		}
	}

	addComponents( menuMobile );
}

module.exports = menuMobileStyles;