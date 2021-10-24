import { equality, find, isEmpty } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadEstablishments } from '../../actions/establishment';
import { defaultEstablishment } from '../../constant/defaults';

import { DataList } from './DataList';
import { InputField } from './InputField';

export const InsumoPrice = ({
    name,
    price,
    onChange,
    addNewPrice,
    removePrice,
    showAddPrice,
}) => {

    const dispatch = useDispatch();

    const establishments = useSelector( state => state.establishments );
    
    const [selectedEstablisment, setSelectedEstablishment] = useState( defaultEstablishment );

    const handleOnChangeInput = ({ target }) => {

        const isName = target.name === 'name';
        const isValue = target.name === 'value';

        const priceValue = { name, value: price };
        
        if ( isName ) {
            priceValue.name = target.value;
        }

        if ( isValue ) {
            priceValue.value = Number( target.value );
        }

        onChange({
            target: {
                name: 'price',
                value: priceValue
            }
        })

    }

    // cargar los establecimientos
    useEffect( () => {

        if ( isEmpty( establishments ) ) {

            dispatch( loadEstablishments() );
        }

    }, []);

    // actualizar valor de campo establecimiento cuando el usuario interactua con el campo
    useEffect( () => {

        const selected = find( equality( 'value', name.toLowerCase() ), establishments ) || { label: name, value: '' };
        setSelectedEstablishment( selected );

    }, [name]);

    // obtener el objeto establecimiento a partir del nombre del establecimiento
    // el nombre del establecimiento esta en la url o no
    useEffect( () => {
        
        const url = new URL( window.location );
        const establishmentName = url.searchParams.get('establishment');

        if ( establishmentName ) {
            const selected = find( equality( 'value', establishmentName ), establishments ) || {};
            setSelectedEstablishment( selected )
            handleOnChangeInput({
                target: {
                    name: 'name',
                    value: establishmentName
                }
            })
        }

    }, []);

    return (
        <div
            className="
                flex items-center
            "
        >
            <DataList
                placeholder="establecimiento"
                name="name"
                options={ establishments }
                onChange={ handleOnChangeInput }
                value={ selectedEstablisment }
            />

            <InputField
                autoSelectOnFocus
                autoComplete="off"
                type="number"
                placeholder="precio"
                name="value"
                specialClass="w-20 ml-4"
                value={ price }
                onChange={ handleOnChangeInput }
            />

            {showAddPrice
                ?
                    <button
                        type="button"
                        className="
                            py-2 px-3 ml-4
                            text-warmGray-800 text-2xl
                            bg-warmGray-100
                        "
                        onClick={ addNewPrice }
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                :
                    <button
                        type="button"
                        className="
                            icon-minus
                            py-2 px-3 ml-4
                            text-warmGray-800 text-2xl
                            bg-warmGray-100
                        "
                        onClick={ removePrice }
                    >
                        <i className="fas fa-minus"></i>
                    </button>
            }
        </div>
    )
}
