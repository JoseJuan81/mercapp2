import { isEmpty, removeItemFromArrayByIndex } from 'functionallibrary';
import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

export const LabelsField = ({
    labels = [],
    addLabels,
    placeholder = 'etiquetas...',
    name=''
}) => {

    const labelsRef = useRef();

    const [inputValue, setInputValue] = useState( '' );
    const [labelsState, setLabelsState] = useState( labels );

    const handleAddLabel = () => {

        setLabelsState( l => [inputValue, ...l] );
        addLabels({
            target: {
                name,
                value: [inputValue, ...labelsState]
            }
        });

        labelsRef.current.focus();
        setInputValue('');
        
    }

    const handleClickToAddLabel = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        handleAddLabel();
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

        const labelsUpdated = removeItemFromArrayByIndex(index, labelsState);

        setLabelsState( labelsUpdated );

        addLabels({
            target: {
                name,
                value: labelsUpdated
            }
        });

        labelsRef.current.focus();
    }

    useEffect( () => {

        if ( isEmpty( labels ) ) {
            setLabelsState( labels );
        }

    }, [labels])

    return (
        <div
            className={`
                flex flex-wrap
                w-full min-h-12
                mb-4 ${ labelsState && labelsState.length > 0 && 'p-1' }
                border border-solid border-warmGray-300
                rounded
                overflow-hidden
            `}
        >
            
            { labelsState && labelsState.length > 0 && 
                <div
                    className="
                        flex flex-wrap
                        max-h-48
                        overflow-auto
                    "
                >
                    {
                        labelsState.map( (l, ind) => (
                            <span
                                key={ `${l}-${ind}` }
                                className={`
                                    relative
                                    flex items-center
                                    text-warmGray-800
                                    ${ labelsState.length > 1 && 'mr-2 my-1' }
                                `}
                            >
                                <span
                                    className="
                                        rounded-l
                                        bg-warmGray-100
                                        p-2
                                    "
                                >{ l }</span>
                                <button
                                    type="button"
                                    className="
                                        bg-warmGray-100
                                        rounded-r-full
                                        p-1
                                        text-rose-400
                                        text-2xl
                                    "
                                    onClick={ (ev) => removeLabel( ev, ind ) }
                                >
                                    <i className="far fa-times-circle"></i>
                                </button>
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
                        pl-4
                    "
                    name={ name }
                    ref={ labelsRef }
                    autoComplete="off"
                    placeholder={ placeholder }
                    onKeyDown={ handleAddLabelWithTabKey }
                    onChange={ handleInputOnChange }
                    value={ inputValue }
                />
                {inputValue &&
                    <button
                        className="
                            h-10 w-10
                            px-2 py-2 mr-2
                            text-lime-500 text-xl
                            bg-warmGray-100
                            rounded
                        "
                        onClick={ handleClickToAddLabel }
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                }
            </div>
        </div>
    )
}

LabelsField.propTypes = {
    addLabels: PropTypes.func.isRequired,
    labels: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    name: PropTypes.string
}