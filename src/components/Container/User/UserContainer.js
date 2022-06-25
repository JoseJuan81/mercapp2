import React from 'react';

import { PaginaUsuario } from '../../../Pages/User/PaginaUsuario';
import { UserMenuMobile } from '../../Menus/UserMenuMobile';

export const UserContainer = () => {

	return (
		<div>
			<PaginaUsuario />
			<UserMenuMobile />
		</div>
	)
}
