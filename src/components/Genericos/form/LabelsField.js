import React, { useRef, useState } from 'react';

export const LabelsField = ({ labels = [], addLabels }) => {

    const labelsRef = useRef();

    const [inputValue, setInputValue] = useState( '' );
    const [labelsState, setLabelsState] = useState( labels );

    const handleAddLabel = (ev) => {
        ev.stopPropagation();

        if (ev.code === 'Tab' && inputValue) {
            
            setLabelsState( l => [inputValue, ...l] );
            addLabels({
                target: {
                    name: 'labels',
                    value: [inputValue, ...labelsState]
                }
            });

            labelsRef.current.focus();
            setInputValue('');
        }
        
    }

    const handleInputOnChange = ({ target }) => {

        setInputValue(
            target.value
        )
    }

    return (
        <div
            className="
                flex flex-wrap
                w-full min-h-16
                pl-2 pt-2 pb-1 mb-4
                border border-solid border-warmGray-300
                rounded
            "
        >
            
            { labelsState && labelsState.length > 0 && 
                <div className="flex flex-wrap">
                    {
                        labelsState.map( (l, ind) => (
                            <span
                                className="
                                    relative
                                    flex items-center
                                    text-warmGray-600
                                "
                            >
                                <span
                                    key={ `${l}-${ind}` }
                                    className="
                                        rounded
                                        bg-warmGray-200
                                        m-1 p-1
                                    "
                                >{ l }</span>
                                <button
                                    className="
                                        icon-cancel-circle
                                        absolute -top-1 -right-1
                                        text-rose-300
                                    "
                                ></button>
                            </span>
                        ) )
                    }
                </div>
            }

            <input
                type="text"
                className={`
                    flex-auto
                    pl-4
                    min-h-12
                    ${ labelsState && labelsState.length > 0 && 'ml-3 mt-2' }
                `}
                ref={ labelsRef }
                autoComplete="off"
                placeholder="Etiquetas con tab..."
                onKeyDown={ handleAddLabel }
                onChange={ handleInputOnChange }
                value={ inputValue }
            />
        </div>
    )
}
