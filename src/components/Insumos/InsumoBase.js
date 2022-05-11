import { setNewProperty } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { selectInsumoToBuy, startIsFavorite } from '../../actions/insumosAction';

import { HeartButton, HeartSolidButton, SeeDetailsButton } from '../Buttons/AppButtons';
import { InsumoEtiquetas } from './InsumoEtiquetas';
import { InsumoTitle } from './InsumoTitle';
import { InsumoBaseActions, InsumoActions } from './InsumoActions';

import { detalleInsumoPath } from '../../constant/routes';


export const InsumoBase = React.memo( ({ insumo, deleteAction }) => {

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
                        css={`
                            duration-200
                            text-md font-light ${selected ? 'text-lime-500' : 'text-warmGray-800'}
                            mx-2 my-3
                        `}
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

                <InsumoBaseActions id={ id } deleteAction={ deleteAction } />

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
