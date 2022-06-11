import { setNewProperty } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { extent } from 'd3';

import { selectInsumoToBuy, startIsFavorite } from '../../actions/insumosAction';

import { HeartButton, HeartSolidButton, SeeDetailsButton, ShoppingCarPlusButton } from '../Buttons/AppButtons';
import { InsumoEtiquetas } from './InsumoEtiquetas';
import { InsumoTitle } from './InsumoTitle';
import { InsumoBaseActions } from './InsumoActions';

import { detalleInsumoPath } from '../../constant/routes';

import { priceFromObjectToArray } from '../../helper/priceHandling';



export const InsumoCard = ({ insumo, deleteAction }) => {
 // ===== NAVIGATION =====
 const history = useHistory();

 // ===== STORE =====
 const dispatch = useDispatch();

 // ===== VARIABLES LOCALES =====
 const { selected, labels, id, name: title, isFavorite, image:img, price } = insumo;

 // ===== STATE =====
 const [insumoDetailsPage, setInsumoDetailsPage] = useState('');

 // FUNCIONES LOCALES
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
                w-full h-content
                relative
                rounded-lg ${selected && 'shadow-xl'}
                border border-solid ${selected ? 'border-lime-400' : 'border-warmGray-300'}
                mb-4
                duration-200
            `}
            onClick={ handleSelecting }
        >
            <div
                className={`
                    bg-warmGray-100
                    w-full h-full ${img ? 'min-h-0' : 'min-h-40'}
                `}
            >
                {img && <img src={ img } className="" />}
               
            </div>
                    
            <InsumoTitle
                title={ title }
                css={`
                    duration-200
                    text-md font-light ${selected ? 'text-lime-500' : 'text-warmGray-800'}
                    mx-2 my-3
                `}
            />

            <FavoriteBtn isFavorite={ isFavorite } handleFavorite={ handleFavorite } />

            <SeeDetailsButton
                isButton
                className={`
                    absolute -top-0 -left-0
                    rounded-full
                    w-10 h-10
                    text-base ${selected ? 'text-lime-500' : 'text-warmGray-500'}
                `}
                onClick={ handleClickOninsumoDetails }
            />
                
            <div
                className="
                    flex justify-end items-center
                    py-2
                    overflow-hidden
                    relative
                "
            >
                {id &&
                    <div
                        className='
                            absolute left-3
                            text-xl text-medium text-warmGray-700
                        '
                    >
                        <MinAndMaxPrices price={ price } />
                    </div>
                }

                <InsumoBaseActions id={ id } deleteAction={ deleteAction } />
            </div>

            {/*<ShoppingCarPlusButton
                isButton
                className={`
                    w-full
                    ${selected ? 'text-lime-500' : 'text-warmGray-700'}
                `}
            />*/}
            
            {labels && labels.length > 0 &&
                <div
                    className={`
                        rounded-br-lg rounded-bl-lg
                        ${ selected ? 'bg-lime-100' : 'bg-warmGray-100' }
                        px-1 pt-2
                        h-12
                    `}
                >
                    <InsumoEtiquetas
                        labels={ labels }
                        checked={ selected }
                        userClass="overflow-auto"
                    />
                </div>
            }

     </div>
    )
}

const FavoriteBtn = ({ isFavorite, handleFavorite }) => {

    const favoriteClass = `
        text-base
        w-10 h-10
        absolute -top-0 -right-0
    `

    if ( isFavorite ) {
        return (
            <HeartSolidButton
                isButton
                className={`${favoriteClass} text-rose-500 ` }
                onClick={ handleFavorite }
            />
        )
    }

    return (
        <HeartButton
            isButton
            className={ favoriteClass }
            onClick={ handleFavorite }
        />
    )
}

const MinAndMaxPrices = ({ price }) => {

    const pricesArray = priceFromObjectToArray( price );
    const [min, max] = extent( pricesArray, d => d.value );

    if ( min === max ) {
        return (
            <div>
                <span>{ min }</span>
            </div>
        )     
    }

    return (
        <div>
            <span>{ min }</span>
            <span>-</span>
            <span>{ max }</span>
        </div>
    )
}

