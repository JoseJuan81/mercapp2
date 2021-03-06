import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { PaginaNuevaCompra } from '../../../Pages/Purchases/PaginaNuevaCompra';
import { PaginaCompraOptimizada } from '../../../Pages/Purchases/PaginaCompraOptimizada';

import { NuevaCompraMenuMobile } from '../../Menus/NuevaCompraMenuMobile';

import { mejorCompraPath } from '../../../constant/routes';

import { loadEstablishments } from '../../../actions/establishmentAction';
import { loadPurchasesData } from '../../../actions/newPurchaseAction';

export const NuevaCompraContainer = () => {

    // ===== NAVEGACION =====
    const location = useLocation();

    // ===== STORE =====
    const dispatch = useDispatch();
    
    // ===== LOCAL VARIABLES =====
    const isOptimized = location.pathname === mejorCompraPath;

    // cargar establecimientos y compra actual si existe, sino los insumos seleccionados
    useEffect( () => {

        dispatch( loadEstablishments() );
        dispatch( loadPurchasesData() );

    }, []);

    return (
        <div className="layout__page">
            {isOptimized
                ? <PaginaCompraOptimizada />
                : <PaginaNuevaCompra />
            }

            <NuevaCompraMenuMobile />

        </div>
    )
}
