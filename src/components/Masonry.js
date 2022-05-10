import { isEmpty } from 'functionallibrary';
import { cond } from 'ramda';
import React, { useEffect, useLayoutEffect, useState } from 'react';

import { masonryGenerator } from '../helper/masonryGenerator';

export const Masonry = ({ children, minColumnsWidth, gapCol = 20 }) => {

    // STATE
    const [screenW, setScreenW] = useState(0);
    const [masonryGrid, setMasonryGrid] = useState([])

    // FUNCIONES LOCALES
    const resizingScreen = () => {
        
        setScreenW( window.innerWidth );

    }

    // escuchar cambios en ancho de pantalla
    useLayoutEffect(() => {
  
        resizingScreen();
        window.addEventListener('resize', resizingScreen )
    
      return () => {
        window.removeEventListener('resize', resizingScreen );
      };
    }, [])

    // Ejecutar distribución de items al cambiar screenW
    useEffect(() => {
      
        if ( !isEmpty(screenW) ) {

            const masonryArray = masonryGenerator( screenW, minColumnsWidth, children );
            setMasonryGrid( masonryArray );
        }

    }, [screenW, children]);
    
    return (
        <div
            className="
                flex items-start justify-center
            "
            style={{
                maxWidth: screenW + 'px'
            }}
        >
            {masonryGrid.map((col, colIndex) => (
                <div
                    key={ 'masonry-col-' + colIndex + 1 }
                    style={{
                        width:( screenW / Math.floor( screenW / minColumnsWidth ) - gapCol ) + 'px',
                        marginLeft: colIndex !== 0 ? gapCol + 'px' : 0
                    }}
                >
                    {col.map(colItem => colItem )}
                </div>
            ))}
        </div>
    )
}
