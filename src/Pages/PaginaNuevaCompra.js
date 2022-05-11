import { equality, find, getPropertysValue, isEmpty } from 'functionallibrary';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cleaningNewPurchase, setBuyDate, setEstablishmentInBuy, setNameInBuy, totalBuy } from '../actions/newPurchaseAction';

import { BigAddButton } from '../components/Buttons/BigAddButton';
import { DataList } from '../components/Form/DataList';
import { InputField } from '../components/Form/InputField';
import { InsumoToBuy } from '../components/Insumos/InsumoToBuy';

import { misInsumosPath } from '../constant/routes';
import { DEFAULT_ESTABLISHMENT } from '../constant/defaults';

import { PaginaLoading } from './PaginaLoading';

import { getFromLocalStorage, setInLocalStorage } from '../helper/localStorage';
import { formattedByInputDate } from '../helper/dates';

import { type } from '../constant/type';


// ===== CONSTANTES =====
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
    const { insumos, establishmentName, total, name, purchaseDate } = useSelector( state => state.newPurchase );
    const establishments = useSelector( state => state.establishments );

    // ===== STATE =====
    const [selectedEstablisment, setSelectedEstablishment] = useState( DEFAULT_ESTABLISHMENT );
    const [insumosRouteModificated, setInsumosRouteModificated] = useState( activeBuyRoute );
    const [isMounting, setIsMounting] = useState( true );

    // ===== FUNCIONES PROPIAS =====
    const handleChangeOnEstablishment = useCallback( ( e ) => {

        const value = getPropertysValue( 'target.value', e ) || '';
        dispatch( setEstablishmentInBuy( value ) );

    },[])

    const handleChangeOnName = useCallback( ( e ) => {

        const value = getPropertysValue( 'value', e.target ) || '';
        dispatch( setNameInBuy( value ) );

    },[])

    const handleChangeOnDate = useCallback( ( e ) => {

        const value = getPropertysValue( 'value', e.target ) || '';
        dispatch( setBuyDate( value ) );

    },[])

    // ACTUALIZAR COMPRAS EN LOCAL STORAGE CADA VEZ QUE CAMBIEN LOS INSUMOS, FECHA Y EL ESTABLECIMIENTO
    useEffect(() => {

        if ( isEmpty( insumos ) && !isMounting ) {

            dispatch( cleaningNewPurchase() );
        } else if ( (insumos || establishmentName || purchaseDate || name) && !isMounting ) {
            
            const newPurchaseData = { insumos, establishmentName, purchaseDate, name };
            setInLocalStorage( type.localStorage.newPurchase, newPurchaseData );
        } else {
            setIsMounting( false );
        }

    },[insumos, establishmentName, purchaseDate, name])

    // OBTENER OBJETO ESTABLECIMIENTO A PARTIR DEL NOMBRE DEL ESTABLECIMIENTO
    useEffect( () => {

        if ( establishmentName ) {

            const name = establishmentName.toLowerCase();
            const selected = find( equality( 'value', name ), establishments ) || { value: name, label: name };
    
            setSelectedEstablishment( selected );
        } else if ( !establishmentName && selectedEstablisment.value ) {

            setSelectedEstablishment( DEFAULT_ESTABLISHMENT );
        }

    }, [establishmentName, establishments, selectedEstablisment.value])

    // MODIFICAR URL EN FUNCION DEL ESTABLECIMIENTO SELECCIONADO
    useEffect( () => {

        let newRoute = activeBuyRoute;

        if ( establishmentName ) {
            newRoute += `&establishment=${ establishmentName }`;
        }

        setInsumosRouteModificated( newRoute );

    },[establishmentName])

    // ESTABLECER OBJETO ESTABLECIMIENTO POR DEFECTO CUANDO USUARIO BORRA DATOS DEL CAMPO
    useEffect(() => {

        if ( isEmpty( selectedEstablisment ) ) {

            setSelectedEstablishment( DEFAULT_ESTABLISHMENT );
        }
    },[selectedEstablisment])

    // ACTUALIZAR TOTAL DE LA COMPRA
    useEffect(() => {

        dispatch( totalBuy() );

    },[establishmentName, insumos, dispatch])

    // ACTUALIZAR FECHA DE LA COMPRA
    useEffect(() => {

        if ( !purchaseDate ) {

            const todayDate = formattedByInputDate( purchaseDate );
            handleChangeOnDate({ target: { value: todayDate } });
        }

    },[purchaseDate, handleChangeOnDate])

    if ( loading ) {
        return <PaginaLoading />
    }

    return (
        <div
            className="
                grid gap-3
                self-start
                w-full
                px-2 pb-2
                relative
            "
        >
            <form
                className="
                    bg-white
                    w-full
                    pb-3
                    flex flex-col items-center justify-center
                    sticky -top-32 z-10
                "
                onSubmit={ (e) => e.preventDefault() }
            >
                <fieldset
                    className="
                        w-full
                        mb-3
                    "
                >
                    <InputField
                        type="date"
                        placeholder="dd/mm/aaaa"
                        value={ purchaseDate }
                        onChange={ handleChangeOnDate }
                    />
                </fieldset>
                <fieldset
                    className="
                        w-full
                        mb-3
                    "
                >
                    <InputField
                        placeholder="nombre de su compra"
                        onChange={ handleChangeOnName }
                        value={ name }
                    />
                </fieldset>
                <fieldset
                    className="
                        sticky top-16 left-0 z-10
                        flex items-center justify-between
                        w-full
                    "
                >
                    <DataList
                        autoFocus
                        placeholder="comprar en..."
                        onChange={ handleChangeOnEstablishment }
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
