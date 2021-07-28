import { shallow } from 'enzyme';

import { PageTitle } from "../../../components/Genericos/PageTitle"

describe('pruebas sobre archivo PageTitle.js', () => {

    test('se debe renderizar correctamente', () => {
        const wrapper = shallow(<PageTitle title="Hola mundo" />);

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text()).toBe('Hola mundo');
    })
})