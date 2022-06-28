import React from 'react';

import { PaginaInicioApp } from '../../../Pages/PaginaInicioApp';

import { InicioAppMenuMobile } from '../../Menus/InicioAppMenuMobile';

export const HomeContainer = () => {
  return (
    <div className="layout__page">

        <PaginaInicioApp />

        <InicioAppMenuMobile />

    </div>
  )
}
