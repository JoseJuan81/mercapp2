import { updateItemInArrayByProp } from "../../helper/updateItemInArrayByProp"

describe('Pruebas sobre archivo updateItemInArrayByProp', () => {

    const baseArray = [
        { id: 1, name: 'Hola Mundo', active: false },
        { id: 2, name: 'foo', active: false }
    ]

    test('Actualizar item dentro de una arreglo', () => {
        const updatedArray = updateItemInArrayByProp( 'id', { id: 2, name: 'foo', active: true }, baseArray );

        expect( updatedArray ).toEqual([
            { id: 1, name: 'Hola Mundo', active: false },
            { id: 2, name: 'foo', active: true }
        ])
    })
})