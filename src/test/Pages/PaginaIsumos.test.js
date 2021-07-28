import { mount } from 'enzyme';

import { PaginaInsumos } from '../../Pages/PaginaInsumos';

describe('Prueba sobre archivo PaginaInsumo', () => {

    test('Se debe renderizar correctamente', () => {

        const wrapper = mount( <PaginaInsumos />);

        expect( wrapper ).toMatchSnapshot();
    })
})