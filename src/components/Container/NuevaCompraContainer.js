import React from 'react';
import { useLocation } from 'react-router-dom';

import { PaginaCompraOptimizada } from '../../Pages/PaginaCompraOptimizada';
import { PaginaNuevaCompra } from '../../Pages/PaginaNuevaCompra';

import { NuevaCompraMenuMobile } from '../Menus/NuevaCompraMenuMobile';

import { mejorCompraPath } from '../../constant/routes';

export const NuevaCompraContainer = () => {

    // ===== NAVEGACION =====
    const location = useLocation();
    
    // ===== LOCAL VARIABLES =====
    const isOptimized = location.pathname === mejorCompraPath;

    return (
        <div
            className="layout__page"
        >
            {isOptimized
                ? <PaginaCompraOptimizada />
                : <PaginaNuevaCompra />
            }

            <NuevaCompraMenuMobile />

        </div>
    )
}
