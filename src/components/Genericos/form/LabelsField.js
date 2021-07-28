import { removeItemFromArrayByIndex } from 'functionallibrary';
import React, { useRef, useState } from 'react';

export const LabelsField = ({ labels = [], addLabels }) => {

    const labelsRef = useRef();

    const [inputValue, setInputValue] = useState( '' );
    const [labelsState, setLabelsState] = useState( labels );

    const handleAddLabel = (ev) => {

        ev.preventDefault();
        ev.stopPropagation();

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

    const handleAddLabelWithTabKey = (ev) => {
        ev.stopPropagation();

        if (ev.code === 'Tab' && inputValue) {
            handleAddLabel()
        }
    }

    const handleInputOnChange = ({ target }) => {

        setInputValue(
            target.value
        )
    }

    const removeLabel = (e, index) => {
        e.preventDefault();
        e.stopPropagation();

        setLabelsState(
            removeItemFromArrayByIndex(index)
        )
    }

    return (
        <div
            className="
                flex flex-wrap
                w-full min-h-16
                px-2 pt-2 pb-1 mb-4
                border border-solid border-warmGray-300
                rounded
                overflow-hidden
            "
        >
            
            { labelsState && labelsState.length > 0 && 
                <div className="flex flex-wrap">
                    {
                        labelsState.map( (l, ind) => (
                            <span
                                key={ `${l}-${ind}` }
                                className="
                                    relative
                                    flex items-center
                                    text-warmGray-600
                                "
                            >
                                <span
                                    className="
                                        rounded
                                        bg-warmGray-200
                                        m-1 p-1 mr-2
                                    "
                                >{ l }</span>
                                <button
                                    type="button"
                                    className="
                                        icon-cancel-circle
                                        absolute -top-4 -right-2
                                        p-1
                                        text-rose-300
                                        text-2xl
                                    "
                                    onClick={ (ev) => removeLabel( ev, ind ) }
                                ></button>
                            </span>
                        ) )
                    }
                </div>
            }

            <div
                className="
                    flex-auto
                    flex items-center justify-between
                "
            >
                <input
                    type="text"
                    className="
                        input-form
                        input-transparent
                    "
                    ref={ labelsRef }
                    autoComplete="off"
                    placeholder="Etiquetas"
                    onKeyDown={ handleAddLabelWithTabKey }
                    onChange={ handleInputOnChange }
                    value={ inputValue }
                />
                {inputValue &&
                    <button
                        className="
                            icon-plus
                            px-2 py-2
                            text-lime-500
                            bg-warmGray-100
                            rounded
                        "
                        onClick={ handleAddLabel }
                    ></button>
                }
            </div>
        </div>
    )
}
