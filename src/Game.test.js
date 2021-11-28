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

    it('Game should render a div containing the result (win,draw)',() => {
        let wrapper = shallow(<Game />);
        expect(wrapper.find('div.message').length).toEqual(1);
    });

    it('a onClick function should be called when a cell is clicked', () => {
        let listener = { callback : () => {}};
        const handleClickCheck = jest.spyOn(listener, 'callback');
        let wrapper = shallow(<Game onCellClick={listener.callback}/>);

        wrapper.find('td').first().simulate('click');
        expect(handleClickCheck).toHaveBeenCalled()
        handleClickCheck.mockRestore();
    });

    it('The first move should be a X', () => {
        let wrapper = shallow(<Game />);
        wrapper.find('td').first().simulate('click');
        expect(wrapper.find('td').first().text()).toEqual('X');
    });

    it('The moves should alternate X and O', () => {
        let wrapper = shallow(<Game />);
        for(let i = 0; i< 9; i++) {
            wrapper.find('td').at(i).simulate('click');
            //Moves should alternate at each click, but can also be empty string as the game could stop before completing all cells !
            let inArray = ['',i % 2 ? 'O' : 'X'].indexOf(wrapper.find('td').at(i).text()) > -1;
            expect(inArray).toEqual(true);
        }
    });

    it('All cells should not be played twice', () => {
        let wrapper = shallow(<Game />);
        for(let i = 0; i< 9; i++) {
            wrapper.find('td').at(i).simulate('click');
            wrapper.find('td').at(i).simulate('click');
            //Moves should be the same after 2 clicks, even empty string, if the game stop before completing all cells.
            expect(['',i % 2 ? 'O' : 'X']).toContain(wrapper.find('td').at(i).text());
        }
    });

});