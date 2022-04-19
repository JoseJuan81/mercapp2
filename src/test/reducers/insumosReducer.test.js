import { type } from "../../constant/type";
import { insumosReducer, initialState } from "../../reducers/insumosReducer";

describe('pruebas sobre archivo insumosReducer.js', () => {

    const insumosBase = [
        { id: 1, labels: ['rojo', 'pollo'], name: 'Hola Mundo' },
        { id: 2, labels: ['verde', 'carne'], name: 'Chao Mundo' },
        { id: 3, labels: ['verde', 'pollo'], name: 'zoologico' },
        { id: 4, labels: ['azul', 'fruta'], name: 'Avion' },
    ];

    let localState = { ...initialState, data: [...insumosBase], cache: [...insumosBase] };


    test('Debe retornar el estado inicial = {}', () => {
        
        const result = insumosReducer({}, {});

        expect( result ).toEqual({});
    });

    test('Agregar un insumo al state', () => {
        
        const newInsumo = { id: 99, name: 'Gato', labels: ['fruta', 'rojo'] }
        const action = {
            type: type.insumos.add,
            payload: newInsumo
        }

        const result = insumosReducer( localState, action );

        expect( result ).toEqual({
            ...localState,
            cache: [newInsumo, ...localState.data],
            data: [newInsumo, ...localState.data]
        });
// console.log( JSON.stringify(localState))
        localState = { ...result }
    })

    test('Obtener todos los insumos ordenados alfabeticamente', () => {

        const action = {
            type: type.insumos.getAll,
            payload: 'name'
        }
        const result = insumosReducer( { ...localState }, action );

        expect( result ).toEqual({
            ...localState,
            data: [
                localState.cache[4],
                localState.cache[2],
                localState.cache[0],
                localState.cache[1],
                localState.cache[3],
            ]
        });
// console.log( JSON.stringify(localState))
        localState = { ...result };
    })

    test('Agregar insumos a state.data y al state.cache', () => {

        const action = {
            type: type.insumos.set,
            payload: localState.data
        }

        const result = insumosReducer( localState, action );

        expect( result ).toEqual({
            ...localState,
            cache: localState.data,
            data: localState.data
        });
// console.log( JSON.stringify(localState))
        localState = { ...result };
    });

    test('Remover un insumo del arreglo de insumos usando su ID', () => {

        const action = {
            type: type.insumos.deleteInsumoById,
            payload: 2
        }

        const result = insumosReducer( localState, action );

        expect( result ).toEqual({
            ...localState,
            cache: [
                localState.cache[0],
                localState.cache[2],
                localState.cache[3],
                localState.cache[4],
            ],
            data: [
                localState.cache[0],
                localState.cache[2],
                localState.cache[3],
                localState.cache[4],
            ]
        });
// console.log( JSON.stringify(localState))
        localState = { ...result };
    });

    test('Actualizar un insumo del arreglo de insumos', () => {

        const updatedInsumo = { id: 3, name: 'BAR', selected: true, labels: [] };

        const action = {
            type: type.insumos.updateInsumos,
            payload: updatedInsumo
        }

        const result = insumosReducer( localState, action );

        expect( result ).toEqual({
            ...localState,
            cache: [
                localState.cache[0],
                localState.cache[1],
                localState.cache[2],
                updatedInsumo,
            ],
            data: [
                localState.cache[0],
                localState.cache[1],
                localState.cache[2],
                updatedInsumo,
            ]
        });
// console.log( JSON.stringify(localState))
        localState = { ...result };
    })

    test('Buscar insumo AVION', () => {

        const action = {
            type: type.insumos.search,
            payload: 'avion'
        }
        const result = insumosReducer( localState, action );

        expect( result ).toEqual({
            ...localState,
            data: [localState.cache[0]]
        });
// console.log( JSON.stringify(localState))
        localState = { ...result };
    })

    test('Buscar insumo MUNDO', () => {

        const action = {
            type: type.insumos.search,
            payload: 'mundo'
        }
        const result = insumosReducer( localState, action );

        expect( result ).toEqual({
            ...localState,
            data: [localState.cache[2]]
        });
// console.log( JSON.stringify(localState))
        localState = { ...result };
    })

    test('Hacer busqueda con valor que no existe "MANGO"', () => {

        const action = {
            type: type.insumos.search,
            payload: 'mango'
        }
        const result = insumosReducer( localState, action );

        expect( result ).toEqual({
            ...localState,
            data: []
        });
// console.log( JSON.stringify(localState))
        localState = { ...result };
    })

    test('Resetear busqueda al enviar string vacio ""', () => {

        const action = {
            type: type.insumos.search,
            payload: ''
        }
        const result = insumosReducer( localState, action );

        expect( result ).toEqual({
            ...localState,
            data: [...localState.cache]
        });
// console.log( JSON.stringify(localState))
        localState = { ...result };
    })

    test('Resetear busqueda al enviar NULL', () => {

        const action = {
            type: type.insumos.search,
            payload: null
        }
        const result = insumosReducer( { ...localState, data: [localState.cache[0]] }, action );

        expect( result ).toEqual({
            ...localState,
            data: [...localState.cache]
        });
// console.log( JSON.stringify(localState))
        localState = { ...result };
    })

    test('Resetear busqueda al enviar UNDEFINED', () => {

        const action = {
            type: type.insumos.search,
            payload: null
        }
        const result = insumosReducer( { ...localState, data: [localState.cache[1]] }, action );

        expect( result ).toEqual({
            ...localState,
            data: [...localState.cache]
        });
// console.log( JSON.stringify(localState))
        localState = { ...result };
    })

    test('Seleccionar uno o varios insumos', () => {

        const action = {
            type: type.insumos.updateInsumos,
            payload: { ...localState.cache[2], selected: true }
        }

        const result = insumosReducer( localState, action );
        expect( result ).toEqual({
            ...localState,
            cache: [
                localState.cache[0],
                localState.cache[1],
                { ...localState.cache[2], selected: true },
                localState.cache[3],
            ],
            data: [
                localState.cache[0],
                localState.cache[1],
                { ...localState.cache[2], selected: true },
                localState.cache[3],
            ]
        })
// console.log( JSON.stringify(localState))
        localState = { ...result };
    })

    test( 'Buscar insumos por etiqueta POLLO', () => {

        const action = {
            type: type.insumos.filter,
            payload: 'pollo'
        }

        const result = insumosReducer( localState, action );
        expect( result ).toEqual({
            ...localState,
            data: [localState.cache[2]]
        })
// console.log( JSON.stringify(localState))
        localState = { ...result };
    })

    test( 'Resetear busqueda por etiquetas enviado ""', () => {

        const action = {
            type: type.insumos.filter,
            payload: ''
        }

        const result = insumosReducer( localState, action );
        expect( result ).toEqual({
            ...localState,
            data: [...localState.cache]
        })
// console.log( JSON.stringify(localState))
        localState = { ...result };
    })

    test( 'Buscar etiqueta que no existe. data = []', () => {

        const action = {
            type: type.insumos.filter,
            payload: 'MONTana'
        }

        const result = insumosReducer( localState, action );
        expect( result ).toEqual({
            ...localState,
            data: []
        })
// console.log( JSON.stringify(localState))
        localState = { ...result };
    })

    test( 'Resetear busqueda por etiquetas al enviar NULL', () => {

        const action = {
            type: type.insumos.filter,
            payload: null
        }

        const result = insumosReducer( localState, action );
        expect( result ).toEqual({
            ...localState,
            data: [...localState.cache]
        })
// console.log( JSON.stringify(localState))
        localState = { ...result };
    })

    test( 'Resetear busqueda por etiquetas al enviar UNDEFINED', () => {

        const action = {
            type: type.insumos.filter,
            payload: undefined
        }

        const result = insumosReducer( localState, action );
        expect( result ).toEqual({
            ...localState,
            data: [...localState.cache]
        })
// console.log( JSON.stringify(localState))
        localState = { ...result };
    })

    // test('Buscar insumos por etiquetas', () => {

    //     const insumos = [
    //         { id: 1, labels: ['foo'] },
    //         { id: 2, labels: ['foo', 'bar'] },
    //         { id: 3, labels: ['bazz'] },
    //         { id: 4, labels: ['bar'] }
    //     ];

    //     const action = {
    //         type: insumosType.filter,
    //         payload: { insumos, filterValue: 'foo' }
    //     }
    //     const result = insumosReducer( insumos, action );
    //     expect( result ).toEqual([
    //         insumos[0],
    //         insumos[1]
    //     ]);

    //     const action2 = {
    //         type: insumosType.filter,
    //         payload: { insumos, filterValue: 'bazz' }
    //     }
    //     const result2 = insumosReducer( insumos, action2 );
    //     expect( result2 ).toEqual([
    //         insumos[2],
    //     ])

    //     const action3 = {
    //         type: insumosType.filter,
    //         payload: { insumos, filterValue: '' }
    //     }
    //     const result3 = insumosReducer( insumos, action3 );
    //     expect( result3 ).toEqual( insumos );

    //     const action4 = {
    //         type: insumosType.filter,
    //         payload: { insumos, filterValue: undefined }
    //     }
    //     const result4 = insumosReducer( insumos, action4 );
    //     expect( result4 ).toEqual( insumos );

    //     const action5 = {
    //         type: insumosType.filter,
    //         payload: { insumos, filterValue: null }
    //     }
    //     const result5 = insumosReducer( insumos, action5 );
    //     expect( result5 ).toEqual( insumos );

    //     const action6 = {
    //         type: insumosType.filter,
    //         payload: { insumos, filterValue: 'mundo' }
    //     }
    //     const result6 = insumosReducer( insumos, action6 );
    //     expect( result6 ).toEqual( [] );
    // })

    // 
})