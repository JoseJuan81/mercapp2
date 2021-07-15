import { updateItemInArrayByProp } from "../../helper/utils";

describe('Pruebas sobre archivo utils.js', () => {

    test('Pruebas sobre funcion updateItemInArrayByProp', () => {
        const updatedItem = {
            id: 1,
            title: 'estado actualizado'
        }
        const testArray = [
            { id: 1, title: 'estado inicial elemento' },
            { id: 2, title: 'elemento del arreglo' },
            { id: 3, title: 'otro elemento del arreglo' }
        ]
            
        const updatedArr = updateItemInArrayByProp('id', updatedItem, testArray);

        expect(updatedArr[0]).toEqual(updatedItem);
    })
})