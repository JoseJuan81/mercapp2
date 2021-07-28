import React, { useContext } from 'react';

import { PageTitle } from '../components/Genericos/PageTitle';
import { Insumo } from '../components/Insumos/Insumo';
import { InsumoContext } from '../context/Insumo/InsumoContext';

export const PaginaInsumosAComprar = () => {

    const { selectedInsumos } = useContext( InsumoContext );
    return (
        <div>
            <div className="px-2 pb-20 mt-4 relative">
            
            <PageTitle title="Lista de compras" />

            <ul className="">
            {
                selectedInsumos.map((i, index) => (

                    <li
                        className="mb-3"
                        key={ `${i.title}-${index}-${Math.random}`}
                    >
                        <Insumo
                            insumo={ i }
                        />
                    </li>

                ))
            }
        </ul>
            
            
        </div>
            <h1>Estos son los insumos a comprar</h1>
            <ul>
                <li>Crear base de datos: lista de compras</li>
                <li>Crear objeto lista de compras</li>
                <li>Al modificar un isumo solo afecta al insumo del objeto "lista de compras"</li>
                <li>Se puede modificar: cantidad y precios</li>
                <li>Agregar estado para indicar si fue comprado o no</li>
                <li>Cuando se compra alguno se habilita el boton de Compra parcial para generar una factura: los productos comprados no se muestran mas</li>
                <li>Cuando se compras todos se habilita el boton de Compra para generar factura</li>
            </ul>
        </div>
    )
}
