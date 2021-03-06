import { useEffect, useRef, useState } from 'react';
import Idb from '../services/indexDB/insumo';

const idb = new Idb('insumos');

export const useIdbInsumos = () => {

    const isMounted = useRef(true);
    const [insumosState, setState] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dbLoaded, setDbLoaded] = useState( idb.db );

    // Verifica cada segundo que IndexDB se establezca correctamente
    let intervalId = null;

    const checkDbLoad = () => {

        intervalId = setInterval( () => {

            if ( idb.db ) {
                setDbLoaded( true );
                clearCheckingDb();
            }

        }, 1000);

    }

    const clearCheckingDb = () => {
        clearInterval(intervalId);
    }

    /**
     * @description CRUD de Insumos
     */
    const setNewInsumoInLocalDB = async (newInsumo) => {
        return await idb.post( newInsumo );
    }

    const deleteInsumoInLocalDB = async (insumoId) => {
        return await idb.delete( insumoId );
    }

    const updateInsumoInLocalDB = async (updatedInsumo) => {
        return await idb.update( updatedInsumo );
    }


    useEffect( () => {

        return () => {
            isMounted.current = false;
        }

    }, [])


    useEffect( () => {

        if (dbLoaded) {

            setTimeout( () => {

                    
                idb.getAll()
                .then( (result) => {

                    if (isMounted.current) {
                        
                        setState(result);
                        setLoading(false);
                        
                    }
                    
                })
            }, 1000);

        } else {
            checkDbLoad();
        }

    }, [dbLoaded]);

    return {
        deleteInsumoInLocalDB,
        insumos: insumosState,
        loading,
        setNewInsumoInLocalDB,
        updateInsumoInLocalDB,
    };
}
