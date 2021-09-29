import { typeBuy } from "../../constant/buy";
import { buyReducer, initialState } from "../../reducers/buyReducer";

describe('Pruebas sobre archivo buyReducer.js', () => {
    
    const insumosFake = [
        { id: 1, selected: true },
        { id: 2, selected: false },
        { id: 3, selected: false },
        { id: 4, selected: false },
        { id: 5, selected: true },
    ];

    test('Retornar estado inicial', () => {
        const result = buyReducer( initialState, {} );

        expect( result ).toEqual( initialState );
    })

    test('Obtener los insumos seleccionados', () => {

        const action = {
            type: typeBuy.selected,
            payload: insumosFake
        };

        const result = buyReducer( initialState, action );

        expect( result ).toEqual({
            ...initialState,
            selectedInsumos: [insumosFake[0],insumosFake[4]]
        })
    });

    test('Establecer nombre del establecimiento', () => {

        const action = {
            type: typeBuy.establishment,
            payload: 'El nombre de mi local'
        };

        const result = buyReducer( initialState, action );

        expect( result ).toEqual({
            ...initialState,
            establishmentName: action.payload
        })
    });

    test('Aumentar o disminuir cantidad en in insumo', () => {

        const state = {
            ...initialState,
            selectedInsumos: [...insumosFake]
        }
        const updatedInsumo = { ...insumosFake[0], quantity: 2 };
        const action = {
            type: typeBuy.updateQuantity,
            payload: updatedInsumo
        };

        const result = buyReducer( state, action );

        expect( result ).toEqual({
            ...initialState,
            selectedInsumos: [
                updatedInsumo,
                insumosFake[1],
                insumosFake[2],
                insumosFake[3],
                insumosFake[4],
            ]
        })

    })

    test('Calcular el total de una compra', () => {

        const name = 'mass';

        const iF = [
            { id: 1, price: { [name]: 2.2 }, quantity: 2 },
            { id: 2, price: { [name]: 3 }, quantity: 1 },
            { id: 3, price: { [name]: 2 }, quantity: 2 },
            { id: 4, price: { [name]: 3 }, quantity: 3 },
            { id: 5, price: { [name]: 2 }, quantity: 4 },
        ];
        const total = 4.4 + 3 + 4 + 9 + 8;

        const state = {
            ...initialState,
            establishmentName: name,
            selectedInsumos: [...iF]
        };
        const action = {
            type: typeBuy.total,
            payload: iF
        };

        const result = buyReducer( state, action );

        expect( result ).toEqual({
            ...state,
            total
        })
    })

    test('Total de una compra cuando no hay precio ni cantidad', () => {

        const name = 'mass';
        const state = {
            ...initialState,
            establishmentName: name,
            selectedInsumos: [...insumosFake]
        };
        const action = {
            type: typeBuy.total,
            payload: insumosFake
        };

        const result = buyReducer( state, action );

        expect( result ).toEqual({
            ...state,
            total: 0
        })
    })
})