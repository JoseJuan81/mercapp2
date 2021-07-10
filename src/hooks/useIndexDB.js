import { useEffect, useRef, useState } from 'react';
import Idb from './../indexDB';

const idb = new Idb('insumos');

export const useIndexDB = () => {

    const isMounted = useRef(true);
    const [insumosState, setState] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dbLoaded, setDbLoaded] = useState( idb.db );

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
    const setNewInsumo = async (newInsumo) => {
        return await idb.post( newInsumo );
    }

    const deleteInsumo = async (insumoId) => {
        return await idb.delete( insumoId );
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
        deleteInsumo,
        insumos: insumosState,
        loading,
        setNewInsumo,
    };
}
