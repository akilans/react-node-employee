import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Login from "./";


it('renders login without crashing by enzyme', () => {
  shallow(<Login />);
});

it('renders login message', () => {
  const wrapper = shallow(<Login />);
  const welcome = <div className="card-header">Login</div>;
  // expect(wrapper.contains(welcome)).to.equal(true);
  expect(wrapper.contains(welcome)).toEqual(true);
});

/*
it("login button check", () => {
  const wrapper = shallow(<Login />);

  const spy = jest.spyOn(wrapper.instance(), "loginAction");
  wrapper.instance().forceUpdate();

  wrapper.find('button').simulate('submit');
  //const submitButton = wrapper.find("button").at(0);

  
  
  //submitButton.simulate("submit");
  expect(spy).toHaveBeenCalled();
  //expect(nameInput.node.value).toEqual('admin');
  //expect(wrapper.contains(loginError)).toEqual(true);

});
*/

