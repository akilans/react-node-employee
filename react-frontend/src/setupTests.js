import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { JSDOM } from 'jsdom';
const { window } = new JSDOM('<!doctype html><html><body></body></html>');


configure({ adapter: new Adapter() });



// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import 'react-testing-library/cleanup-after-each';

// this adds jest-dom's custom assertions
import 'jest-dom/extend-expect';

class LocalStorageMock {
    constructor() {
      this.store = {}
    }
  
    clear() {
      this.store = {}
    }
  
    getItem(key) {
      return this.store[key] || null
    }
  
    setItem(key, value) {
      this.store[key] = value
    }
  
    removeItem(key) {
      delete this.store[key]
    }
  }

global.localStorage = new LocalStorageMock
/*
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock
*/
global.document = window.document;
global.window = window;
global.window.displayStyle = () => true;
