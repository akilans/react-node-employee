import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import login from "./";

import { render } from 'react-testing-library';



it('renders login without crashing by enzyme', () => {
  shallow(<login />);
});


it('renders login message by react-testing-library ', () => {
  const { getByText } = render(<login />);
  expect(getByText('Login')).toBeInTheDOM();
});