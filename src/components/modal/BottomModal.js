import React, { useEffect, useState } from 'react';

export const BottomModal = ({children, show}) => {

    const [opacity, setOpacity] = useState(false);
    const [top, setTop] = useState(false);

    useEffect( () => {

        if (show) {

            setTop(true);
            setTimeout( () => {
    
                setOpacity(true);
                
            }, 200);
            
        } else {
            
            setOpacity(false);
            setTimeout( () => {
    
                setTop(false);
                
            }, 100);

        }


    }, [show])

    return (
        <div
            className={`
                fixed ${top ? 'top-0' : 'top-full'} left-0 z-20
                w-full h-full
                ${opacity ? 'bg-opacity-50' : 'bg-opacity-0'} bg-black
                flex items-end justify-center
                pt-8 px-4
                duration-200
            `}
        >
            <div
                className="
                    bg-white
                    p-4
                    rounded-t-2xl
                    w-full h-auto
                "
            >
                { children }
            </div>
        </div>
    )
}
