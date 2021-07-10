import { shallow } from 'enzyme';

import { PaginaInsumos } from '../../Pages/PaginaInsumos';

describe('Prueba sobre archivo PaginaInsumo', () => {

    test('Se debe renderizar correctamente', () => {

        const wrapper = shallow( <PaginaInsumos />);

        expect( wrapper ).toMatchSnapshot();
    })
})