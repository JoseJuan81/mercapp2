import { editarInsumoPath } from "../../constant/routes";
import { extractIdFromPathName } from "../../helper/route";

describe( 'Pruebas sobre archivo Route', () => {

    test('pruebas sobre funcion extractIdFromPathName (editar insumo)', () => {

        const id = '18p8BB5GCPy2cyuXTDYD';
        const completePath = editarInsumoPath + '/' + id;

        const idFromPath = extractIdFromPathName( completePath, editarInsumoPath );

        expect( idFromPath ).toBe( id );
    })
})