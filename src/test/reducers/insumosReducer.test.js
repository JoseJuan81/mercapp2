import { insumosType } from "../../constant/insumosType";
import { insumosReducer } from "../../reducers/insumosReducer";

describe('pruebas sobre archivo insumosReducer.js', () => {

    test('Debe retornar el estado inicial = []', () => {
        
        const result = insumosReducer([], {});

        expect( result ).toEqual([]);
    });

    test('Agregar un insumo al state', () => {
        
        const insumo = { id: 99, name: 'Hola Mundo' }
        const action = {
            type: insumosType.add,
            payload: insumo
        }
        const result = insumosReducer([], action);
        expect( result ).toEqual([insumo]);
        
        const result2 = insumosReducer([insumo], action);
        expect( result2 ).toEqual([insumo, insumo]);
    })

    test('Obtener todos los insumos ordenados alfabeticamente', () => {
        
        const insumos = [
            { id: 1, name: 'Hola Mundo' },
            { id: 2, name: 'Chao Mundo' },
            { id: 3, name: 'zoologico' },
            { id: 4, name: 'Avion' },
        ];
        const action = {
            type: insumosType.getAll,
            payload: 'name'
        }
        const result = insumosReducer( insumos, action );

        expect( result ).toEqual([
            insumos[3],
            insumos[1],
            insumos[0],
            insumos[2],
        ]);
    })

    test('Agregar insumos al state', () => {

        const insumos = [
            { id: 1, name: 'Hola Mundo' },
            { id: 2, name: 'Chao Mundo' },
            { id: 3, name: 'zoologico' },
            { id: 4, name: 'Avion' },
        ];
        const action = {
            type: insumosType.set,
            payload: insumos
        }

        const result = insumosReducer( insumos, action );

        expect( result ).toEqual( insumos );
    });

    test('Remover un insumo del arreglo de insumos', () => {

        const insumos = [
            { id: 1, name: 'Hola Mundo' },
            { id: 2, name: 'Chao Mundo' },
            { id: 3, name: 'zoologico' },
            { id: 4, name: 'Avion' },
        ];
        const action = {
            type: insumosType.deleteInsumoById,
            payload: 2
        }

        const result = insumosReducer( insumos, action );

        expect( result ).toEqual([
            insumos[0],
            insumos[2],
            insumos[3],
        ]);
    });

    test('Actualizar un insumo del arreglo de insumos', () => {

        const insumos = [
            { id: 1, name: 'Hola Mundo' },
            { id: 2, name: 'Chao Mundo' },
            { id: 3, name: 'zoologico' },
            { id: 4, name: 'Avion' },
        ];
        const updatedInsumo = { id: 2, name: 'bar' };
        const action = {
            type: insumosType.updateInsumos,
            payload: updatedInsumo
        }

        const result = insumosReducer( insumos, action );

        expect( result ).toEqual([
            insumos[0],
            updatedInsumo,
            insumos[2],
            insumos[3],
        ]);
    })

    test('Buscar insumos por nombre', () => {

        const insumos = [
            { id: 1, name: 'Hola Mundo' },
            { id: 2, name: 'Chao Mundo' },
            { id: 3, name: 'zoologico' },
            { id: 4, name: 'Avion' },
        ];

        const action = {
            type: insumosType.search,
            payload: { insumos, searchValue: 'avion' }
        }
        const result = insumosReducer( insumos, action );
        expect( result ).toEqual([insumos[3]]);

        const action2 = {
            type: insumosType.search,
            payload: { insumos, searchValue: 'mundo' }
        }
        const result2 = insumosReducer( insumos, action2 );
        expect( result2 ).toEqual([
            insumos[0],
            insumos[1]
        ])

        const action3 = {
            type: insumosType.search,
            payload: { insumos, searchValue: '' }
        }
        const result3 = insumosReducer( insumos, action3 );
        expect( result3 ).toEqual( insumos );

        const action4 = {
            type: insumosType.search,
            payload: { insumos, searchValue: undefined }
        }
        const result4 = insumosReducer( insumos, action4 );
        expect( result4 ).toEqual( insumos );

        const action5 = {
            type: insumosType.search,
            payload: { insumos, searchValue: null }
        }
        const result5 = insumosReducer( insumos, action5 );
        expect( result5 ).toEqual( insumos );

        const action6 = {
            type: insumosType.search,
            payload: { insumos, searchValue: 'xxx' }
        }
        const result6 = insumosReducer( insumos, action6 );
        expect( result6 ).toEqual( [] );
    })

    test('Buscar insumos por etiquetas', () => {

        const insumos = [
            { id: 1, labels: ['foo'] },
            { id: 2, labels: ['foo', 'bar'] },
            { id: 3, labels: ['bazz'] },
            { id: 4, labels: ['bar'] }
        ];

        const action = {
            type: insumosType.filter,
            payload: { insumos, filterValue: 'foo' }
        }
        const result = insumosReducer( insumos, action );
        expect( result ).toEqual([
            insumos[0],
            insumos[1]
        ]);

        const action2 = {
            type: insumosType.filter,
            payload: { insumos, filterValue: 'bazz' }
        }
        const result2 = insumosReducer( insumos, action2 );
        expect( result2 ).toEqual([
            insumos[2],
        ])

        const action3 = {
            type: insumosType.filter,
            payload: { insumos, filterValue: '' }
        }
        const result3 = insumosReducer( insumos, action3 );
        expect( result3 ).toEqual( insumos );

        const action4 = {
            type: insumosType.filter,
            payload: { insumos, filterValue: undefined }
        }
        const result4 = insumosReducer( insumos, action4 );
        expect( result4 ).toEqual( insumos );

        const action5 = {
            type: insumosType.filter,
            payload: { insumos, filterValue: null }
        }
        const result5 = insumosReducer( insumos, action5 );
        expect( result5 ).toEqual( insumos );

        const action6 = {
            type: insumosType.filter,
            payload: { insumos, filterValue: 'mundo' }
        }
        const result6 = insumosReducer( insumos, action6 );
        expect( result6 ).toEqual( [] );
    })

    test('Seleccionar uno o varios insumos', () => {

        const insumos = [
            { id: 1, name: 'Hola Mundo' },
            { id: 2, name: 'Chao Mundo' },
            { id: 3, name: 'zoologico' },
            { id: 4, name: 'Avion' },
        ];
        const action = {
            type: insumosType.select,
            payload: { ...insumos[2], selected: true }
        }
        const result = insumosReducer( insumos, action );
        expect( result ).toEqual([
            insumos[0],
            insumos[1],
            { ...insumos[2], selected: true },
            insumos[3],
        ])
    })
})