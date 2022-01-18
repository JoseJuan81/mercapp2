import { isEmpty, setNewProperty } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { selectInsumoToBuy, startIsFavorite } from '../../actions/insumosAction';
import { updateInsumoPriceOnBuying } from '../../actions/newPurchaseAction';

import { HeartButton, HeartSolidButton, SeeDetailsButton } from '../Buttons/AppButtons';
import { InsumoEtiquetas } from './InsumoEtiquetas';
import { InsumoTitle } from './InsumoTitle';
import { InsumoPrice } from './InsumoPrice';
import { InsumoTotal } from './InsumoTotal';
import { InsumoQuantity } from './InsumoQuantity';
import { InsumoBaseActions, InsumoActions } from './InsumoActions';

import { detalleInsumoPath } from '../../constant/routes';
import { NotificationInfo } from '../../helper/toast';
import { type } from '../../constant/type';

export const InsumoToBuy = React.memo( ({ insumo, establishment }) => {

    // ===== STORE =====
    const dispatch = useDispatch();

    // ===== VARIABLES LOCALES =====
    const { currency, labels, id, name: title, price: priceObject, quantity, total:totalInsumo } = insumo;
    const price = priceObject[establishment.toLowerCase()] || 0;
    const total = totalInsumo || price;

    // ===== FUNCIONES LOCALES =====
    const onChangePrice = ( e ) => {
        
        if ( establishment ) {
            
            const { value } = e.target;
            dispatch( updateInsumoPriceOnBuying({ id: insumo.id, newPrice: value }) );
        } else {
            NotificationInfo( type.notificationMessages.newPurchaseNoEstablishmentError );
        }

    }

    const onBlur = () => {
        if( isEmpty( price )) {
            onChangePrice({ target: { value: 0 }})    
        }
    }

    return (
        <div
            className={`
                w-full
                duration-200
                rounded-lg
                border border-solid border-warmGray-300
            `}
        >

            <div className="flex p-2 pt-1 overflow-hidden relative">

                <div className="flex flex-auto">
                    <InsumoTitle title={ title } />
                </div>

                <InsumoActions id={ id } />

            </div>

            <div className="flex justify-between items-center pb-2 pr-4">

                <InsumoPrice
                    currency={ currency }
                    price={ price }
                    onChange={ onChangePrice }
                    onBlur={ onBlur }
                    id={ id }
                />

                <InsumoQuantity
                    price={ price }
                    id={ id }
                    quantity={ quantity }
                />

                <InsumoTotal
                    currency={ currency }
                    total={ total }
                />

            </div>

            {labels && labels.length > 0 &&
                <div
                    className={`
                        bg-warmGray-100
                        p-1
                    `}
                >
                    <InsumoEtiquetas labels={ labels } />
                </div>
            }

            {/* Precios por establecimiento */}
            {/* <InsumoPriceByEstablishment prices={ priceObject } /> */}
            
        </div>
    )
})

export const InsumoBase = React.memo( ({ insumo }) => {

    // ===== NAVIGATION =====
    const history = useHistory();

    // ===== STORE =====
    const dispatch = useDispatch();

    // ===== VARIABLES LOCALES =====
    const { selected, labels, id, name: title, isFavorite } = insumo;

    // ===== STATE =====
    const [insumoDetailsPage, setInsumoDetailsPage] = useState('');

    const handleSelecting = (ev) => {

        const selectedInsumo = setNewProperty( 'selected', !selected, insumo );
        dispatch( selectInsumoToBuy( selectedInsumo ) );
    }

    const handleFavorite = (ev) => {
        ev.stopPropagation();

        dispatch( startIsFavorite( { ...insumo, isFavorite: !isFavorite } ) );
    }

    const handleClickOninsumoDetails = ( ev ) => {
        ev.stopPropagation();
        
        history.push( insumoDetailsPage );
    }

    // construir ruta para detalle de insumo
    useEffect(() => {

        const insumoId = '?insumoId=' + id;
        const insumoData = '&data=true';
        const query = insumoId + insumoData;
        setInsumoDetailsPage( detalleInsumoPath + query );

    }, [id])

    return (
        <div
            className={`
                w-full
                relative
                duration-200
                rounded-lg ${selected && 'shadow-xl'}
                border border-solid ${selected ? 'border-lime-400' : 'border-warmGray-300'}
            `}
            onClick={ handleSelecting }
        >

            <div className="flex items-center pl-2 py-1 pr-10 overflow-hidden relative">

                <div className="flex flex-auto items-center">
                    
                    <InsumoTitle
                        title={ title }
                        checked={ selected }
                    />
                    

                </div>

                {isFavorite
                ? <HeartSolidButton
                    isButton
                    className={`
                        text-base text-rose-500
                        w-10 h-10
                        mr-2
                    `}
                    onClick={ handleFavorite }
                />
                : <HeartButton
                    isButton
                    className={`
                        text-base
                        w-10 h-10
                        mr-2
                    `}
                    onClick={ handleFavorite }
                />
        }
                

                {id &&
                    <SeeDetailsButton
                        isButton
                        className={`
                            rounded-full
                            min-w-10 w-10 h-10
                            mr-2
                            text-base ${ selected ? 'text-lime-500' : 'text-warmGray-800' }
                            ${ selected? 'bg-lime-50' : 'bg-warmGray-100' }
                        `}
                        onClick={ handleClickOninsumoDetails }
                    />
                }

                <InsumoBaseActions id={ id } />

            </div>

            {labels && labels.length > 0 &&
                <div
                    className={`
                        rounded-br-lg rounded-bl-lg
                        ${ selected ? 'bg-lime-100' : 'bg-warmGray-100' }
                        px-1
                    `}
                >
                    <InsumoEtiquetas
                        labels={ labels }
                        checked={ selected }
                    />
                </div>
            }

        </div>
    )
})
