import { isEmpty } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { calculateTotal } from '../helper/calculateTotal';
import { capitalizeText } from '../helper/capitalize';
import { clasifyingInsumosByEstablishment } from '../helper/clasifyingInsumosByEstablishment';

export const PaginaCompraOptimizada = () => {

    // ===== STORE =====
    const { insumos } = useSelector( store => store.newPurchase );

    // ===== STATE =====
    const [insumosByEstablishment, setInsumosByEstablishment] = useState([]);

    useEffect(() => {
        
        const insumosClasified = clasifyingInsumosByEstablishment( insumos );
        setInsumosByEstablishment( insumosClasified )

    }, [insumos]);

    return (
        <>
            {isEmpty( insumos )
                ? <NoInsumosSelected />
                : <InsumosByEstablishment insumos={ insumosByEstablishment } />
            }
        </>
    )
}

const InsumosByEstablishment = ({ insumos }) => {

    return (
        <div
            className="
                px-2
            "
        >
            {
                insumos.map(( { name, insumos }, index ) => (
                    <EstablishmentContainer
                        key={ `${ name } - ${ index }` }
                        name={ name }
                        insumos={ insumos }
                    />
                ))
            }
        </div>
    )
}

const EstablishmentContainer = ({ name, insumos }) => {

    // ===== STATE =====
    const [open, setOpen] = useState( false );

    // ===== VARIABLES LOCALES =====
    const qty = insumos.length;
    const total = calculateTotal( insumos, name );

    const establishmentName = capitalizeText( name );

    return (
        <div
            className="
                px-2 mb-2 pt-2
                border border-solid border-warmGray-300
                rounded
            "
            onClick={ () => setOpen( o => !o ) }
        >
            
            <InsumoContainerHeader
                quantity={ qty }
                total={ total }
                establishmentName={ establishmentName }
            />

            <InsumosList
                name={ name }
                insumos={ insumos }
                open={ open }
            />

        </div>
    )
}

const InsumoContainerHeader = ({ quantity, total, establishmentName}) => {
    return (
        <>
            <div
                className="
                    flex items-center justify-between
                    text-xl font-bold
                "
            >
                <h1
                    className="
                        text-warmGray-600 
                    "
                >{ establishmentName }</h1>
                <h3
                    className="
                        text-warmGray-800
                    "
                >{ total }</h3>
            </div>
            <span
                className="
                    text-warmGray-500
                "
            >Cantidad de insumos: { quantity }
            </span>
        </>
    )
}

const InsumosList = ({ insumos, open, name }) => {
    return (
        <ul
            className={`
                ${ open ? 'max-h-96' : 'max-h-0' }
                duration-200
                overflow-auto
                mt-2
            `}
        >
            {insumos.map(( insumo, i ) => (
                <li
                    key={`${insumos.name}-${i}`}
                    className={`
                        ${ i === 0 ? 'border-none' : 'border-t' }
                        border-solid border-warmGray-300
                        flex items-center justify-between
                        ${ i % 2 === 0 ? 'bg-white' : 'bg-warmGray-50' }
                    `}
                >
                    <h4
                        key={ insumo + i }
                    >{ insumo.name }
                    </h4>
                    <h5>
                        { insumo.price[name] }
                    </h5>
                </li>
            ))}
        </ul>
    )
}

const NoInsumosSelected = () => {
    return (
        <>
            <h1>No ha seleccionado insumos</h1>
            <p>Seleccione varios insumos y aqui vera donde tienen el mejor precio de compra</p>
        </>
    )
}
