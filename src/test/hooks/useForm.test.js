import { act, renderHook } from '@testing-library/react-hooks';
import { useForm } from '../../hooks/useForm';

describe('Pruebas sobre archivo useForm', () => {

    test('debe retornar el estado inicial', () => {
        const { result } = renderHook( () => useForm() );
        
        const { formState, handleInputChange, resetForm } = result.current;

        expect( formState ).toEqual({});
        expect( typeof handleInputChange === 'function' ).toBe(true);
        expect( typeof resetForm === 'function' ).toBe(true);
    })

    test('Cambiar valores en el useForm y re-establecer estado inicial', () => {
        
        const initialState = {
            name: 'Jose Juan'
        };

        const { result } = renderHook( () => useForm(initialState) );

        // verificar el estado inicial
        expect( result.current.formState.name ).toBe(initialState.name);

        // modificar datos del formulario
        act( () => {

            result.current.handleInputChange({
                target: {
                    name: 'name',
                    value: 'Churry',
                }
            })

        })

        // verificar nuevo estado
        const { formState, resetForm } = result.current;
        expect( formState.name ).toBe('Churry');
        
        // re- establecer estado inicial del formulario
        act( () => {
            resetForm();
        })
        
        // verificar estado inicial
        expect( result.current.formState.name ).toBe(initialState.name);
    })
})