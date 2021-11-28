import React from 'react';
import {shallow} from 'enzyme';
import Game from './Game';

describe ('Game', () => {

    it('Game should render a div', () => {
        let wrapper = shallow(<Game/>);
        expect(wrapper.find('div.Game').length).toEqual(1);
    });

    it('Game should render a table of 3 X 3 cells',() => {
        let wrapper = shallow(<Game />);
        expect(wrapper.find('table').length).toEqual(1);
        expect(wrapper.find('table tr').length).toEqual(3);
        wrapper.find('table tr').forEach((tr) => {
            expect(tr.find('td').length).toEqual(3);
        })
    });

});