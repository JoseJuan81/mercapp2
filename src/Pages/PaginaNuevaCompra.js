import { equality, find, getPropertysValue, isEmpty } from 'functionallibrary';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadSelectedInsumos, setEstablishmentInBuy } from '../actions/newPurchaseAction';
import { loadEstablishments } from '../actions/establishmentAction';

import { BigAddButton } from '../components/Buttons/BigAddButton';
import { InsumoToBuy } from '../components/Insumos/Insumo';
import { DataList } from '../components/Form/DataList';

import { misInsumosPath } from '../constant/routes';
import { DEFAULT_ESTABLISHMENT } from '../constant/defaults';

import { PaginaLoading } from './PaginaLoading';


// ===== VARIABLES CONSTANTES =====
const activeBuyRoute = `${ misInsumosPath }?activeBuy=true`;

// ===== COMPONENTES REACT PARA ESTA PAGINA =====
const TotalBuy = React.memo(({ total }) => {
    return (
        <h1
            className="
                text-2xl font-bold
                mr-3 ml-6
            "
        >
            <span
                className="
                    text-xs font-light
                    mx-1
                "
            >PEN</span>
            { total }
        </h1>
    )
})

// ===== COMPONENTE PRINCIPAL =====
export const PaginaNuevaCompra = () => {

    // ===== STORE =====
    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.loading );
    const { insumos, establishmentName, total } = useSelector( state => state.newPurchase );
    const establishments = useSelector( state => state.establishments );

    // ===== STATE =====
    const [selectedEstablisment, setSelectedEstablishment] = useState( DEFAULT_ESTABLISHMENT );
    const [insumosRouteModificated, setInsumosRouteModificated] = useState( activeBuyRoute );
    
    // ===== FUNCIONES PROPIAS =====
    const handleChange = useCallback( ( e ) => {

        const value = getPropertysValue( 'value', e.target ) || '';
        dispatch( setEstablishmentInBuy( value ) );

    },[])

    // cargar establecimientos e insumos seleccionados
    useEffect( () => {

        dispatch( loadEstablishments() );
        dispatch( loadSelectedInsumos() );

    }, [dispatch]);

    // obtener el objeto establecimiento a partir del nombre del establecimiento
    useEffect( () => {

        if ( establishmentName ) {

            const name = establishmentName.toLowerCase();
            const selected = find( equality( 'value', name ), establishments ) || { value: name, label: name };
    
            setSelectedEstablishment( selected );
        } else if ( !establishmentName && selectedEstablisment.value ) {

            setSelectedEstablishment( DEFAULT_ESTABLISHMENT );
        }

    }, [establishmentName, establishments, selectedEstablisment.value])

    // modificar la url en funcion del establecimiento seleccionado
    useEffect( () => {

        let newRoute = activeBuyRoute;

        if ( establishmentName ) {
            newRoute += `&establishment=${ establishmentName }`;
        }

        setInsumosRouteModificated( newRoute );

    },[establishmentName])

    // etablecer el objeto establecimiento por defecto cuando el usuario borra datos del campo
    useEffect(() => {

        if ( isEmpty( selectedEstablisment ) ) {

            setSelectedEstablishment( DEFAULT_ESTABLISHMENT );

        }

    },[selectedEstablisment])

    if ( loading ) {
        return <PaginaLoading />
    }

    return (
        <div
            className="
                grid gap-3
                self-start
                w-full
                px-2 pb-2 pt-20
            "
        >
            <form
                className="
                    fixed top-16 left-0 z-10
                    bg-white
                    w-full
                    px-2 pb-3 pt-5
                    flex items-center
                "
                onSubmit={ (e) => e.preventDefault() }
            >
                <fieldset
                    className="
                        flex items-center justify-between
                        w-full
                    "
                >
                    <DataList
                        autoFocus
                        placeholder="seleccione..."
                        onChange={ handleChange }
                        options={ establishments }
                        value={ selectedEstablisment }
                    />

                    <TotalBuy total={ total }/>
                </fieldset>
            </form>

            {insumos.map(( insumo, ind ) => (
                <InsumoToBuy
                    key={ `${ insumo.id } - ${ ind }` }
                    insumo={ insumo }
                    establishment={ establishmentName }
                />
            ))}

            <BigAddButton
                to={ insumosRouteModificated }
                title="Agregrar insumos"
            />

        </div>
    )
}
