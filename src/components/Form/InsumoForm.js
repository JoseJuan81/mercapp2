import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeItemFromArrayByIndex } from 'functionallibrary';

import { InputField } from './InputField';
import { LabelsField } from './LabelsField';
import { NuevoInsumoMenuMobile } from '../Menus/NuevoInsumoMenuMobile';
import { fillingForm } from '../../actions/newInsumoAction';
import { InsumoPrice } from './InsumoPrice';
import { defaultObjectPrice, priceFromObjectToArray } from '../../helper/priceHandling';

export const InsumoForm = ({ insumoData, isEditing }) => {

    const { name, labels, price } = insumoData;

    // transformar el objeto Price a arreglo
    const localPrice = priceFromObjectToArray( price );
    const [prices, setPrices] = useState( localPrice );

    const dispatch = useDispatch();

    // handler para cambios del formulario
    const handleOnChangeForm = ({ target }) => {

        dispatch( fillingForm( target ) );
    }

    // handler para cambios de precios
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

    // agregar un nuevo precio
    const addNewPrice = () => {

        setPrices( prs => [...prs, defaultObjectPrice] );
    }

    // eliminar un precio
    const removePrice = ( index ) => {

        setPrices( prs => [...removeItemFromArrayByIndex(index, [...prs])] );
    }

    return (
        <form
            className="
                mx-1 px-3
                bg-white
                rounded-t-2xl
                w-full max-h-5/6
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

            <fieldset className="mb-4">
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
                <NuevoInsumoMenuMobile />
            </fieldset>

        </form>
    )
}
