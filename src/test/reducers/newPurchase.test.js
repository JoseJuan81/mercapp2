import { type } from "../../constant/type";
import { newPurchaseReducer, initialState } from "../../reducers/newPurchaseReducer";

describe('Pruebas sobre archivo newPurchase.js', () => {
    
    const insumosFake = [
        { id: 1, selected: true },
        { id: 2, selected: false },
        { id: 3, selected: false },
        { id: 4, selected: false },
        { id: 5, selected: true },
    ];

    test('Retornar estado inicial', () => {
        const result = newPurchaseReducer( initialState, {} );

        expect( result ).toEqual( initialState );
    })

    test('Obtener los insumos seleccionados', () => {

        const action = {
            type: type.newPurchase.selected,
            payload: insumosFake.filter( f => f.selected )
        };

        const result = newPurchaseReducer( initialState, action );

        expect( result ).toEqual({
            ...initialState,
            insumos: [insumosFake[0],insumosFake[4]]
        })
    });

    test('Establecer nombre del establecimiento', () => {

        const action = {
            type: type.newPurchase.update,
            payload: { establishmentName: 'El nombre de mi local' }
        };

        const result = newPurchaseReducer( initialState, action );

        expect( result ).toEqual({
            ...initialState,
            establishmentName: action.payload.establishmentName
        })
    });

    test('Aumentar o disminuir cantidad en un insumo', () => {

        const state = {
            ...initialState,
            insumos: [...insumosFake]
        }
        const updatedInsumo = { ...insumosFake[0], quantity: 2 };
        const action = {
            type: type.newPurchase.updateQuantity,
            payload: updatedInsumo
        };

        const result = newPurchaseReducer( state, action );

        expect( result ).toEqual({
            ...initialState,
            insumos: [
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
            insumos: [...iF]
        };
        const action = {
            type: type.newPurchase.total,
            payload: iF
        };

        const result = newPurchaseReducer( state, action );

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
            insumos: [...insumosFake]
        };
        const action = {
            type: type.newPurchase.total,
            payload: insumosFake
        };

        const result = newPurchaseReducer( state, action );

        expect( result ).toEqual({
            ...state,
            total: 0
        })
    })

    test('Actualizar el total de un determinado insumo', () => {

        const name = 'mass';

        const iF = [
            { id: 1, price: { [name]: 2.2 }, quantity: 2 },
            { id: 2, price: { [name]: 3 }, quantity: 1 },
            { id: 3, price: { [name]: 2 }, quantity: 2 },
            { id: 4, price: { [name]: 3 }, quantity: 3 },
            { id: 5, price: { [name]: 2 }, quantity: 4 },
        ];

        const state = {
            ...initialState,
            establishmentName: name,
            insumos: [...iF]
        };
        const action = {
            type: type.newPurchase.updateInsumoTotal,
            payload: { ...iF[0], quantity: 10, total: 22 }
        };

        const result = newPurchaseReducer( state, action );

        expect( result ).toEqual({
            ...initialState,
            establishmentName: name,
            insumos: [
                { ...iF[0], quantity: 10, total: 22 },
                iF[1], iF[2], iF[3], iF[4]
            ]
        })
    })
})