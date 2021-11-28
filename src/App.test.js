import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

describe ('App', () => {
  let wrapper;
  beforeEach(() => wrapper = shallow(<App />));

  it('Global wrapper render be a div',() => {
    expect(wrapper.find('div.App').length).toEqual(1);
  });

});