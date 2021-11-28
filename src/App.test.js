import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import Game from './Game';

describe ('App', () => {
  let wrapper;
  beforeEach(() => wrapper = shallow(<App />));

  it('Global wrapper render be a div',() => {
    expect(wrapper.find('div.App').length).toEqual(1);
  });

  it('Global wrapper should contain a Game component',() => {
    expect(wrapper.containsMatchingElement(<Game />)).toEqual(true);
  });

});