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


    const simulateGame = (wrapper,moves) => {
        moves.forEach((cellIndex) => {
            wrapper.find('td').at(cellIndex).simulate('click');
        });
    };

    const checkVictory = (wrapper, player) => {
        expect(wrapper.find('div.message').first().text()).toEqual(player+' won the game');
    };

    it('If a player fill the first row, the game is done and a win message appear', () => {
        // CASE IF X fills the row
        let wrapper = shallow(<Game />);
        let moves = [0,3,1,4,2,8];
        simulateGame(wrapper,moves);

        expect(wrapper.find('td').at(8).text()).toEqual('');
        checkVictory(wrapper, 'X');

        // CASE IF O fills the row

        wrapper = shallow(<Game />);
        moves = [3,0,4,1,8,2,7];
        simulateGame(wrapper,moves);

        expect(wrapper.find('td').at(7).text()).toEqual('');
        expect(wrapper.find('div.message').first().text()).toEqual('O won the game');
        checkVictory(wrapper, 'O');

    });

    it('If a player fill the second row, the game is done and a win message appear', () => {
        // CASE IF X fills the row
        let wrapper = shallow(<Game />);
        let moves = [3,0,4,1,5,8];
        simulateGame(wrapper,moves);

        expect(wrapper.find('td').at(8).text()).toEqual('');
        checkVictory(wrapper, 'X');

        // CASE IF O fills the row

        wrapper = shallow(<Game />);
        moves = [8,3,0,4,1,5,7];
        simulateGame(wrapper,moves);

        expect(wrapper.find('td').at(7).text()).toEqual('');
        checkVictory(wrapper, 'O');

    });

    it('If a player fill the third row, the game is done and a win message appear', () => {
        // CASE IF X fills the row
        let wrapper = shallow(<Game />);
        let moves = [6,0,7,1,8,2];
        simulateGame(wrapper,moves);

        expect(wrapper.find('td').at(2).text()).toEqual('');
        checkVictory(wrapper, 'X');

        // CASE IF O fills the row

        wrapper = shallow(<Game />);
        moves = [2,6,0,7,4,8,3];
        simulateGame(wrapper,moves);

        expect(wrapper.find('td').at(3).text()).toEqual('');
        checkVictory(wrapper, 'O');

    });

    it('If a player fill the first column, the game is done and a win message appear', () => {
        // CASE IF X fills the column
        let wrapper = shallow(<Game />);
        let moves = [0,1,3,2,6,8];
        simulateGame(wrapper,moves);

        expect(wrapper.find('td').at(8).text()).toEqual('');
        checkVictory(wrapper, 'X');

        // CASE IF O fills the column

        wrapper = shallow(<Game />);
        moves = [8,0,1,3,2,6,7];
        simulateGame(wrapper,moves);

        expect(wrapper.find('td').at(7).text()).toEqual('');
        checkVictory(wrapper, 'O');

    });

    it('If a player fill the second column, the game is done and a win message appear', () => {
        // CASE IF X fills the column
        let wrapper = shallow(<Game />);
        let moves = [1,0,4,2,7,8];
        simulateGame(wrapper,moves);

        expect(wrapper.find('td').at(8).text()).toEqual('');
        checkVictory(wrapper, 'X');

        // CASE IF O fills the column

        wrapper = shallow(<Game />);
        moves = [8,1,0,4,2,7,3];
        simulateGame(wrapper,moves);

        expect(wrapper.find('td').at(3).text()).toEqual('');
        checkVictory(wrapper, 'O');

    });

    it('If a player fill the third column, the game is done and a win message appear', () => {
        // CASE IF X fills the column
        let wrapper = shallow(<Game />);
        let moves = [2,0,5,1,8,3];
        simulateGame(wrapper,moves);

        expect(wrapper.find('td').at(3).text()).toEqual('');
        checkVictory(wrapper, 'X');

        // CASE IF O fills the column

        wrapper = shallow(<Game />);
        moves = [3,2,0,5,1,8,4];
        simulateGame(wrapper,moves);

        expect(wrapper.find('td').at(4).text()).toEqual('');
        checkVictory(wrapper, 'O');

    });

    it('If a player fill the first diagonal, the game is done and a win message appear', () => {
        // CASE IF X fills the column
        let wrapper = shallow(<Game />);
        let moves = [0,1,4,2,8,3];
        simulateGame(wrapper,moves);

        expect(wrapper.find('td').at(3).text()).toEqual('');
        checkVictory(wrapper, 'X');

        // CASE IF O fills the column

        wrapper = shallow(<Game />);
        moves = [3,0,1,4,2,8,5];
        simulateGame(wrapper,moves);

        expect(wrapper.find('td').at(5).text()).toEqual('');
        checkVictory(wrapper, 'O');

    });

    it('If a player fill the second diagonal, the game is done and a win message appear', () => {
        // CASE IF X fills the column
        let wrapper = shallow(<Game />);
        let moves = [2,3,4,1,6,0];
        simulateGame(wrapper,moves);

        expect(wrapper.find('td').at(0).text()).toEqual('');
        checkVictory(wrapper, 'X');

        // CASE IF O fills the column

        wrapper = shallow(<Game />);
        moves = [0,2,3,4,1,6,5];
        simulateGame(wrapper,moves);

        expect(wrapper.find('td').at(5).text()).toEqual('');
        checkVictory(wrapper, 'O');

    });

    it('If all 9 cases are filled and no one won, a draw message appear', () => {
        let wrapper = shallow(<Game />);
        let moves = [0,1,2,3,4,8,7,6,5];
        simulateGame(wrapper,moves);

        expect(wrapper.find('div.message').first().text()).toEqual('Draw game');

    });


});