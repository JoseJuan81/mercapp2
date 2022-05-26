import React from 'react';

import { BigButton } from '../components/Buttons/BigButton';

import { MENU_ROUTES } from '../constant/defaults';

export const PaginaInicioApp = () => {
  return (
	<div
		className="
			h-screen
			flex items-center justify-center
		"
	>
		<ul
			className="
				grid grid-cols-2 gap-6
				px-4
			"
		>
			{MENU_ROUTES.map((route, indRoute) => (
				<li
					className="
						
					"
					key={ 'ruta-' + indRoute + 1 }
				>
					<BigButton
						to={ route.to }
						title={ route.name }
						icon={ route.icon }
					/>
				</li>
			))}
		</ul>
	</div>
  )
}
