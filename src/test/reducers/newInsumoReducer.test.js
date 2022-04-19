import { type } from "../../constant/type";
import { newInsumoReducer, newInsmoInitialState } from "../../reducers/newInsumoReducer";

describe('Pruebas sobre archivo newInsumoReducer.js', () => {
  
    test('Debe retornar el estado inicial', () => {

        const result = newInsumoReducer( {}, {} );

        expect( result ).toEqual( {} );
    });

    test('Llenar formulario de nuevo insumo', () => {

        const newInsumo = {
            name: 'Insumo a actualizar',
            price: {},
            labels: []
        }
        const action = {
            type: type.newInsumo.fill,
            payload: newInsumo
        }
        const result = newInsumoReducer( newInsmoInitialState, action );

        expect( result ).toEqual( { data: { ...newInsumo, name: newInsumo.name }, isEditing: false } );
    });

    test('Limpiar formulario de nuevo insumo', () => {

        const action = {
            type: type.newInsumo.reset
        }
        const result = newInsumoReducer( newInsmoInitialState, action );

        expect( result ).toEqual( newInsmoInitialState );
    });

    test('Llenar formulario con insumo a actualizar', () => {

        const insumoToUpdate = {
            name: 'Insumo a actualizar',
            price: {
                'establecimiento #1': 2,
                'establecimiento #2,': 3
            },
            labels: ['foo', 'bar', 'bazz']
        }
        const action = {
            type: type.newInsumo.update,
            payload: insumoToUpdate
        }
        const result = newInsumoReducer( newInsmoInitialState, action );

        expect( result ).toEqual( { data: { ...insumoToUpdate }, isEditing: true } );
    });
})