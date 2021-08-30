import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InputField } from '../components/Form/InputField';
import { LabelsField } from '../components/Form/LabelsField';
import { NuevoInsumoMenuMobile } from '../components/Menu/NuevoInsumoMenuMobile';
import { fillingForm } from '../actions/newInsumoAction';
import { InsumoPrice } from '../components/Form/InsumoPrice';
import { priceFromObjectToArray } from '../helper/utils';

export const PaginaNuevoInsumo = () => {

    const { name, labels, price } = useSelector( state => state.newInsumo );

    const localPrice = priceFromObjectToArray(price);

    const dispatch = useDispatch();

    const handleOnChangeForm = ({ target }) => {

        dispatch( fillingForm( target ) );

    }

    return (
        <div
            className="
                animate__animated animate__bounceInUp animate__faster
                fixed top-0 left-0 z-20
                w-full h-full
                bg-black bg-opacity-70
                flex items-end justify-center
            "
        >
            <form
                className="
                    mx-1 px-2 pt-4
                    bg-white
                    rounded-t-2xl
                    w-full
                "
            >
                <h1
                    className="
                        font-light text-3xl
                        ml-2 mb-6 mt-4
                    "
                >
                    Nuevo Insumo
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
 
                {
                    localPrice.map( (p, ind) => (

                        <label 
                            key={ `${p}-${ind}` }
                        >
                            <small
                                className="
                                    text-warmGray-500
                                    ml-2
                                "
                            >Precio</small>
                            <fieldset
                                className="
                                    animate__animated animate__faster animate__slideInLeft
                                    mb-4
                                "
                            >
                                <InsumoPrice
                                    price={ p.value }
                                    name={ p.name }
                                    onChange={ handleOnChangeForm }
                                />
                            </fieldset>
                        </label>

                    ))
                }
                

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
        </div>
    )
}
