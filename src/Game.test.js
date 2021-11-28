import React from 'react';
import {shallow} from 'enzyme';
import Game from './Game';

describe ('Game', () => {

    it('Game should render a div', () => {
        let wrapper = shallow(<Game/>);
        expect(wrapper.find('div.Game').length).toEqual(1);
    });
});