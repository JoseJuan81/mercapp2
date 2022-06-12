import { isEmpty } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createPurchaseFromPurchasesList } from '../../actions/purchaseListAction';

import { ShareButton, ShoppingCarPlusButton } from '../../components/Buttons/AppButtons';

import { nuevaCompraPath } from '../../constant/routes';
import { type } from '../../constant/type';

import { calculateSimpleTotal, calculateTotal } from '../../helper/calculateTotal';
import { capitalizeText } from '../../helper/capitalize';
import { clasifyingInsumosByEstablishment } from '../../helper/clasifyingInsumosByEstablishment';
import { getFromLocalStorage, setInLocalStorage } from '../../helper/localStorage';

export const PaginaCompraOptimizada = ({ insumos }) => {

    // ===== STATE =====
    const [insumosByEstablishment, setInsumosByEstablishment] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isMount, setIsMount] = useState(true);

    // Verificar si existen listas en el localStorage para agregarlas a la pantalla
    useEffect(() => {

        const localPurchasesList = getFromLocalStorage( type.localStorage.purchasesList );
        if ( isMount && localPurchasesList ) {
            setInsumosByEstablishment( localPurchasesList );
            setTotalAmount( calculateSimpleTotal( localPurchasesList, 'total' ) );
        }

        setIsMount( false );

    }, [])

    // Clasificar insumos por establecimiento de acuerdo al precio
    useEffect(() => {

        if ( !isMount && !isEmpty( insumos ) ) {
            const classified = clasifyingInsumosByEstablishment( insumos );
            console.log('entro')
            setInsumosByEstablishment( classified );
            setTotalAmount( calculateSimpleTotal( classified, 'total' ) );
    
            setInLocalStorage( type.localStorage.purchasesList, classified );
        }

    }, [insumos, isMount]);

    return (
        <>
            {isEmpty( insumosByEstablishment )
                ? <NoInsumosSelected />
                : <InsumosByEstablishment
                    total={ totalAmount }
                    insumos={ insumosByEstablishment }
                />
            }
        </>
    )
}

const InsumosByEstablishment = ({ insumos, total }) => {

    return (
        <div className="px-2">
            <h1
                className="
                    text-right font-bold text-2xl
                    mb-2
                "
            >{ total }</h1>
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
                insumos={ insumos }
            />

            <InsumosList
                name={ name }
                insumos={ insumos }
                open={ open }
            />

        </div>
    )
}

const InsumoContainerHeader = ({ quantity, total, establishmentName, insumos}) => {

    // ===== STORE =====
    const dispatch = useDispatch();

    // ===== NAVEGACIÓN =====
    const history = useHistory();

    // ===== FUNCIONES LOCALES =====
    const handlerClickToConvertIntoPurchase = ( ev ) => {
        ev.stopPropagation();

        const newPurchaseData = { insumos, establishmentName }
        dispatch( createPurchaseFromPurchasesList( newPurchaseData ) );

        history.push( nuevaCompraPath )
    }

    return (
        <>
            <div
                className="
                    flex items-center justify-between
                    text-xl font-bold
                "
            >
                <h1 className="text-warmGray-600">{ establishmentName }</h1>
                <h3 className="text-warmGray-800">{ total }</h3>
            </div>

            <span className="text-warmGray-500">Cantidad de insumos: { quantity }</span>

            <div
                className="
                    flex items-center justify-center
                    my-4
                "
            >
                <ShoppingCarPlusButton
                    isButton
                    className="
                        flex-auto
                        bg-warmGray-100
                        text-lg
                    "
                    onClick={ handlerClickToConvertIntoPurchase }
                />

                <ShareButton
                    isButton
                    className="
                        flex-auto
                        bg-warmGray-50
                        text-lg
                    "
                />
            </div>
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
