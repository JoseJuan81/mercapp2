import React from 'react';

import { misInsumosPath, nuevaCompraPath, resumenDeComprasPath } from '../../constant/routes';

import { ListButton, ShoppingCarPlusButton, StoreButton } from '../Buttons/AppButtons';

export const InicioAppMenuMobile = () => {
  return (
    <div
        className="
            menu_mobile__container
            grid-cols-3
        "
    >
        <ListButton
            to={ misInsumosPath }
        />
        <StoreButton
            to={ resumenDeComprasPath }
        />
        <ShoppingCarPlusButton
            to={ nuevaCompraPath }
        />
    </div>
  )
}
