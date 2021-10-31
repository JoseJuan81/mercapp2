import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeItemFromArrayByIndex } from 'functionallibrary';

import { InputField } from './InputField';
import { LabelsField } from './LabelsField';
import { InsumoPrice } from './InsumoPrice';

import { fillingForm } from '../../actions/newInsumoAction';

import { priceFromObjectToArray } from '../../helper/priceHandling';
import { DEFAULT_OBJECT_PRICE } from '../../constant/defaults';

export const InsumoForm = ({ insumoData, isEditing, establishments }) => {

    const { name, labels, price } = insumoData;

    // ===== STORE =====
    const dispatch = useDispatch();

    // transformar el objeto Price a arreglo
    const localPrice = priceFromObjectToArray( price );

    // ===== STATE =====
    const [prices, setPrices] = useState( localPrice );

    // ===== FUNCIONES PROPIAS =====
    const handleOnChangeForm = ({ target }) => {

        dispatch( fillingForm( target ) );
    }

    const handleOnChangePrice = ( target, index) => {

        const localPrices = [...prices];
        localPrices.splice( index, 1, target.value );

        handleOnChangeForm({
            target: {
                name: 'price',
                value: localPrices
            }
        })
        setPrices( [...localPrices] );

    }

    const addNewPrice = () => {

        const newPriceState = [...prices, DEFAULT_OBJECT_PRICE];
        setPrices( newPriceState );
    }

    const removePrice = ( index ) => {

        setPrices( prs => [...removeItemFromArrayByIndex(index, [...prs])] );
    }

    // HACER FOCO EN CAMPO DE NOMBRE
    useEffect( () => {

        document.querySelector('input').focus();
        
    },[])

    // VERIFICAR SI EN LA URL EXISTE EL NOMBRE DEL ESTABLECIMIENTO
    useEffect( () => {

        const url = new URL(window.location);
        const establishment = url.searchParams.get('establishment');

        if( establishment ) {
            setPrices( p => ([{ ...DEFAULT_OBJECT_PRICE, name: establishment }]) );
        }
        
    },[])

    return (
        <form
            className="
                mx-2 px-3 pb-16
                bg-white
                rounded-t-2xl
                w-full max-h-full
                overflow-auto
            "
        >
            <h1
                className="
                    font-light text-3xl
                    pl-2 py-6
                    sticky top-0 z-30
                    bg-white
                "
            >
                { isEditing ? 'Actualizar Insumo' : 'Nuevo Insumo' }
            </h1>

            <fieldset className="mb-4">
                <label>
                    <small
                        className="
                            text-warmGray-500
                            ml-2
                        "
                    >Nombre insumo</small>
                    <InputField
                        autoComplete="off"
                        type="text"
                        placeholder="nombre"
                        name="name"
                        value={ name }
                        onChange={ handleOnChangeForm }
                    />
                </label>
            </fieldset>

            <fieldset>
                <label>
                    <small
                        className="
                            text-warmGray-500
                            ml-2
                        "
                        
                    >
                        Precio
                    </small>
                    {
                        prices.map( (p, ind) => (
                            <fieldset
                                key={ `${p}-${ind}` }
                                className="
                                    animate__animated animate__faster animate__slideInLeft
                                    mb-4
                                "
                            >
                                <InsumoPrice
                                    index={ ind }
                                    establishments={ establishments }
                                    price={ p.value }
                                    name={ p.name }
                                    onChange={ ({ target }) => handleOnChangePrice( target, ind ) }
                                    addNewPrice={ addNewPrice }
                                    removePrice={ () => removePrice( ind ) }
                                    showAddPrice={ prices.length - 1 === ind }
                                />
                            </fieldset>
                        ))
                    }
                    </label>
            </fieldset>

            <fieldset className="">
                <label>
                    <small
                        className="
                            text-warmGray-500
                            ml-2
                        "
                    >Etiquetas</small>
                    <LabelsField
                        labels={ labels }
                        name="labels"
                        addLabels={ handleOnChangeForm }
                    />
                </label>
            </fieldset>

            <fieldset>
                {/* <NuevoInsumoMenuMobile /> */}
            </fieldset>

        </form>
    )
}
