import { newInsumoTypeForm, newInsumoForm } from "../../constant/newInsumoTypeForm";
import { newInsumoReducer } from "../../reducers/newInsumoReducer";

describe('Pruebas sobre archivo newInsumoReducer.js', () => {
  
    test('Debe retornar el estado inicial', () => {

        const result = newInsumoReducer( newInsumoTypeForm, {} );

        expect( result ).toEqual( newInsumoTypeForm );
    });

    test('Llenar formulario de nuevo indumo', () => {

        const newInsumo = {
            name: 'Insumo a actualizar',
            price: {},
            labels: []
        }
        const action = {
            type: newInsumoForm.fill,
            payload: newInsumo
        }
        const result = newInsumoReducer( newInsumoTypeForm, action );

        expect( result ).toEqual( { data: { ...newInsumo, name: newInsumo.name }, isEditing: false } );
    });

    test('Limpiar formulario de nuevo insumo', () => {

        const action = {
            type: newInsumoForm.reset
        }
        const result = newInsumoReducer( newInsumoTypeForm, action );

        expect( result ).toEqual( newInsumoTypeForm );
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
            type: newInsumoForm.update,
            payload: insumoToUpdate
        }
        const result = newInsumoReducer( newInsumoTypeForm, action );

        expect( result ).toEqual( { data: { ...insumoToUpdate }, isEditing: true } );
    });
})